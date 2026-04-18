// One-off: resize the giant orchid PNG sources to display-resolution WebP.
// Display size is 150px (Inter scaling up to ~164 for one frame), so we cap
// the longest side at 480px (≈3× for retina) and emit lossy WebP at q=92,
// keeping alpha. Run with: node scripts/optimize-orchid.mjs
import { readdir, stat, unlink } from "node:fs/promises";
import { join, parse } from "node:path";
import sharp from "sharp";

const DIR = new URL("../public/orchid/", import.meta.url).pathname;
const MAX_SIDE = 480;
const QUALITY = 92;

const files = (await readdir(DIR)).filter((f) => f.toLowerCase().endsWith(".png"));
let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const inputPath = join(DIR, file);
  const outputPath = join(DIR, `${parse(file).name}.webp`);
  const before = (await stat(inputPath)).size;
  totalBefore += before;

  const meta = await sharp(inputPath).metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
  const scale = longest > MAX_SIDE ? MAX_SIDE / longest : 1;
  const targetW = Math.round((meta.width ?? MAX_SIDE) * scale);
  const targetH = Math.round((meta.height ?? MAX_SIDE) * scale);

  await sharp(inputPath)
    .resize(targetW, targetH, { fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: 100, effort: 6 })
    .toFile(outputPath);

  const after = (await stat(outputPath)).size;
  totalAfter += after;
  const pct = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${file.padEnd(15)} ${meta.width}×${meta.height} → ${targetW}×${targetH}  ` +
      `${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024).toFixed(1)} KB (-${pct}%)`,
  );

  await unlink(inputPath);
}

console.log(
  `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024).toFixed(1)} KB ` +
    `(-${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`,
);
