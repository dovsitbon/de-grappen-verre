// Captures pleine page de chaque page à 390 px et 1440 px -> captures/*.png
// Usage : npm run build && npm run captures
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 4406;
const BASE = `http://localhost:${PORT}`;
const pages = [
  ['accueil', '/'],
  ['en', '/en/'],
  ['mentions-legales', '/mentions-legales/'],
  ['confidentialite', '/confidentialite/'],
  ['404', '/page-inexistante'],
];
const tailles = [
  ['mobile', 390, 844],
  ['desktop', 1440, 900],
];

const server = spawn(`npx astro preview --port ${PORT} --host 127.0.0.1`, {
  cwd: root,
  shell: true,
  stdio: 'pipe',
});
const attendre = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/`);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error('Le serveur de preview ne répond pas');
};

mkdirSync(path.join(root, 'captures'), { recursive: true });
let browser;
try {
  await attendre();
  browser = await chromium.launch();
  for (const [nom, w, h] of tailles) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    for (const [slug, url] of pages) {
      await page.goto(`http://127.0.0.1:${PORT}${url}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const debord = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (debord > 0) console.warn(`! scroll horizontal sur ${slug} (${nom}) : ${debord}px`);
      await page.screenshot({ path: path.join(root, 'captures', `${slug}-${nom}.png`), fullPage: true });
      console.log(`captures/${slug}-${nom}.png`);
    }
    await ctx.close();
  }
} finally {
  await browser?.close();
  if (process.platform === 'win32') spawn(`taskkill /pid ${server.pid} /T /F`, { shell: true });
  else server.kill();
}
