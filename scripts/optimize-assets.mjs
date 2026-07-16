/**
 * Decodeert de opgehaalde design-assets (base64 in de tool-results snapshots)
 * en comprimeert ze naar public/assets/.
 *
 * Bron: DesignSync get_file schrijft grote resultaten naar tool-results/*.txt
 * (JSON met { path, content(base64), isBase64 }). Dit script leest die
 * bestanden van schijf — de base64 gaat nooit door de model-context.
 *
 * Compressie (sharp):
 *   logos/  -> max hoogte 240px, PNG palette (flat kleuren, klein)
 *   brand/  -> max 1600px, PNG (behoudt alpha/mask)
 *   photos/ -> max 1600px, PNG true-color (resize is de grote winst;
 *              next/image levert alsnog webp/avif aan de browser)
 *
 * Gebruik: node scripts/optimize-assets.mjs "<tool-results-dir>"
 */
import { readdir, readFile, mkdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const RESULTS_DIR =
  process.argv[2] ??
  path.join(process.cwd(), "..", "tool-results"); // fallback
const PUBLIC_DIR = path.join(process.cwd(), "public");

function fmt(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function collectAssets() {
  const files = await readdir(RESULTS_DIR);
  const map = new Map(); // assetPath -> base64
  for (const f of files) {
    if (!f.endsWith(".txt")) continue;
    let json;
    try {
      json = JSON.parse(await readFile(path.join(RESULTS_DIR, f), "utf8"));
    } catch {
      continue;
    }
    if (json?.method !== "get_file" || typeof json.path !== "string") continue;
    if (!json.path.startsWith("assets/")) continue;
    if (typeof json.content !== "string" || json.content.length < 100) continue;
    map.set(json.path, json.content); // laatste wint (dedupe)
  }
  return map;
}

function pipelineFor(assetPath, buf) {
  const img = sharp(buf, { limitInputPixels: false });
  if (assetPath.startsWith("assets/logos/")) {
    return img
      .resize({ height: 240, fit: "inside", withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true, effort: 10 });
  }
  if (assetPath.startsWith("assets/brand/")) {
    return img
      .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
      .png({ compressionLevel: 9, effort: 10 });
  }
  // photos/
  return img
    .resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9, effort: 10, quality: 82, palette: true, dither: 1 });
}

/**
 * --public modus: comprimeert afbeeldingen die al in public/assets/ staan,
 * in-place. Gebruik dit nadat je zelf originele foto's in public/assets/photos/
 * hebt gezet (de foto's > 256KB kunnen niet via de design-tool worden gehaald).
 *   node scripts/optimize-assets.mjs --public
 */
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(png|jpe?g|webp)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

async function compressPublic() {
  const assetsDir = path.join(PUBLIC_DIR, "assets");
  const files = await walk(assetsDir);
  let totalIn = 0;
  let totalOut = 0;
  for (const file of files) {
    const rel = path.relative(PUBLIC_DIR, file).split(path.sep).join("/");
    const before = (await stat(file)).size;
    const buf = await readFile(file);
    const tmp = `${file}.tmp`;
    try {
      await pipelineFor(rel, buf).toFile(tmp);
      const { rename } = await import("node:fs/promises");
      await rename(tmp, file);
      const after = (await stat(file)).size;
      totalIn += before;
      totalOut += after;
      console.log(`OK ${rel.padEnd(42)} ${fmt(before).padStart(8)} -> ${fmt(after).padStart(8)}`);
    } catch (e) {
      console.log(`SKIP ${rel} (${e.message})`);
    }
  }
  console.log(`\n${files.length} bestanden · ${fmt(totalIn)} -> ${fmt(totalOut)}`);
}

async function main() {
  if (process.argv.includes("--public")) {
    await compressPublic();
    return;
  }
  if (!existsSync(RESULTS_DIR)) {
    console.error(`tool-results dir niet gevonden: ${RESULTS_DIR}`);
    process.exit(1);
  }
  const assets = await collectAssets();
  if (assets.size === 0) {
    console.error("Geen asset-resultaten gevonden.");
    process.exit(1);
  }

  let totalIn = 0;
  let totalOut = 0;
  let ok = 0;
  const failed = [];
  for (const [assetPath, b64] of assets) {
    const buf = Buffer.from(b64, "base64");
    const outPath = path.join(PUBLIC_DIR, assetPath);
    try {
      await mkdir(path.dirname(outPath), { recursive: true });
      await pipelineFor(assetPath, buf).toFile(outPath);
      const outSize = (await stat(outPath)).size;
      totalIn += buf.length;
      totalOut += outSize;
      ok++;
      console.log(
        `OK  ${assetPath.padEnd(42)} ${fmt(buf.length).padStart(8)} -> ${fmt(outSize).padStart(8)}`,
      );
    } catch {
      failed.push(assetPath);
      console.log(
        `SKIP ${assetPath.padEnd(41)} (afgekapt/corrupt, ${fmt(buf.length)} — >256KB bronlimiet)`,
      );
    }
  }
  console.log(
    `\n${ok} verwerkt · ${fmt(totalIn)} -> ${fmt(totalOut)} (${(
      (1 - totalOut / totalIn) * 100
    ).toFixed(0)}% kleiner)`,
  );
  if (failed.length) {
    console.log(`\n${failed.length} overgeslagen (bron >256KB):`);
    failed.forEach((f) => console.log(`  - ${f}`));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
