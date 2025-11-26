// scripts/generateImageMap.js
const fs = require('fs');
const path = require('path');

const teamDir = path.resolve(__dirname, '../src/assets/img/team');
const capstoneDir = path.resolve(__dirname, '../src/assets/img/capstone');
const sprintDir = path.resolve(__dirname, '../src/assets/img/sprint');
const youtubeDir = path.resolve(__dirname, '../src/assets/img/youtube');
const outFile = path.resolve(__dirname, '../src/assets/js/imageMap.js');

const teamFiles = fs.readdirSync(teamDir).filter((f) => /\.(png|jpe?g|webp)$/.test(f));
const capstoneFiles = fs.readdirSync(capstoneDir).filter((f) => /\.(png|jpe?g|webp|gif)$/.test(f));
const sprintFiles = fs.readdirSync(sprintDir).filter((f) => /\.(png|jpe?g|webp|gif)$/.test(f));
const youtubeFiles = fs.readdirSync(youtubeDir).filter((f) => /\.(png|jpe?g|webp)$/.test(f));

const teamEntries = teamFiles
  .map((f) => `  '${f}': new URL('../img/team/${f}', import.meta.url),`)
  .join('\n');

const capstoneEntries = capstoneFiles
  .map((f) => `  '${f}': new URL('../img/capstone/${f}', import.meta.url),`)
  .join('\n');

const sprintEntries = sprintFiles
  .map((f) => `  '${f}': new URL('../img/sprint/${f}', import.meta.url),`)
  .join('\n');

const youtubeEntries = youtubeFiles
  .map((f) => `  '${f}': new URL('../img/youtube/${f}', import.meta.url),`)
  .join('\n');

const content = `

export const imageMap = {
${teamEntries}
${capstoneEntries}
${sprintEntries}
${youtubeEntries}
};
`.trim();

fs.writeFileSync(outFile, content);
console.log(
  '✅ imageMap.js generated with',
  teamFiles.length + capstoneFiles.length + sprintFiles.length,
  'entries'
);
