import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "src");
const publicDir = path.join(rootDir, "public");
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx"]);
const mediaReferencePattern =
  /(["'])\/([^"'\\]+\.(?:png|jpe?g|gif|webp|svg|mp4|webm|pdf))\1/g;

function collectSourceFiles(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectSourceFiles(entryPath));
      continue;
    }

    if (entry.isFile() && sourceExtensions.has(path.extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files;
}

const failures = [];

for (const filePath of collectSourceFiles(sourceDir)) {
  const fileText = statSync(filePath).size > 0 ? readFileSync(filePath, "utf8") : "";

  for (const match of fileText.matchAll(mediaReferencePattern)) {
    const browserPath = `/${match[2]}`;
    const assetPath = path.join(publicDir, match[2]);

    if (!existsSync(assetPath)) {
      failures.push(`${path.relative(rootDir, filePath)} references missing asset ${browserPath}`);
      continue;
    }

    const assetStat = statSync(assetPath);
    if (assetStat.size === 0) {
      failures.push(`${path.relative(rootDir, filePath)} references empty asset ${browserPath}`);
    }
  }
}

if (failures.length > 0) {
  console.error("Public asset validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Public asset validation passed.");
