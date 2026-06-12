// One-off: regenerate the PWA icons. Needs `sharp` (not a demo dependency —
// `npm i -D sharp` first, then `node scripts/gen-icons.mjs`). The committed
// PNGs in /public are what the demo ships; only rerun if you change the
// monogram below.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(OUT, { recursive: true });

function svg(size, { maskable = false } = {}) {
  // Maskable needs content inside the safe zone (~80% center); standard icons
  // can fill more. Black bg, white WINTI·CARS monogram with the red dot.
  const pad = maskable ? size * 0.16 : size * 0.08;
  const fs = (size - pad * 2) * 0.42;
  const dotR = fs * 0.13;
  const cy = size / 2;
  return Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#000000"/>
  <g font-family="Arial, Helvetica, sans-serif" font-weight="700" text-anchor="middle">
    <text x="${size * 0.34}" y="${cy + fs * 0.36}" font-size="${fs}" fill="#ffffff">W</text>
    <circle cx="${size * 0.5}" cy="${cy + fs * 0.05}" r="${dotR}" fill="#e10600"/>
    <text x="${size * 0.66}" y="${cy + fs * 0.36}" font-size="${fs}" fill="#ffffff">C</text>
  </g>
</svg>`);
}

async function render(name, size, opts) {
  await sharp(svg(size, opts)).png().toFile(join(OUT, name));
  console.log("wrote", name);
}

await render("icon-192.png", 192);
await render("icon-512.png", 512);
await render("icon-512-maskable.png", 512, { maskable: true });
await render("apple-touch-icon.png", 180);
console.log("done");
