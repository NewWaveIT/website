import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PAGE_FIELDS } from "@/lib/cms/pages";

/**
 * Wat hier overblijft: dode velden opsporen.
 *
 * Deze test deed er vijf dingen. Vier ervan doet de compiler nu zelf, sinds
 * `PAGE_FIELDS` `as const` is en `getPagina("home")` een getypeerd object
 * oplevert: een sleutel die niet bestaat (`t.mensenTitell`), een default zonder
 * veld, een veld zonder default, en een pagina zonder revalidatiepad zijn alle
 * vier een `tsc`-fout geworden. Zie `lib/cms/pages.ts`.
 *
 * Eén ding ziet de compiler niet: een veld dat wél bestaat en wél een default
 * heeft, maar dat geen enkele pagina rendert. Dat is precies hoe er negentien
 * velden op de homepage stonden waar een redacteur tekst in kon zetten die
 * nergens verscheen. Daarvoor moet je de broncode lezen, want of een sleutel
 * getoond wordt staat in de JSX en niet in een waarde die je kunt inspecteren.
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

const BESTANDEN = WORTELS.flatMap((w) => bronbestanden(w)).map((pad) => ({
  pad,
  bron: readFileSync(pad, "utf8"),
}));

/**
 * De bestanden die de teksten van één slug lezen. Per slug kijken en niet in de
 * hele broncode, want anders telt een veldnaam mee die toevallig ook op een
 * ándere pagina bestaat. Zo bleven `heroTitleStart`, `heroAccent` en `heroLead`
 * op de homepage jarenlang "in gebruik" terwijl de homepage een hero-component
 * met eigen, hardgecodeerde tekst rendert.
 *
 * Een sjabloonaanroep — `getPagina(`diensten-${richting}`)` — telt voor elke
 * slug die op het voorvoegsel begint.
 */
function lezersVan(slug: string): string[] {
  return BESTANDEN.filter(({ bron }) => {
    if (bron.includes(`getPagina("${slug}")`)) return true;
    return [...bron.matchAll(/getPagina\(`([a-z0-9-]*)\$\{[^}]+\}`\)/g)].some(([, voor = ""]) =>
      slug.startsWith(voor),
    );
  }).map(({ bron }) => bron);
}

/** Een lus als t[`groei${n}Titel`] telt als gebruik van elke passende sleutel. */
function viaSjabloon(bron: string, sleutel: string): boolean {
  return [...bron.matchAll(/\bt\[`([A-Za-z]*)\$\{[^}]+\}([A-Za-z]*)`\]/g)].some(
    ([, voor = "", na = ""]) =>
      voor !== "" &&
      sleutel.startsWith(voor) &&
      sleutel.endsWith(na) &&
      sleutel.length > voor.length + na.length,
  );
}

function wordtGelezen(slug: string, sleutel: string): boolean {
  // Alleen `t.sleutel`: dat is de conventie voor paginateksten. Matchen op een
  // losse property-naam was te ruim — `metaTitle` staat ook in
  // lib/sectoren-detail.ts, waardoor de metavelden van de drie richting-hubs
  // als "gebruikt" telden terwijl die pagina's hun eigen, hardgecodeerde
  // `export const metadata` hadden.
  const patroon = new RegExp(`\\bt\\.${sleutel}\\b`);
  return lezersVan(slug).some((bron) => patroon.test(bron) || viaSjabloon(bron, sleutel));
}

describe("elk paginaveld wordt ergens getoond", () => {
  for (const [slug, velden] of Object.entries(PAGE_FIELDS)) {
    it(slug, () => {
      const dood = velden.map((v) => v.key).filter((k) => !wordtGelezen(slug, k));
      expect(dood, `${slug}: staat in de admin maar wordt nergens gerenderd`).toEqual([]);
    });
  }
});
