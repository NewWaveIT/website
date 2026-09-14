import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";
import { FIELD_SCHEMAS } from "@/lib/cms/schema";
import { CONTENT_TABLE, type ContentType } from "@/lib/cms/content";
import { PAGE_FIELDS, paginaPad } from "@/lib/cms/pages";
import { ADMIN_PADEN } from "@/lib/cms/admin-paden";

/**
 * Het projectmanifest: één afgeleide kaart van hoe dit project in elkaar zit.
 *
 * Waarom gegenereerd en niet geschreven: hier stond ooit een handgeschreven
 * kaart van contenttype naar routes, in lib/cms/revalidate.ts. Die dreef weg,
 * en het gevolg was dat verwijderen niets ververste. Een kaart die je met de
 * hand bijhoudt is over drie maanden een leugen die er betrouwbaar uitziet.
 *
 * Deze test bouwt de kaart uit de code en vergelijkt hem met docs/manifest.json.
 * Wijkt hij af, dan faalt de test met de opdracht `npm run manifest`. Zo kan het
 * manifest niet achterlopen zonder dat CI het merkt.
 */

const MANIFEST = "docs/manifest.json";
const LEESBAAR = "docs/MANIFEST.md";
const SCHRIJF = process.env.MANIFEST_SCHRIJF === "1";

function bestanden(map: string, uit: string[] = [], negeer = new Set([".next", "node_modules"])) {
  if (!existsSync(map)) return uit;
  for (const naam of readdirSync(map)) {
    if (negeer.has(naam)) continue;
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) bestanden(pad, uit, negeer);
    else if (naam.endsWith(".ts") || naam.endsWith(".tsx")) uit.push(pad);
  }
  return uit;
}

/** lib/cms/pages.ts definieert de slugs en noemt ze in toelichtingen; dat is
 *  geen renderen, dus hij telt niet mee als lezer. */
const DEFINITIE = new Set(["lib/cms/pages.ts"]);

const BRON = ["app", "components", "lib"]
  .flatMap((w) => bestanden(w))
  .filter((pad) => !DEFINITIE.has(pad))
  .map((pad) => ({ pad, bron: readFileSync(pad, "utf8") }));

/** Publieke routes, afgeleid uit de mappenstructuur van app/(marketing). */
function publiekeRoutes(): string[] {
  return bestanden("app/(marketing)")
    .filter((p) => p.endsWith("/page.tsx"))
    .map((p) =>
      p
        .replace("app/(marketing)", "")
        .replace(/\/page\.tsx$/, "")
        .replace(/\/\([^)]+\)/g, ""),
    )
    .map((r) => r || "/")
    .sort();
}

/** De datalaag van een contenttype: het bestand dat `maakLezer` met dit type aanroept. */
function datalaagVan(type: string): string | null {
  const treffer = BRON.find(
    ({ pad, bron }) =>
      pad.startsWith("lib/") && bron.includes("maakLezer") && bron.includes(`type: "${type}"`),
  );
  return treffer?.pad ?? null;
}

