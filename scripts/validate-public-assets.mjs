import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const sourceDirs = ["src"];
const publicDir = path.join(rootDir, "public");
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".md", ".mdx"]);
const assetExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".mov",
  ".mp4",
  ".pdf",
  ".png",
  ".svg",
  ".webm",
  ".webp",
]);

function walkFiles(dir, predicate = () => true) {
  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(entryPath, predicate);
    }

    return predicate(entryPath) ? [entryPath] : [];
  });
}

function isPublicAssetPath(value) {
  if (!value.startsWith("/") || value.startsWith("//")) {
    return false;
  }

  const { pathname } = new URL(value, "https://example.test");
  if (pathname.includes("*")) {
    return false;
  }

  return assetExtensions.has(path.extname(pathname).toLowerCase());
}

const referencedAssets = new Map();
const stringLiteralPattern = /(?<quote>["'`])(?<value>\/(?!\/)[^"'`?#]+\.(?:avif|gif|jpe?g|mov|mp4|pdf|png|svg|webm|webp)(?:[?#][^"'`]*)?)\k<quote>/gi;

for (const sourceDir of sourceDirs) {
  const files = walkFiles(path.join(rootDir, sourceDir), (filePath) =>
    sourceExtensions.has(path.extname(filePath)),
  );

  for (const filePath of files) {
    const content = readFileSync(filePath, "utf8");

    for (const match of content.matchAll(stringLiteralPattern)) {
      const assetPath = match.groups?.value;

      if (!assetPath || !isPublicAssetPath(assetPath)) {
        continue;
      }

      const { pathname } = new URL(assetPath, "https://example.test");
      const references = referencedAssets.get(pathname) ?? [];
      references.push(path.relative(rootDir, filePath));
      referencedAssets.set(pathname, references);
    }
  }
}

const missingAssets = [];
const emptyAssets = [];

for (const [assetPath, references] of referencedAssets) {
  const publicPath = path.join(publicDir, decodeURIComponent(assetPath.slice(1)));

  if (!existsSync(publicPath)) {
    missingAssets.push({ assetPath, references });
    continue;
  }

  if (statSync(publicPath).size === 0) {
    emptyAssets.push({ assetPath, references });
  }
}

if (missingAssets.length > 0 || emptyAssets.length > 0) {
  for (const { assetPath, references } of missingAssets) {
    console.error(`Missing public asset: ${assetPath}`);
    console.error(`  referenced by: ${[...new Set(references)].join(", ")}`);
  }

  for (const { assetPath, references } of emptyAssets) {
    console.error(`Empty public asset: ${assetPath}`);
    console.error(`  referenced by: ${[...new Set(references)].join(", ")}`);
  }

  process.exit(1);
}

console.log(`Validated ${referencedAssets.size} referenced public asset(s).`);
