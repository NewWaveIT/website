import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Drie vormen die hier telkens opnieuw met de hand worden nagebouwd.
 *
 * Aanleiding, gemeten op 22 september over 30 stylesheets: de witte kaart stond
 * 23 keer los in veertien bestanden, met drie verschillende binnenmarges; het
 * kleine kapitaal boven een kop 54 keer in negentien bestanden; de "meer"-link
 * met pijltje 12 keer in elf bestanden. Dat is hetzelfde patroon als de vier
 * bijna-gelijke uitgelichte kaarten die eerder tot `.beeldkaart` zijn
 * teruggebracht: vier keer dezelfde vorm, vier keer net andere waarden, en op
 * de site dus blokken die op elkaar lijken zonder hetzelfde te zijn.
 *
 * Ze staan nu als `.kaart`, `.kicker` en `.meer-link` in globals.css. Deze test
 * houdt de telling daarbuiten op nul, of -- voor de kicker, waar een deel nog
 * niet om te zetten viel zonder de klassenamen op te schonen -- op het aantal
 * van vandaag, zodat het alleen nog kan dalen.
 */

const WORTELS = ["app", "components"];
const NEGEER = new Set(["node_modules", ".next"]);

function cssBestanden(map: string, uit: string[] = []): string[] {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) {
      if (!NEGEER.has(naam)) cssBestanden(pad, uit);
    } else if (naam.endsWith(".css")) {
      uit.push(pad);
    }
  }
  return uit;
}

interface Regel {
  bestand: string;
  selector: string;
  body: string;
}

/** Platte regelparser: goed genoeg, want we zoeken declaraties, geen structuur. */
function regelsUit(bestand: string): Regel[] {
  const bron = readFileSync(bestand, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  const uit: Regel[] = [];
  const re = /([^{}@]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(bron))) {
    uit.push({
      bestand,
      selector: m[1]!.trim().replace(/\s+/g, " "),
      body: m[2]!.replace(/\s+/g, " ").toLowerCase(),
    });
  }
  return uit;
}

const ALLE = WORTELS.flatMap((w) => cssBestanden(w))
  // De admin heeft een eigen opmaaktaal en staat hier bewust buiten.
  .filter((f) => !f.endsWith(join("app", "admin", "admin.css")))
  .flatMap(regelsUit);

const buitenGlobals = (test: (r: Regel) => boolean) =>
  ALLE.filter(test)
    .filter((r) => !r.bestand.endsWith("globals.css"))
    .map((r) => `${r.selector}  (${r.bestand})`);

describe("de gedeelde vormen staan op één plek", () => {
  it("geen tweede kaart: wit vlak, rand en ronde hoek komen uit .kaart", () => {
    const eigenbouw = buitenGlobals(
      (r) =>
        r.body.includes("background: var(--white)") &&
        r.body.includes("border: 1px solid var(--border-default)") &&
        r.body.includes("border-radius: var(--radius-lg)"),
    );
    expect(
      eigenbouw,
      "zet `kaart` op het element en laat hooguit --kaart-pad in de eigen regel staan",
    ).toEqual([]);
  });

  it("geen tweede 'meer'-link", () => {
    const eigenbouw = buitenGlobals(
      (r) =>
        r.body.includes("display: inline-flex") &&
        r.body.includes("font-weight: var(--fw-semibold)") &&
        r.body.includes("color: var(--orange-text)") &&
        r.body.includes("font-size: var(--text-sm)"),
    );
    expect(eigenbouw, "zet `meer-link` op het element").toEqual([]);
  });

  /*
   * De kicker is nog niet overal om: op vijfendertig plekken heet de klasse
   * `.l`, `.m`, `.q` of `.sp`, en die namen komen in meerdere bestanden voor
   * met andere opmaak -- daar blind een klasse bijzetten verandert dingen die
   * geen kicker zijn. Ze mogen blijven staan, maar er mag er geen bij komen.
   */
  const KICKER_PLAFOND = 35;

  it(`het aantal handgemaakte kickers blijft op ${KICKER_PLAFOND} of daalt`, () => {
    const eigenbouw = buitenGlobals(
      (r) =>
        r.body.includes("font-family: var(--font-mono)") &&
        r.body.includes("text-transform: uppercase") &&
        r.body.includes("letter-spacing"),
    );
    expect(
      eigenbouw.length,
      eigenbouw.length > KICKER_PLAFOND
        ? `nieuwe kicker met de hand nagebouwd; zet \`kicker\` op het element en stel hooguit --kicker-maat en --kicker-kleur in:\n${eigenbouw.join("\n")}`
        : `mooi, er zijn er ${KICKER_PLAFOND - eigenbouw.length} minder geworden -- zet KICKER_PLAFOND op ${eigenbouw.length}`,
    ).toBe(KICKER_PLAFOND);
  });
});