/** Het seedbestand: wat de datalaag als `seed` doorgeeft. */
function seedVan(datalaag: string | null): string | null {
  if (!datalaag) return null;
  const bron = readFileSync(datalaag, "utf8");
  const naam = /seed:\s*(?:Object\.values\()?([A-Z_][A-Z0-9_]*)/.exec(bron)?.[1];
  if (!naam) return null;
  const imp = new RegExp(`import\\s*\\{[^}]*\\b${naam}\\b[^}]*\\}\\s*from\\s*"@/([^"]+)"`).exec(
    bron,
  )?.[1];
  return imp ? `${imp}.ts` : null;
}

/**
 * Welke bestanden de teksten van één paginaslug lezen.
 *
 * Ook sjabloonaanroepen: de richting-hub leest `getPagina(\`diensten-${richting}\`)`,
 * en zonder deze tweede tak zouden diensten-mendix, -ai en -strategie eruitzien
 * als pagina-ingangen die niets renderen.
 */
function lezersVan(slug: string): string[] {
  return BRON.filter(({ bron }) => {
    if (bron.includes(`getPagina("${slug}")`)) return true;
    return [...bron.matchAll(/getPagina\(`([a-z0-9-]*)\$\{[^}]+\}`\)/g)].some(
      ([, voor = ""]) => voor !== "" && slug.startsWith(voor),
    );
  })
    .map(({ pad }) => pad)
    .sort();
}

function bouwManifest() {
  const contenttypen = (Object.keys(CONTENT_TABLE) as ContentType[]).sort().map((type) => {
    const datalaag = datalaagVan(type);
    return {
      type,
      tabel: CONTENT_TABLE[type],
      velden: FIELD_SCHEMAS[type].length,
      seed: seedVan(datalaag),
      datalaag,
      adminLijst: ADMIN_PADEN[type].lijst,
      publiekPad: ADMIN_PADEN[type].pad ?? null,
    };
  });

  const paginateksten = Object.keys(PAGE_FIELDS)
    .sort()
    .map((slug) => ({
      slug,
      velden: PAGE_FIELDS[slug as keyof typeof PAGE_FIELDS].length,
      pad: paginaPad(slug) ?? null,
      gelezenDoor: lezersVan(slug),
    }));

  const clientComponenten = BRON.filter(({ bron }) => bron.startsWith('"use client"')).length;

  return {
    toelichting:
      "Gegenereerd door tests/unit/manifest.spec.ts. Niet met de hand bijwerken; draai `npm run manifest`.",
    contenttypen,
    paginateksten,
    publiekeRoutes: publiekeRoutes(),
    aantallen: {
      bronbestanden: BRON.length,
      clientComponenten,
      servercomponenten: BRON.length - clientComponenten,
      unittests: readdirSync("tests/unit").filter((f) => f.endsWith(".spec.ts")).length,
      e2etests: readdirSync("tests/e2e").filter((f) => f.endsWith(".spec.ts")).length,
    },
  };
}

type Manifest = ReturnType<typeof bouwManifest>;

function schrijfLeesbaar(m: Manifest) {
  const r: string[] = [
    "# Projectmanifest",
    "",
    "Gegenereerd uit de code door `tests/unit/manifest.spec.ts`. **Niet met de hand",
    "bijwerken** — draai `npm run manifest`. Loopt dit bestand achter op de code, dan",
    "faalt de unittest.",
    "",
    "## Contenttypen",
    "",
    "| Type | Tabel | Velden | Seed | Datalaag | Admin | Publiek |",
    "| --- | --- | --- | --- | --- | --- | --- |",
  ];
  for (const c of m.contenttypen) {
    r.push(
      `| ${c.type} | \`${c.tabel}\` | ${c.velden} | ${c.seed ? `\`${c.seed}\`` : "—"} | ${
        c.datalaag ? `\`${c.datalaag}\`` : "—"
      } | \`${c.adminLijst}\` | ${c.publiekPad ? `\`${c.publiekPad}\`` : "—"} |`,
    );
  }
  r.push("", "## Paginateksten", "");
  r.push("| Slug | Velden | Pad | Gelezen door |", "| --- | --- | --- | --- |");
  for (const p of m.paginateksten) {
    const lezers = p.gelezenDoor.length
      ? p.gelezenDoor.map((l) => `\`${l}\``).join("<br>")
      : "**niemand**";
    r.push(`| ${p.slug} | ${p.velden} | ${p.pad ?? "—"} | ${lezers} |`);
  }
  r.push("", "## Publieke routes", "");
  for (const route of m.publiekeRoutes) r.push(`- \`${route}\``);
  r.push("", "## Aantallen", "");
  for (const [k, v] of Object.entries(m.aantallen)) r.push(`- ${k}: ${v}`);
  r.push("");
  mkdirSync(dirname(LEESBAAR), { recursive: true });
  writeFileSync(LEESBAAR, r.join("\n"), "utf8");
}

describe("projectmanifest", () => {
  const nu = bouwManifest();

  it("staat gelijk aan docs/manifest.json", () => {
    if (SCHRIJF) {
      mkdirSync(dirname(MANIFEST), { recursive: true });
      writeFileSync(MANIFEST, JSON.stringify(nu, null, 2) + "\n", "utf8");
      schrijfLeesbaar(nu);
      return;
    }
    expect(existsSync(MANIFEST), `${MANIFEST} ontbreekt — draai \`npm run manifest\``).toBe(true);
    const opgeslagen = JSON.parse(readFileSync(MANIFEST, "utf8")) as Manifest;
    expect(opgeslagen, "het manifest loopt achter op de code — draai `npm run manifest`").toEqual(
      nu,
    );
  });

  it("elke paginaslug wordt door minstens één bestand gelezen", () => {
    const wees = nu.paginateksten.filter((p) => p.gelezenDoor.length === 0).map((p) => p.slug);
    expect(wees, "een pagina-ingang die niets rendert hoort niet in de admin te staan").toEqual([]);
  });

  it("elk contenttype heeft een datalaag en een seed", () => {
    // `paginas` heeft geen `maakLezer` (lib/paginas-data.ts voegt per veld samen)
    // en `artikelen` is de gedocumenteerde uitzondering uit CLAUDE.md:
    // lib/inzichten-data.ts verrijkt elk artikel met auteur en dienst, en past
    // daarom niet in de standaardvorm.
    const UITZONDERING = new Set(["paginas", "artikelen"]);
    const half = nu.contenttypen
      .filter((c) => !UITZONDERING.has(c.type) && (!c.datalaag || !c.seed))
      .map((c) => c.type);
    expect(half).toEqual([]);
  });
});
