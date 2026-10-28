// Renders each chapter of the churn shader to a still image for the no-WebGL / reduced-motion path.
// Usage: node scripts/render-stills.mjs   (writes public/media/churn-<n>.webp)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import { chromium } from 'playwright';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'stills-'));
const compile = (rel, out, swap = {}) => {
  let src = fs.readFileSync(path.join(root, rel), 'utf8');
  for (const [a, b] of Object.entries(swap)) src = src.replaceAll(a, b);
  const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
  fs.writeFileSync(path.join(tmp, out), js);
};
compile('src/data/site.ts', 'site.mjs');
compile('src/scene/chapters.ts', 'chapters.mjs', { "'@/data/site'": "'./site.mjs'" });
compile('src/scene/churn.ts', 'churn.mjs');
const { chapters } = await import(path.join(tmp, 'chapters.mjs'));
const churnSrc = fs.readFileSync(path.join(tmp, 'churn.mjs'), 'utf8');

const SIZE = 1000;
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
await page.setContent(`<canvas id="c" style="width:${SIZE}px;height:${SIZE}px"></canvas>`);
await page.addScriptTag({ type: 'module', content: churnSrc.replace(/export /g, '') + '\nwindow.createChurn = createChurn;' });
await page.waitForFunction(() => window.createChurn);

const rgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; };
for (const [i, s] of chapters.entries()) {
  const u = {
    c: [0.5, 0.5], r: 0.44, twist: s.twist, churn: i * 1.2 + 0.4, seed: s.seed, ribbon: s.ribbon,
    base: rgb(s.base), rib: rgb(s.rib), fleck: rgb(s.fleck), bg: rgb('#0B3324'), mouse: [0, 0], time: 3,
  };
  const data = await page.evaluate(([u, size]) => {
    const c = document.getElementById('c');
    const g = window.createChurn(c);
    g.resize(size, size, 1);
    g.render(u);
    return c.toDataURL('image/png');
  }, [u, SIZE]);
  const out = path.join(root, `public/media/churn-${i}.webp`);
  await sharp(Buffer.from(data.split(',')[1], 'base64')).resize(800).webp({ quality: 80 }).toFile(out);
  console.log('wrote', path.relative(root, out));
}
await browser.close();
fs.rmSync(tmp, { recursive: true });
