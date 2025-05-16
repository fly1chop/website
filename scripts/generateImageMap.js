// scripts/generateImageMap.js
const fs = require('fs');
const path = require('path');

const capstoneDir = path.resolve(__dirname, '../src/assets/img/capstone');
const outFile    = path.resolve(__dirname, '../src/assets/js/imageMap.js');

const files = fs.readdirSync(capstoneDir)
  .filter(f => /\.(png|jpe?g|webp|gif)$/.test(f));

const entries = files.map((f, i) =>
  `  '${f}': new URL('../img/capstone/${f}', import.meta.url),`
).join('\n');

const content = `

export const imageMap = {
${entries}
};
`.trim();

fs.writeFileSync(outFile, content);
console.log('✅ imageMap.js generated with', files.length, 'entries');
