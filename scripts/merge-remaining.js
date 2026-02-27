/**
 * Merge script: Fix ID conflicts and insert missing entity data
 *
 * 1. Rename Bolsonaro's wrong IDs to correct ones
 * 2. Remove extra Bolsonaro/Lagarde entries (3rd action/acc each)
 * 3. Insert 6 missing entities from JSON files (Dimon, Peterson, Shapiro, Oprah, Swift, Gates)
 */
const fs = require('fs');
let data = fs.readFileSync('src/lib/mock-data.ts', 'utf8');

// ================================================================
// STEP 1: Rename Bolsonaro IDs (currently the only users of these)
// ================================================================
// Actions: act-106→act-100, act-107→act-101
data = data.replace(/'act-106'/g, "'act-100'");
data = data.replace(/'act-107'/g, "'act-101'");
// Accountability: acc-090→acc-100, acc-091→acc-101
data = data.replace(/'acc-090'/g, "'acc-100'");
data = data.replace(/'acc-091'/g, "'acc-101'");
// Evidence media: em-61→em-71, em-62→em-72
data = data.replace(/'em-61'/g, "'em-71'");
data = data.replace(/'em-62'/g, "'em-72'");
console.log('Step 1: Renamed Bolsonaro IDs');

// ================================================================
// STEP 2: Remove extra entries (Bolsonaro act-108/acc-092, Lagarde act-109/acc-109)
// ================================================================
// Remove blocks by matching id field. Pattern: from preceding `  {` through `  },`
function removeBlock(src, idValue) {
  // Match an object block containing the specific id
  const escaped = idValue.replace(/[-]/g, '\\-');
  const regex = new RegExp(
    `  \\{\\s*\\n\\s*id: '${escaped}',.*?\\n\\s*\\},\\n`,
    's'
  );
  const result = src.replace(regex, '');
  if (result === src) {
    console.warn(`  WARNING: Could not find block for ${idValue}`);
  }
  return result;
}

data = removeBlock(data, 'act-108');
data = removeBlock(data, 'acc-092');
data = removeBlock(data, 'act-109');
data = removeBlock(data, 'acc-109');
console.log('Step 2: Removed extra Bolsonaro/Lagarde entries');

// ================================================================
// STEP 3: Load JSON files and insert missing entities
// ================================================================
const entities = [
  { file: 'jamie-dimon.json', idMap: null }, // IDs correct
  { file: 'jordan-peterson.json', idMap: null }, // IDs correct
  { file: 'ben-shapiro.json', idMap: { // Shapiro has WRONG IDs
    'act-086': 'act-092', 'act-087': 'act-093',
    'acc-086': 'acc-092', 'acc-087': 'acc-093',
    'em-57': 'em-63', 'em-58': 'em-64',
  }},
  { file: 'oprah-winfrey.json', idMap: null }, // IDs correct
  { file: 'taylor-swift.json', idMap: null }, // IDs correct
  { file: 'bill-gates.json', idMap: null }, // IDs correct
];

function fixIds(obj, idMap) {
  if (!idMap) return obj;
  let str = JSON.stringify(obj);
  for (const [from, to] of Object.entries(idMap)) {
    str = str.replace(new RegExp(from.replace('-', '\\-'), 'g'), to);
  }
  return JSON.parse(str);
}

function formatAction(a) {
  let s = '  {\n';
  s += `    id: '${a.id}',\n`;
  s += `    figureId: '${a.figureId}',\n`;
  s += `    type: '${a.type}',\n`;
  s += `    title: '${esc(a.title)}',\n`;
  s += `    description:\n      '${esc(a.description)}',\n`;
  s += `    outcome:\n      '${esc(a.outcome)}',\n`;
  s += `    dateOccurred: '${a.dateOccurred}',\n`;
  s += `    sourceUrl: '${a.sourceUrl}',\n`;
  s += `    sourceName: '${esc(a.sourceName)}',\n`;
  s += `    isVerified: ${a.isVerified},\n`;
  s += `    aiConfidence: ${a.aiConfidence},\n`;
  s += '  },\n';
  return s;
}

