import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FIELD_SCHEMAS } from "@/lib/cms/schema";

/**
 * Een veld in de editor dat nergens op de site verschijnt.
 *
 * Dat is geen theoretisch probleem: er stonden er negen. Een redacteur vulde
 * "Teaser-metric" of "Tweede knop" in, sloeg op, en er gebeurde niets — zonder
 * enige aanwijzing waarom. Ze waren ooit gebouwd, later uit de pagina
 * verdwenen, en in het schema blijven staan omdat niets ze opruimt.
 *
 * tests/unit/cms-pages.spec.ts doet dit al voor de paginateksten, die hun
 * velden via `t.<sleutel>` lezen. De acht contenttypen lezen anders: als
 * `s.pitch`, `inhoud.waarborg`, of gedestructureerd. Daarom zoekt deze test
 * breder — komt de naam ergens buiten zijn eigen definitie voor — en dus met
 * meer kans op vals groen dan op vals rood. Dat is de goede kant om te falen:
 * hij vangt het geval dat echt voorkwam (nergens meer gebruikt) zonder een
 * legitieme indirecte toegang af te keuren.
 */

/** Waar een veldnaam alleen maar gedefinieerd wordt, niet gelezen. */
const DEFINITIE = new Set([
  "lib/cms/schema.ts",
  "lib/cms/schemas.ts",
  "lib/cms/pages.ts",
  "lib/cms/rij.ts",
  "lib/services.ts",
  "lib/sectoren-detail.ts",
  "lib/diensten-detail.ts",
  "lib/team.ts",
  "lib/klantverhalen.ts",
  "lib/inzichten.ts",
  "lib/vacatures.ts",
  "lib/proposities.ts",
  "lib/content-blokken.ts",
]);

function bronbestanden(map: string, uit: string[] = []): string[] {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) bronbestanden(pad, uit);
    else if ((naam.endsWith(".ts") || naam.endsWith(".tsx")) && !DEFINITIE.has(pad)) uit.push(pad);
  }
  return uit;
}

const BRON = ["app", "components", "lib"]
  .flatMap((w) => bronbestanden(w))
  .map((pad) => readFileSync(pad, "utf8"))
  .join("\n");

describe("elk CMS-veld wordt ergens gebruikt", () => {
  for (const [type, velden] of Object.entries(FIELD_SCHEMAS)) {
    // De paginateksten hebben hun eigen, striktere test: die weet per slug
    // welke pagina het veld hoort te renderen.
    if (type === "paginas") continue;
    it(type, () => {
      const dood = velden.map((v) => v.key).filter((k) => !new RegExp(`\\b${k}\\b`).test(BRON));
      expect(dood, `${type}: staat in de editor maar wordt nergens gelezen`).toEqual([]);
    });
  }
});
