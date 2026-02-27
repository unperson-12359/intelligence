const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'lib', 'mock-data.ts');
console.log('Reading file: ' + filePath);
const content = fs.readFileSync(filePath, 'utf-8');
const fileLines = content.split('\n');

let sourceNameFixes = 0;
let sourceTypeFixes = 0;

function getFieldPrefix(fieldName) {
  const idx = fieldName.toLowerCase().indexOf('source');
  if (idx <= 0) return '';
  return fieldName.substring(0, idx);
}

const wikiUrlPattern = /wikipedia\.org/;

for (let i = 0; i < fileLines.length; i++) {
  const line = fileLines[i];

  // Pattern 1: sourceUrl with wikipedia URL on the same line
  const sameLineMatch = line.match(/(\w*[Ss]ource[Uu]rl)\s*:\s*['"]https?:\/\/[^'"]*wikipedia\.org/);

  // Pattern 2: sourceUrl: on this line, wikipedia URL on next line
  const fieldOnlyMatch = line.match(/(\w*[Ss]ource[Uu]rl)\s*:\s*$/);
  let multiLineWikipedia = false;
  let fieldPrefix = '';

  if (sameLineMatch) {
    fieldPrefix = getFieldPrefix(sameLineMatch[1]);
  } else if (fieldOnlyMatch && i + 1 < fileLines.length) {
    if (wikiUrlPattern.test(fileLines[i + 1])) {
      multiLineWikipedia = true;
      fieldPrefix = getFieldPrefix(fieldOnlyMatch[1]);
    }
  }

  if (!sameLineMatch && !multiLineWikipedia) continue;

  const nameField = fieldPrefix + 'sourceName';
  const typeField = fieldPrefix + 'sourceType';

  for (let j = i + 1; j < Math.min(i + 8, fileLines.length); j++) {
    // Fix sourceName
    const nameRe = new RegExp('(\\s*' + nameField + '\\s*:\\s*)([\'\"])([^\'\"]*)\\2');
    const nameMatch = fileLines[j].match(nameRe);
    if (nameMatch && nameMatch[3] !== 'Wikipedia') {
      const q = nameMatch[2];
      fileLines[j] = fileLines[j].replace(nameRe, '$1' + q + 'Wikipedia' + q);
      sourceNameFixes++;
    }

    // Fix sourceType
    const typeRe = new RegExp('(\\s*' + typeField + '\\s*:\\s*)([\'\"])([^\'\"]*)\\2');
    const typeMatch = fileLines[j].match(typeRe);
    if (typeMatch && typeMatch[3] !== 'reference') {
      const q = typeMatch[2];
      fileLines[j] = fileLines[j].replace(typeRe, '$1' + q + 'reference' + q);
      sourceTypeFixes++;
    }
  }
}

const output = fileLines.join('\n');
fs.writeFileSync(filePath, output, 'utf-8');

console.log('Done!');
console.log('  sourceName fixes: ' + sourceNameFixes);
console.log('  sourceType fixes: ' + sourceTypeFixes);
console.log('  Total: ' + (sourceNameFixes + sourceTypeFixes));