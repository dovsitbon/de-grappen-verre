// Génère public/og.png (1200x630) et public/apple-touch-icon.png (180x180) avec Chromium.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const font = (p) => readFileSync(path.join(root, 'node_modules', p)).toString('base64');
const abril = font('@fontsource/abril-fatface/files/abril-fatface-latin-400-normal.woff2');
const franklin = font('@fontsource-variable/libre-franklin/files/libre-franklin-latin-wght-normal.woff2');
const gochi = font('@fontsource/gochi-hand/files/gochi-hand-latin-400-normal.woff2');
const favicon = readFileSync(path.join(root, 'public/favicon.svg'), 'utf8');

const css = `
@font-face{font-family:A;src:url(data:font/woff2;base64,${abril})}
@font-face{font-family:F;src:url(data:font/woff2;base64,${franklin});font-weight:100 900}
@font-face{font-family:G;src:url(data:font/woff2;base64,${gochi})}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#f1e7d3;font-family:F;color:#1c201e;display:flex;overflow:hidden}
.g{padding:70px 0 0 70px;flex:1}.t{font-family:A;color:#1f3b2c;font-size:132px;line-height:.86}.t span{display:block;padding-left:70px}
.s{margin-top:34px;font-size:36px;font-weight:650}.a{margin-top:14px;font-size:26px;color:#7a1f33;font-weight:600}
.c{width:400px;margin:60px 60px 0 0;background:#7b5232;padding:14px;border-radius:6px;transform:rotate(1.6deg);height:470px}
.d{background:#2b2f2e;height:100%;color:#eeebe2;font-family:G;padding:30px 34px;font-size:30px;line-height:1.35}
.d h2{font-weight:400;font-size:48px;line-height:1}.d b{font-weight:400;color:#f4d58d;display:block;margin-top:16px}
.v{position:absolute;left:0;right:0;bottom:0;height:26px;background-color:#f1e7d3;background-image:linear-gradient(90deg,rgba(122,31,51,.55) 50%,transparent 50%),linear-gradient(rgba(122,31,51,.55) 50%,transparent 50%);background-size:26px 26px}`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(`<html><head><style>${css}</style></head><body>
<div class="g"><p class="t">De Grapp'<span>En Verre</span></p><p class="s">Bistrot de saison, face à la gare de Groslay</p><p class="a">01 39 83 37 18</p></div>
<div class="c"><div class="d"><h2>L'ardoise du jour</h2><b>Entrées</b>Foie gras maison<b>Plats</b>Tartare, pommes boulangères<br>Thon cuit sur piperade<b>Le vin du moment</b>à l'ardoise</div></div>
<div class="v"></div></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: path.join(root, 'public/og.png') });

await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<html><body style="margin:0">${favicon.replace('<svg ', '<svg width="180" height="180" ')}</body></html>`);
await page.screenshot({ path: path.join(root, 'public/apple-touch-icon.png'), omitBackground: false });
await browser.close();
console.log('og.png et apple-touch-icon.png générés');
