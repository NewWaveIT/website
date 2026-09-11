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

/**
 * De andere richting: een sleutel die een pagina opvraagt maar die niet in het
 * schema staat. `getPagina` levert `Record<string, string>`, dus `t.mensenTitell`
 * compileert prima en rendert stil niets. Deze test leest per bestand welke
 * pagina's het opvraagt en controleert elke `t.…` daartegen.
 *
 * Dit leunt op de conventie dat de paginateksten altijd `t` heten. Noem een
 * lokale variabele in zo'n bestand dus niet ook `t` — deze test kent geen
 * scopes en ziet dan een sleutel die niet bestaat.
 */
const BESTANDEN = WORTELS.flatMap((w) => bronbestanden(w)).map((pad) => ({
  pad,
  bron: readFileSync(pad, "utf8"),
}));

/** De paginaslugs die één bestand opvraagt; een sjabloon telt als alle treffers. */
function opgevraagdeSlugs(bron: string): string[] {
  const uit = new Set<string>();
  for (const m of bron.matchAll(/getPagina\("([a-z0-9-]+)"\)/g)) uit.add(m[1]!);
  for (const m of bron.matchAll(/getPagina\(`([a-z0-9-]*)\$\{[^}]+\}`\)/g)) {
    const voor = m[1] ?? "";
    for (const slug of Object.keys(PAGE_FIELDS)) if (slug.startsWith(voor)) uit.add(slug);
  }
  return [...uit];
}

describe("elke opgevraagde sleutel staat in het schema", () => {
  const lezers = BESTANDEN.map((b) => ({ ...b, slugs: opgevraagdeSlugs(b.bron) })).filter(
    (b) => b.slugs.length > 0,
  );

  it("er zijn bestanden die paginateksten lezen", () => {
    expect(lezers.length).toBeGreaterThan(0);
  });

  for (const { pad, bron, slugs } of lezers) {
    it(pad, () => {
      const bekend = new Set(slugs.flatMap((s) => (PAGE_FIELDS[s] ?? []).map((v) => v.key)));

      const onbekend = [...bron.matchAll(/\bt\.([a-zA-Z][A-Za-z0-9]*)\b/g)]
        .map((m) => m[1]!)
        .filter((k) => !bekend.has(k));

      // Een lus als t[`groei${n}Titel`] moet minstens één bestaand veld raken.
      const leegSjabloon = [...bron.matchAll(/\bt\[`([A-Za-z]*)\$\{[^}]+\}([A-Za-z]*)`\]/g)]
        .filter(
          ([, voor = "", na = ""]) =>
            ![...bekend].some(
              (k) => k.startsWith(voor) && k.endsWith(na) && k.length > voor.length + na.length,
            ),
        )
        .map(([hele]) => hele);

      expect(
        [...new Set(onbekend)],
        `${pad}: leest een sleutel die niet in PAGE_FIELDS staat`,
      ).toEqual([]);
      expect(leegSjabloon, `${pad}: lus over velden die niet bestaan`).toEqual([]);
    });
  }
});
