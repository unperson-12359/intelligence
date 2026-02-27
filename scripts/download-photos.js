/**
 * Download real photos for public figures from Wikipedia
 * Uses Wikipedia REST API to get page summary images
 * Converts to 200x200 webp for consistent profile photos
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'figures');

// Map slug → Wikipedia article title
const figures = [
  { slug: 'jensen-huang', wiki: 'Jensen_Huang' },
  { slug: 'justin-trudeau', wiki: 'Justin_Trudeau' },
  { slug: 'tim-cook', wiki: 'Tim_Cook' },
  { slug: 'jordan-peterson', wiki: 'Jordan_Peterson' },
  { slug: 'jamie-dimon', wiki: 'Jamie_Dimon' },
  { slug: 'jair-bolsonaro', wiki: 'Jair_Bolsonaro' },
  { slug: 'lula-da-silva', wiki: 'Luiz_Inácio_Lula_da_Silva' },
  { slug: 'christine-lagarde', wiki: 'Christine_Lagarde' },
  { slug: 'taylor-swift', wiki: 'Taylor_Swift' },
  { slug: 'nikki-haley', wiki: 'Nikki_Haley' },
  { slug: 'sam-bankman-fried', wiki: 'Sam_Bankman-Fried' },
  { slug: 'javier-milei', wiki: 'Javier_Milei' },
  { slug: 'ron-desantis', wiki: 'Ron_DeSantis' },
  { slug: 'alexandria-ocasio-cortez', wiki: 'Alexandria_Ocasio-Cortez' },
  { slug: 'satya-nadella', wiki: 'Satya_Nadella' },
  { slug: 'rishi-sunak', wiki: 'Rishi_Sunak' },
  { slug: 'antonio-guterres', wiki: 'António_Guterres' },
  { slug: 'ben-shapiro', wiki: 'Ben_Shapiro' },
  { slug: 'sam-altman', wiki: 'Sam_Altman' },
  { slug: 'bill-gates', wiki: 'Bill_Gates' },
  { slug: 'olaf-scholz', wiki: 'Olaf_Scholz' },
  { slug: 'giorgia-meloni', wiki: 'Giorgia_Meloni' },
  { slug: 'mitch-mcconnell', wiki: 'Mitch_McConnell' },
  { slug: 'oprah-winfrey', wiki: 'Oprah_Winfrey' },
];

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'IndelibleBot/1.0 (accountability platform; contact@indelible.fyi)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJson(res.headers.location).then(resolve, reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`JSON parse error for ${url}: ${e.message}`)); }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'IndelibleBot/1.0 (accountability platform; contact@indelible.fyi)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function processOne(figure) {
  const { slug, wiki } = figure;
  const outPath = path.join(OUTPUT_DIR, `${slug}.webp`);

  try {
    // Get Wikipedia page summary which includes the main image
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wiki)}`;
    const summary = await fetchJson(apiUrl);

    // Try original image first, fallback to thumbnail
    const imageUrl = summary.originalimage?.source || summary.thumbnail?.source;
    if (!imageUrl) {
      console.log(`  SKIP ${slug}: No image found on Wikipedia`);
      return false;
    }

    // Download the image
    const imageBuffer = await downloadBuffer(imageUrl);

    // Convert to 200x200 webp (covers 2x display for 96-100px avatars)
    await sharp(imageBuffer)
      .resize(200, 200, { fit: 'cover', position: 'top' })
      .webp({ quality: 80 })
      .toFile(outPath);

    const stats = fs.statSync(outPath);
    console.log(`  OK   ${slug} (${(stats.size / 1024).toFixed(1)}KB) from ${imageUrl.substring(0, 80)}...`);
    return true;
  } catch (err) {
    console.log(`  FAIL ${slug}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log(`Downloading photos for ${figures.length} figures...\n`);

  let success = 0;
  let fail = 0;

  // Process in batches of 4 to avoid hammering Wikipedia
  for (let i = 0; i < figures.length; i += 4) {
    const batch = figures.slice(i, i + 4);
    const results = await Promise.all(batch.map(processOne));
    success += results.filter(Boolean).length;
    fail += results.filter(r => !r).length;

    // Small delay between batches
    if (i + 4 < figures.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log(`\nDone: ${success} downloaded, ${fail} failed`);
}

main();
