const fs = require('fs');
const path = require('path');
const redirects = require('./redirects.config');

const distDir = path.join(__dirname, '..', 'dist');

const redirectTemplate = (targetUrl) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="refresh" content="0; url=${targetUrl}" />
    <script>window.location.replace("${targetUrl}");</script>
    <title>Redirecting...</title>
  </head>
  <body>
    Redirecting to <a href="${targetUrl}">${targetUrl}</a>...
  </body>
</html>`;

for (const [from, to] of Object.entries(redirects)) {
  const targetPath = path.join(distDir, ...from.replace(/^\//, '').split('/'), 'index.html');
  const dir = path.dirname(targetPath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(targetPath, redirectTemplate(to));
  console.log(`✅ Redirect added: ${from} → ${to}`);
}
