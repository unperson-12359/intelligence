#!/usr/bin/env node

/**
 * check-links.js
 * Reads src/lib/mock-data.ts and checks every external URL for reachability.
 * Uses only built-in Node.js modules (native fetch).
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
const CONCURRENCY = 5;
const TIMEOUT_MS = 10_000;
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Extract and deduplicate all http(s) URLs from a string. */
function extractUrls(text) {
  // Match URLs inside single-quoted strings (TypeScript source)
  const regex = /https?:\/\/[^\s'"}\]]+/g;
  const matches = text.match(regex) || [];
  // Trim trailing punctuation that may have been captured
  const cleaned = matches.map((u) => u.replace(/[.;:]+$/, ''));
  return [...new Set(cleaned)];
}

/** Fetch a URL with a timeout using AbortController. */
async function fetchWithTimeout(url, method, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method,
      redirect: 'manual', // don't follow redirects so we can report them
      signal: controller.signal,
      headers: { 'User-Agent': USER_AGENT },
    });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

/** Check a single URL. Returns a result object. */
async function checkUrl(url) {
  const result = { url, status: null, category: '', detail: '' };

  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetchWithTimeout(url, method, TIMEOUT_MS);
      result.status = res.status;

      if (res.status >= 200 && res.status < 300) {
        result.category = 'OK';
        result.detail = `${res.status} ${res.statusText || 'OK'}`;
        return result;
      }
      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get('location') || '(no location header)';
        result.category = 'Redirect';
        result.detail = `${res.status} -> ${location}`;
        return result;
      }
      if (res.status >= 400 && res.status < 500) {
        // Some servers reject HEAD but accept GET — try GET before declaring broken
        if (method === 'HEAD') continue;
        result.category = 'Client Error (BROKEN)';
        result.detail = `${res.status} ${res.statusText || ''}`;
        return result;
      }
      if (res.status >= 500) {
        if (method === 'HEAD') continue;
        result.category = 'Server Error (potentially broken)';
        result.detail = `${res.status} ${res.statusText || ''}`;
        return result;
      }

      // Unexpected status
      result.category = 'Unknown';
      result.detail = `${res.status}`;
      return result;
    } catch (err) {
      // If HEAD failed, fall through to GET
      if (method === 'HEAD') continue;

      result.category = 'Connection Error (BROKEN)';
      if (err.name === 'AbortError') {
        result.detail = `Timeout after ${TIMEOUT_MS / 1000}s`;
      } else {
        result.detail = err.message || String(err);
      }
      return result;
    }
  }

  return result;
}

/** Run promises with limited concurrency. */
async function runWithConcurrency(tasks, limit) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const p = task().then((r) => {
      executing.delete(p);
      return r;
    });
    executing.add(p);
    results.push(p);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const filePath = path.resolve(__dirname, '..', 'src', 'lib', 'mock-data.ts');
  console.log(`Reading: ${filePath}\n`);

  const content = fs.readFileSync(filePath, 'utf-8');
  const urls = extractUrls(content);

  console.log(`Found ${urls.length} unique external URLs.\n`);
  console.log('Checking links (concurrency = %d, timeout = %ds)...\n', CONCURRENCY, TIMEOUT_MS / 1000);

  let checked = 0;
  const tasks = urls.map((url) => () =>
    checkUrl(url).then((r) => {
      checked++;
      const icon =
        r.category === 'OK'
          ? '[OK]'
          : r.category === 'Redirect'
            ? '[->]'
            : '[!!]';
      process.stdout.write(`  ${icon} (${checked}/${urls.length}) ${r.url}  ${r.detail}\n`);
      return r;
    })
  );

  const results = await runWithConcurrency(tasks, CONCURRENCY);

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  const ok = results.filter((r) => r.category === 'OK');
  const redirects = results.filter((r) => r.category === 'Redirect');
  const clientErrors = results.filter((r) => r.category.startsWith('Client'));
  const serverErrors = results.filter((r) => r.category.startsWith('Server'));
  const connErrors = results.filter((r) => r.category.startsWith('Connection'));
  const unknown = results.filter((r) => r.category === 'Unknown');

  console.log('\n' + '='.repeat(80));
  console.log('SUMMARY');
  console.log('='.repeat(80));
  console.log(`  OK (2xx):               ${ok.length}`);
  console.log(`  Redirect (3xx):         ${redirects.length}`);
  console.log(`  Client Error (4xx):     ${clientErrors.length}`);
  console.log(`  Server Error (5xx):     ${serverErrors.length}`);
  console.log(`  Connection Error:       ${connErrors.length}`);
  if (unknown.length) console.log(`  Unknown:                ${unknown.length}`);
  console.log(`  ${'─'.repeat(40)}`);
  console.log(`  Total checked:          ${results.length}`);

  const broken = [...clientErrors, ...serverErrors, ...connErrors];
  if (broken.length > 0) {
    console.log('\n' + '='.repeat(80));
    console.log('BROKEN / ERROR URLs');
    console.log('='.repeat(80));
    for (const r of broken) {
      console.log(`  [${r.category}]`);
      console.log(`    URL:    ${r.url}`);
      console.log(`    Detail: ${r.detail}`);
      console.log();
    }
  }

  if (redirects.length > 0) {
    console.log('='.repeat(80));
    console.log('REDIRECTS');
    console.log('='.repeat(80));
    for (const r of redirects) {
      console.log(`  ${r.url}`);
      console.log(`    -> ${r.detail}`);
      console.log();
    }
  }

  if (broken.length === 0) {
    console.log('\nAll URLs are reachable!');
  } else {
    console.log(`\n${broken.length} URL(s) are broken or unreachable.`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