function formatAcc(a) {
  let s = '  {\n';
  s += `    id: '${a.id}',\n`;
  s += `    figureId: '${a.figureId}',\n`;
  s += `    statementId: '${a.statementId}',\n`;
  s += `    actionId: '${a.actionId}',\n`;
  s += `    verdict: '${a.verdict}',\n`;
  s += `    score: ${a.score},\n`;
  s += `    summary:\n      '${esc(a.summary)}',\n`;
  s += `    evidence:\n      '${esc(a.evidence)}',\n`;
  s += `    aiGenerated: ${a.aiGenerated},\n`;
  s += `    isVerified: ${a.isVerified},\n`;
  s += `    aiConfidence: ${a.aiConfidence},\n`;
  s += '  },\n';
  return s;
}

function formatEm(e) {
  let s = '  {\n';
  s += `    id: '${e.id}',\n`;
  s += `    accountabilityRecordId: '${e.accountabilityRecordId}',\n`;
  s += `    type: '${e.type}',\n`;
  s += `    url: '${e.url}',\n`;
  s += `    thumbnailUrl: '${e.thumbnailUrl}',\n`;
  s += `    caption:\n      '${esc(e.caption)}',\n`;
  s += `    sourceUrl: '${esc(e.sourceUrl)}',\n`;
  s += `    capturedAt: '${e.capturedAt}',\n`;
  s += '  },\n';
  return s;
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

// Collect all blocks to insert
let actionsBlock = '';
let accBlock = '';
let emBlock = '';

const figNames = {
  'fig-041': 'Jamie Dimon',
  'fig-043': 'Jordan Peterson',
  'fig-044': 'Ben Shapiro',
  'fig-045': 'Oprah Winfrey',
  'fig-046': 'Taylor Swift',
  'fig-047': 'Bill Gates',
};

for (const { file, idMap } of entities) {
  const raw = JSON.parse(fs.readFileSync(`scripts/data/${file}`, 'utf8'));
  const fixed = fixIds(raw, idMap);
  const figId = fixed.actions[0].figureId;
  const figName = figNames[figId] || figId;

  actionsBlock += `  // --- ${figName} (${figId}) ---\n`;
  for (const a of fixed.actions) {
    actionsBlock += formatAction(a);
  }

  accBlock += `  // --- ${figName} (${figId}) ---\n`;
  for (const a of fixed.accountability) {
    accBlock += formatAcc(a);
  }

  emBlock += `  // --- ${figName} (${figId}) ---\n`;
  for (const e of fixed.evidenceMedia) {
    emBlock += formatEm(e);
  }
}

// ================================================================
// STEP 4: Insert before the closing ]; of each array
// ================================================================

// Insert actions before the SBF section (after Huang/Nadella, before SBF)
// Actually, let's insert right before the ];  at end of mockActions
// Find the last ]; before mockAccountabilityRecords
const actionsEndMarker = /(\n\];\n\n\/\/ -{5,}\n\/\/ Accountability Records)/;
data = data.replace(actionsEndMarker, (match, captured) => {
  return '\n' + actionsBlock + captured;
});
console.log('Step 4a: Inserted actions for 6 entities');

// Insert accountability records before the closing ];
const accEndMarker = /(\n\];\n\n\/\/ -{5,}\n\/\/ Helper Functions)/;
data = data.replace(accEndMarker, (match, captured) => {
  return '\n' + accBlock + captured;
});
console.log('Step 4b: Inserted accountability records for 6 entities');

// Insert evidence media before the closing ];  (before export function getEvidenceForRecord)
const emEndMarker = /(\n\];\n\nexport function getEvidenceForRecord)/;
data = data.replace(emEndMarker, (match, captured) => {
  return '\n' + emBlock + captured;
});
console.log('Step 4c: Inserted evidence media for 6 entities');

// ================================================================
// STEP 5: Write the file
// ================================================================
fs.writeFileSync('src/lib/mock-data.ts', data);
console.log('\nDone! All data merged and IDs fixed.');

// Verification counts
const actCount = (data.match(/id: 'act-\d+'/g) || []).length;
const accCount = (data.match(/^\s+id: 'acc-\d+'/gm) || []).length;
const emCount = (data.match(/^\s+id: 'em-\d+'/gm) || []).length;
console.log(`\nVerification:`);
console.log(`  Actions: ${actCount}`);
console.log(`  Accountability records: ${accCount}`);
console.log(`  Evidence media: ${emCount}`);
