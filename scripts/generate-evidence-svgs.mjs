import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUTPUT_DIR = join(import.meta.dirname, '..', 'public', 'images', 'evidence');
mkdirSync(OUTPUT_DIR, { recursive: true });

// Icon paths for each type (simplified SVG path data)
const icons = {
  screenshot: {
    // Camera icon
    viewBox: '0 0 24 24',
    path: `<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="13" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
    accentColor: '#3b82f6', // blue
  },
  video: {
    // Film/play icon
    viewBox: '0 0 24 24',
    path: `<polygon points="5 3 19 12 5 21 5 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    accentColor: '#ef4444', // red
  },
  audio: {
    // Mic icon
    viewBox: '0 0 24 24',
    path: `<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    accentColor: '#22c55e', // green
  },
  document: {
    // File/document icon
    viewBox: '0 0 24 24',
    path: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline points="14 2 14 8 20 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="8" y1="13" x2="16" y2="13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="8" y1="17" x2="16" y2="17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>`,
    accentColor: '#a855f7', // purple
  },
};

const typeLabels = {
  screenshot: 'SCREENSHOT',
  video: 'VIDEO',
  audio: 'AUDIO',
  document: 'DOCUMENT',
};

const evidenceEntries = [
  {
    filename: 'medicare-for-all-congress.svg',
    type: 'screenshot',
    caption: 'Screenshot of Medicare for All Act announcement on Congress.gov',
    source: 'Congress.gov',
    date: 'Jan 15, 2024',
  },
  {
    filename: 'college-for-all-bill.svg',
    type: 'document',
    caption: 'College for All Act bill text showing student debt cancellation provisions',
    source: 'Congress.gov',
    date: 'Aug 22, 2023',
  },
  {
    filename: 'tesla-autonomy-day-robotaxi.svg',
    type: 'video',
    caption: 'Elon Musk promising one million robotaxis by 2020 at Tesla Autonomy Day',
    source: 'YouTube',
    date: 'Nov 10, 2023',
  },
  {
    filename: 'suspended-journalist-accounts.svg',
    type: 'screenshot',
    caption: 'Screenshot of suspended journalist accounts on X (formerly Twitter)',
    source: 'X.com',
    date: 'Dec 16, 2022',
  },
  {
    filename: 'cybertruck-pricing.svg',
    type: 'screenshot',
    caption: 'Cybertruck pricing page showing $61,000 base price vs original $39,900 announcement',
    source: 'Tesla.com',
    date: 'Mar 1, 2024',
  },
  {
    filename: 'rogan-covid-vaccine-clip.svg',
    type: 'audio',
    caption: 'Joe Rogan podcast clip discussing COVID vaccines for young people',
    source: 'Spotify',
    date: 'Apr 27, 2021',
  },
  {
    filename: 'cruz-gun-vote-senate.svg',
    type: 'screenshot',
    caption: 'Senate roll call vote showing Cruz voting Nay on Bipartisan Safer Communities Act',
    source: 'Senate.gov',
    date: 'Jun 24, 2022',
  },
  {
    filename: 'capitol-security-footage.svg',
    type: 'video',
    caption: 'Capitol security footage contradicting claims of peaceful January 6 protest',
    source: 'C-SPAN',
    date: 'Mar 8, 2023',
  },
];

// Word-wrap text into lines that fit within a given width (approximate)
function wrapText(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if (currentLine.length + word.length + 1 > maxCharsPerLine) {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine ? `${currentLine} ${word}` : word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

// Escape XML special characters
function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateSvg(entry) {
  const { type, caption, source, date } = entry;
  const icon = icons[type];
  const label = typeLabels[type];
  const accent = icon.accentColor;

  // Wrap caption text
  const captionLines = wrapText(caption, 38);

  // Build caption text elements
  const captionTextElements = captionLines
    .slice(0, 3) // max 3 lines
    .map(
      (line, i) =>
        `<text x="200" y="${192 + i * 20}" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400">${escapeXml(line)}</text>`
    )
    .join('\n    ');

  const captionHeight = Math.min(captionLines.length, 3) * 20;
  const sourceY = 192 + captionHeight + 12;
  const dateY = sourceY + 18;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg-${type}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="accent-${type}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="400" height="300" rx="12" fill="url(#bg-${type})"/>

  <!-- Accent overlay at top -->
  <rect width="400" height="120" rx="12" fill="url(#accent-${type})"/>
  <rect y="108" width="400" height="12" fill="url(#accent-${type})"/>

  <!-- Subtle border -->
  <rect width="400" height="300" rx="12" fill="none" stroke="${accent}" stroke-opacity="0.2" stroke-width="1"/>

  <!-- Top accent line -->
  <rect y="0" width="400" height="3" rx="1.5" fill="${accent}" opacity="0.6"/>

  <!-- Type badge -->
  <rect x="16" y="16" width="${label.length * 9 + 20}" height="24" rx="4" fill="${accent}" opacity="0.2"/>
  <text x="${16 + (label.length * 9 + 20) / 2}" y="32" text-anchor="middle" fill="${accent}" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" letter-spacing="0.05em">${label}</text>

  <!-- Icon (centered, larger) -->
  <g transform="translate(176, 54) scale(2)" color="${accent}" opacity="0.8">
    ${icon.path}
  </g>

  <!-- Divider line -->
  <line x1="40" y1="165" x2="360" y2="165" stroke="${accent}" stroke-opacity="0.15" stroke-width="1"/>

  <!-- Caption text -->
  ${captionTextElements}

  <!-- Source -->
  <text x="200" y="${sourceY}" text-anchor="middle" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500">${escapeXml(source)}</text>

  <!-- Preserved date -->
  <text x="200" y="${dateY}" text-anchor="middle" fill="#64748b" font-family="system-ui, -apple-system, sans-serif" font-size="11">Preserved on ${escapeXml(date)}</text>

  <!-- Bottom watermark -->
  <text x="200" y="288" text-anchor="middle" fill="#334155" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="500" letter-spacing="0.1em">INTELLIGENCE ACCOUNTABILITY PLATFORM</text>
</svg>`;
}

// Generate all SVGs
for (const entry of evidenceEntries) {
  const svg = generateSvg(entry);
  const outputPath = join(OUTPUT_DIR, entry.filename);
  writeFileSync(outputPath, svg, 'utf-8');
  console.log(`Generated: ${entry.filename}`);
}

console.log(`\nDone! Generated ${evidenceEntries.length} SVG evidence cards in ${OUTPUT_DIR}`);
