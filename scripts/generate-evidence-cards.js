const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'public', 'images', 'evidence');

const typeColors = {
  screenshot: { bg: '#3B82F6', light: '#DBEAFE', icon: '📸' },
  video:      { bg: '#EF4444', light: '#FEE2E2', icon: '🎬' },
  audio:      { bg: '#22C55E', light: '#DCFCE7', icon: '🎙️' },
  document:   { bg: '#8B5CF6', light: '#EDE9FE', icon: '📄' },
};

const cards = [
  { file: 'medicare-for-all-congress', type: 'screenshot', caption: 'Screenshot of Medicare for All Act announcement on Congress.gov', source: 'congress.gov', date: '2024-01-15' },
  { file: 'college-for-all-act', type: 'document', caption: 'College for All Act bill text showing student debt cancellation provisions', source: 'congress.gov', date: '2023-08-22' },
  { file: 'musk-robotaxi-promise', type: 'video', caption: 'Elon Musk promising one million robotaxis by 2020 at Tesla Autonomy Day', source: 'youtube.com', date: '2023-11-10' },
  { file: 'suspended-journalist-accounts', type: 'screenshot', caption: 'Screenshot of suspended journalist accounts on X (formerly Twitter)', source: 'x.com', date: '2022-12-16' },
  { file: 'cybertruck-pricing', type: 'screenshot', caption: 'Cybertruck pricing page showing $61,000 base price vs original $39,900 announcement', source: 'tesla.com', date: '2024-03-01' },
  { file: 'rogan-covid-vaccines', type: 'audio', caption: 'Joe Rogan podcast clip discussing COVID vaccines for young people', source: 'spotify.com', date: '2021-04-27' },
  { file: 'cruz-gun-vote', type: 'screenshot', caption: 'Senate roll call vote showing Cruz voting Nay on Bipartisan Safer Communities Act', source: 'senate.gov', date: '2022-06-24' },
  { file: 'capitol-security-footage', type: 'video', caption: 'Capitol security footage contradicting claims of peaceful January 6 protest', source: 'c-span.org', date: '2023-03-08' },
  { file: 'trump-border-wall-executive-order', type: 'document', caption: 'Executive order on border wall construction vs infrastructure spending records', source: 'whitehouse.gov', date: '2025-01-20' },
  { file: 'xi-jinping-hong-kong-autonomy', type: 'screenshot', caption: "Xi Jinping's One Country Two Systems pledge vs National Security Law", source: 'bbc.com', date: '2023-06-30' },
  { file: 'putin-ukraine-no-invasion', type: 'video', caption: 'Putin denying plans to invade Ukraine weeks before February 2022 invasion', source: 'youtube.com', date: '2022-02-24' },
  { file: 'modi-farmer-protest-response', type: 'screenshot', caption: 'Farm laws repeal announcement after pledging agricultural reform', source: 'reuters.com', date: '2021-11-19' },
  { file: 'netanyahu-judicial-reform', type: 'document', caption: "Netanyahu's judicial overhaul legislation vs democratic governance pledges", source: 'bbc.com', date: '2023-07-24' },
  { file: 'mbs-khashoggi-accountability', type: 'screenshot', caption: 'UN investigation findings on Khashoggi killing vs MBS denial', source: 'un.org', date: '2021-02-26' },
  { file: 'zuckerberg-privacy-hearing', type: 'video', caption: 'Zuckerberg congressional testimony on user privacy vs data practices', source: 'youtube.com', date: '2024-01-31' },
  { file: 'bezos-worker-conditions', type: 'document', caption: 'Amazon warehouse injury rate reports vs worker safety commitments', source: 'reuters.com', date: '2023-04-12' },
  { file: 'von-der-leyen-climate-pledge', type: 'screenshot', caption: 'EU Green Deal progress report vs original emission reduction targets', source: 'ec.europa.eu', date: '2024-02-06' },
  { file: 'erdogan-press-freedom', type: 'screenshot', caption: 'RSF press freedom index for Turkey vs Erdogan democracy pledges', source: 'rsf.org', date: '2024-04-20' },
  { file: 'biden-student-loans', type: 'document', caption: 'Biden student loan forgiveness promise vs Supreme Court ruling in Biden v. Nebraska', source: 'wikipedia.org', date: '2023-06-30' },
  { file: 'obama-guantanamo', type: 'document', caption: 'Obama Guantanamo closure executive order vs facility still open after 8 years', source: 'wikipedia.org', date: '2017-01-20' },
  { file: 'johnson-partygate', type: 'screenshot', caption: 'Boris Johnson lockdown rules vs Partygate gatherings and police fine', source: 'wikipedia.org', date: '2022-04-12' },
  { file: 'pope-francis-lgbtq', type: 'document', caption: 'Pope Francis LGBTQ outreach from Who am I to judge to Fiducia Supplicans', source: 'wikipedia.org', date: '2023-12-18' },
  { file: 'macron-pension-reform', type: 'screenshot', caption: 'Macron pension reform promise vs Article 49.3 parliamentary bypass', source: 'wikipedia.org', date: '2023-03-16' },
  { file: 'merkel-nord-stream', type: 'screenshot', caption: 'Merkel climate pledges vs Nord Stream 2 pipeline support for Russian gas', source: 'wikipedia.org', date: '2022-02-22' },
];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function wrapText(text, maxCharsPerLine) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length > maxCharsPerLine) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine = currentLine ? currentLine + ' ' + word : word;
    }
  }
  if (currentLine) lines.push(currentLine.trim());
  return lines.slice(0, 4); // max 4 lines
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function generateSVG(card) {
  const colors = typeColors[card.type];
  const typeLabel = card.type.charAt(0).toUpperCase() + card.type.slice(1);
  const captionLines = wrapText(card.caption, 42);
  const formattedDate = formatDate(card.date);

  const captionTextElements = captionLines.map((line, i) =>
    `<text x="200" y="${135 + i * 22}" text-anchor="middle" fill="#1F2937" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="500">${escapeXml(line)}</text>`
  ).join('\n    ');

  return `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-2%" y="-2%" width="104%" height="104%">
      <feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.1"/>
    </filter>
    <linearGradient id="headerGrad" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${colors.bg}"/>
      <stop offset="100%" stop-color="${colors.bg}dd"/>
    </linearGradient>
  </defs>

  <!-- Card background -->
  <rect x="0" y="0" width="400" height="300" rx="12" fill="white" stroke="#E5E7EB" stroke-width="1" filter="url(#shadow)"/>

  <!-- Header bar -->
  <rect x="0" y="0" width="400" height="72" rx="12" fill="url(#headerGrad)"/>
  <rect x="0" y="60" width="400" height="12" fill="url(#headerGrad)"/>

  <!-- Icon circle -->
  <circle cx="40" cy="36" r="22" fill="rgba(255,255,255,0.25)"/>
  <text x="40" y="43" text-anchor="middle" font-size="22">${colors.icon}</text>

  <!-- Type label -->
  <text x="72" y="32" fill="white" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" text-transform="uppercase" letter-spacing="1">${typeLabel.toUpperCase()}</text>

  <!-- EVIDENCE label -->
  <text x="72" y="50" fill="rgba(255,255,255,0.85)" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700">EVIDENCE</text>

  <!-- Decorative line -->
  <rect x="24" y="84" width="352" height="1" fill="#F3F4F6"/>

  <!-- Caption text -->
  ${captionTextElements}

  <!-- Bottom section -->
  <rect x="24" y="230" width="352" height="1" fill="#F3F4F6"/>

  <!-- Source domain -->
  <text x="24" y="258" fill="#6B7280" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600">Source: ${escapeXml(card.source)}</text>

  <!-- Preserved date -->
  <text x="376" y="258" text-anchor="end" fill="#9CA3AF" font-family="system-ui, -apple-system, sans-serif" font-size="11">Preserved ${formattedDate}</text>

  <!-- Intelligence branding -->
  <text x="200" y="284" text-anchor="middle" fill="#D1D5DB" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="500">INTELLIGENCE PLATFORM — ARCHIVED EVIDENCE</text>
</svg>`;
}

// Generate all cards
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let count = 0;
for (const card of cards) {
  const svg = generateSVG(card);
  const filePath = path.join(outputDir, `${card.file}.svg`);
  fs.writeFileSync(filePath, svg, 'utf-8');
  count++;
  console.log(`Generated: ${card.file}.svg`);
}

console.log(`\nDone! Generated ${count} evidence card SVGs in ${outputDir}`);
