const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images', 'figures');

async function convert() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
  console.log(`Converting ${files.length} JPG files to WebP...`);

  let totalSavedBytes = 0;

  for (const file of files) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, file.replace('.jpg', '.webp'));

    const inputSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    const outputSize = fs.statSync(outputPath).size;
    const saved = inputSize - outputSize;
    const pct = ((saved / inputSize) * 100).toFixed(1);
    totalSavedBytes += saved;

    console.log(`  ${file} → ${file.replace('.jpg', '.webp')} (${(inputSize/1024).toFixed(0)}KB → ${(outputSize/1024).toFixed(0)}KB, saved ${pct}%)`);
  }

  console.log(`\nTotal saved: ${(totalSavedBytes/1024).toFixed(0)}KB`);
  console.log('Done! Now update mock-data.ts imageUrl references from .jpg to .webp');
}

convert().catch(console.error);
