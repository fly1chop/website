// scripts/generateImageMap.js
const fs = require('fs');
const path = require('path');

const teamDir = path.resolve(__dirname, '../src/assets/img/team');
const capstoneDir = path.resolve(__dirname, '../src/assets/img/capstone');
const outFile = path.resolve(__dirname, '../src/assets/js/imageMap.js');

const teamFiles = fs.readdirSync(teamDir).filter((f) => /\.(png|jpe?g|webp)$/.test(f));

const capstoneFiles = fs.readdirSync(capstoneDir).filter((f) => /\.(png|jpe?g|webp|gif)$/.test(f));

const teamEntries = teamFiles
  .map((f) => `  '${f}': new URL('../img/team/${f}', import.meta.url),`)
  .join('\n');

const capstoneEntries = capstoneFiles
  .map((f) => `  '${f}': new URL('../img/capstone/${f}', import.meta.url),`)
  .join('\n');

const content = `

export const imageMap = {
${teamEntries}
${capstoneEntries}
};
`.trim();

fs.writeFileSync(outFile, content);
console.log('✅ imageMap.js generated with', teamFiles.length + capstoneFiles.length, 'entries');
