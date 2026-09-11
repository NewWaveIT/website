import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PAGE_DEFAULTS, PAGE_FIELDS, PAGE_PATH } from "@/lib/cms/pages";

/**
 * De vangrail die de paginateksten als enige laag nog niet hadden.
 *
 * `getPagina` levert een `Record<string, string>`, dus een sleutel die niet
 * bestaat geeft stil `undefined` en een lege plek op de pagina — geen
 * compilerfout, geen regel in de logs. Dat liep twee kanten op mis: negentien
 * velden op de homepage waar niets mee gebeurde (resten van een vorig ontwerp,
 * die een redacteur wél kon invullen), en geen enkele controle op een typefout
 * in de andere richting.
 *
 * Deze test leest de broncode, want de koppeling tussen schema en pagina is
 * statisch: welke sleutel een pagina opvraagt staat in de JSX, niet in een
 * waarde die je op runtime kunt inspecteren.
 */

const WORTELS = ["app", "components", "lib"];
const NEGEER = new Set(["node_modules", ".next", "cms"]);

function bronbestanden(map: string, uit: string[] = []): string[] {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) {
      if (!NEGEER.has(naam)) bronbestanden(pad, uit);
    } else if (naam.endsWith(".ts") || naam.endsWith(".tsx")) {
      uit.push(pad);
    }
  }
  return uit;
}

const BRON = WORTELS.flatMap((w) => bronbestanden(w))
  .map((p) => readFileSync(p, "utf8"))
  .join("\n");

/**
 * Sommige pagina's lezen genummerde velden in een lus: `t[`groei${n}Titel`]`.
 * Die tellen als gebruik voor elke sleutel die op het voorvoegsel begint en op
 * het achtervoegsel eindigt.
 */
const SJABLONEN = [...BRON.matchAll(/\[`([A-Za-z]*)\$\{[^}]+\}([A-Za-z]*)`\]/g)].map((m) => ({
  voor: m[1] ?? "",
  na: m[2] ?? "",
}));

function wordtGelezen(sleutel: string): boolean {
  if (new RegExp(`[.["']${sleutel}\\b`).test(BRON)) return true;
  return SJABLONEN.some(
    ({ voor, na }) =>
      voor !== "" &&
      sleutel.startsWith(voor) &&
      sleutel.endsWith(na) &&
      sleutel.length > voor.length + na.length,
  );
}

describe("elk paginaveld wordt ergens getoond", () => {
  for (const [slug, velden] of Object.entries(PAGE_FIELDS)) {
    it(slug, () => {
      const dood = velden.map((v) => v.key).filter((k) => !wordtGelezen(k));
      expect(dood, `${slug}: staat in de admin maar wordt nergens gerenderd`).toEqual([]);
    });
  }
});

describe("elk paginaveld heeft een standaardtekst", () => {
  for (const [slug, velden] of Object.entries(PAGE_FIELDS)) {
    it(slug, () => {
      const defaults = PAGE_DEFAULTS[slug] ?? {};
      const zonder = velden.map((v) => v.key).filter((k) => !(k in defaults));
      expect(zonder, `${slug}: geen fallback in PAGE_DEFAULTS`).toEqual([]);
    });
  }
});

describe("PAGE_DEFAULTS bevat geen sleutels die het schema niet kent", () => {
  for (const [slug, defaults] of Object.entries(PAGE_DEFAULTS)) {
    it(slug, () => {
      const bekend = new Set((PAGE_FIELDS[slug] ?? []).map((v) => v.key));
      const vreemd = Object.keys(defaults).filter((k) => !bekend.has(k));
      expect(vreemd, `${slug}: staat in de defaults maar niet in PAGE_FIELDS`).toEqual([]);
    });
  }
});

describe("elke pagina met velden heeft een pad om te revalideren", () => {
  it("PAGE_PATH dekt PAGE_FIELDS", () => {
    const zonderPad = Object.keys(PAGE_FIELDS).filter((slug) => !(slug in PAGE_PATH));
    expect(zonderPad).toEqual([]);
  });
});
