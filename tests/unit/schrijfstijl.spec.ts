import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Twee schrijfafspraken die alleen met een test blijven staan.
 *
 * 1. Geen em-streepje (—) in lopende tekst. Het is het duidelijkste spoor van
 *    tekst die door een taalmodel is geschreven, en het Nederlands heeft er
 *    zelden een nodig: een komma, dubbele punt of punt doet hetzelfde werk.
 *    Bereiken houden wél hun halve kastlijn (–): 6–10×, 09:00–17:00.
 * 2. Eén aanspreekvorm op de hele site: "je", nooit "u". /privacy week daarvan
 *    af omdat die tekst van een jurist kwam.
 *
 * Wat buiten de regel valt, staat hieronder als UITZONDERINGEN, met de reden.
 */

const EM = "—";
const WORTELS = ["app", "components", "lib"];
const NEGEER_MAP = new Set(["node_modules", ".next"]);

/** Bestanden en regels waar een em-streepje geen lopende tekst is. */
const UITZONDERINGEN = [
  // Scheidingsteken in een admin-veldlabel ("Hero — titel"). Geen zin maar een
  // kolomkop in de editor, en de editor splitst er zelf op (lib/cms/schema.ts
  // zoekt letterlijk " — " in het label), dus dit streepje is code.
  /\b(label|help|placeholder):\s*"/,
  /indexOf\(" — "\)/,
  // De streep als "leeg" in een admin-tabelcel.
  /"—"/,
  // Ontwikkellog, komt nooit op de site.
  /console\.(warn|error|log)/,
];

function bronbestanden(map: string, uit: string[] = []): string[] {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) {
      if (!NEGEER_MAP.has(naam)) bronbestanden(pad, uit);
    } else if (naam.endsWith(".ts") || naam.endsWith(".tsx")) {
      uit.push(pad);
    }
  }
  return uit;
}

/** Commentaar telt niet mee: dat leest alleen een ontwikkelaar. */
function zonderCommentaar(bron: string): string {
  return bron
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/\s\/\/\s.*$/gm, "");
}

const BESTANDEN = WORTELS.flatMap((w) => bronbestanden(w)).map((pad) => ({
  pad,
  regels: zonderCommentaar(readFileSync(pad, "utf8")).split("\n"),
}));

describe("geen em-streepje in lopende tekst", () => {
  for (const { pad, regels } of BESTANDEN) {
    const treffers = regels
      .map((r, i) => ({ nr: i + 1, tekst: r.trim() }))
      .filter((r) => r.tekst.includes(EM))
      .filter((r) => !UITZONDERINGEN.some((u) => u.test(r.tekst)));
    if (!treffers.length) continue;
    it(pad, () => {
      expect(
        treffers.map((t) => `r${t.nr}: ${t.tekst.slice(0, 90)}`),
        `${pad}: gebruik een komma, dubbele punt of punt; een halve kastlijn (–) alleen voor bereiken`,
      ).toEqual([]);
    });
  }

  it("er zijn bestanden gescand", () => {
    expect(BESTANDEN.length).toBeGreaterThan(50);
  });
});

describe("de site spreekt de bezoeker aan met je", () => {
  // "u" of "uw" als los woord midden in een zin: spatie ervoor (of een quote,
  // aan het begin van een string), spatie en een kleine letter erna. Zo valt
  // code als `.map((u) =>` en de allowlist-regel `"u",` in sanitize.ts erbuiten.
  const U_VORM = /(^|[\s">])(?:U|u|Uw|uw)\s(?=[a-zà-ü])/;
  for (const { pad, regels } of BESTANDEN) {
    if (pad.includes(`app${"/"}admin`) || pad.includes(`components${"/"}admin`)) continue;
    const treffers = regels
      .map((r, i) => ({ nr: i + 1, tekst: r.trim() }))
      .filter((r) => U_VORM.test(r.tekst));
    if (!treffers.length) continue;
    it(pad, () => {
      expect(
        treffers.map((t) => `r${t.nr}: ${t.tekst.slice(0, 90)}`),
        `${pad}: schrijf "je"/"jouw", niet "u"/"uw"`,
      ).toEqual([]);
    });
  }

  // Zonder deze test heeft de suite geen enkele `it` zodra alles schoon is, en
  // dan valt vitest over een leeg blok. Meteen de pagina die het probleem wás.
  it("/privacy spreekt de bezoeker aan met je", () => {
    const bron = readFileSync("app/(marketing)/privacy/page.tsx", "utf8");
    expect(bron).toMatch(/\bje\b/);
    expect(bron.match(U_VORM), "u-vorm terug op de privacypagina").toBeNull();
  });
});
