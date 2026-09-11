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
