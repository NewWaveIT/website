import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * De tegenhanger van tests/e2e/admin-toegankelijkheid.spec.ts.
 *
 * Die e2e-suite draait axe-core op een opmaakfixture van de adminschil, want
 * de echte admin zit achter Supabase-auth en is in CI niet te bereiken. Dat
 * vangt contrast, koppenstructuur en horizontaal schuiven — alles wat aan de
 * CSS hangt. Wat het niet kan vangen is of de componenten zélf de juiste ARIA
 * meegeven, want die staan niet in de fixture.
 *
 * Vandaar deze bronleesbewaker. Drie regels, elk met een concrete aanleiding:
 * de twee detaildrawers waren `<aside>`-elementen zonder rol, de statusknoppen
 * lieten alleen met een CSS-klasse zien welke aan stond, en er stonden
 * knoppen met alleen een icoon erin die een schermlezer als "knop" voorleest
 * en verder niets.
 */

const MAPPEN = ["components/admin", "app/admin"];

/**
 * Commentaar eruit, regelnummers intact.
 *
 * Deze bewaker zoekt naar losse stukjes tekst als `aria-pressed`, en een
 * toelichting die het woord noemt telt dan mee als implementatie — waarmee de
 * regel precies bij het bestand dat hem uitlegt niets meer controleert. Dus
 * blank ik commentaar uit in plaats van het weg te knippen: dezelfde lengte,
 * dezelfde nieuweregels, alleen geen inhoud meer om per ongeluk op te matchen.
 */
function zonderCommentaar(bron: string): string {
  const blanco = (m: string) => m.replace(/[^\n]/g, " ");
  return bron.replace(/\/\*[\s\S]*?\*\//g, blanco).replace(/^[ \t]*\/\/.*$/gm, blanco);
}

function bronbestanden(map: string, uit: string[] = []): string[] {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) bronbestanden(pad, uit);
    else if (naam.endsWith(".tsx")) uit.push(pad);
  }
  return uit;
}

const BESTANDEN = MAPPEN.flatMap((m) => bronbestanden(m)).map((pad) => ({
  pad,
  bron: zonderCommentaar(readFileSync(pad, "utf8")),
}));

/**
 * De `>` die een JSX-openingstag afsluit, en niet de `>` in `() =>` of in
 * `a > b` binnen een attribuutwaarde. Daarom tellen we accolades en quotes mee
 * in plaats van te vertrouwen op een regex.
 */
function eindeVanTag(bron: string, start: number): number {
  let diepte = 0;
  let quote: string | null = null;
  for (let i = start; i < bron.length; i++) {
    const c = bron[i]!;
    if (quote) {
      if (c === quote) quote = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") quote = c;
    else if (c === "{") diepte++;
    else if (c === "}") diepte--;
    else if (c === ">" && diepte === 0) return i;
  }
  return -1;
}

interface Knop {
  pad: string;
  attributen: string;
  inhoud: string;
  regel: number;
}

function knoppen(): Knop[] {
  const uit: Knop[] = [];
  for (const { pad, bron } of BESTANDEN) {
    for (const m of bron.matchAll(/<button\b/g)) {
      const open = m.index!;
      const tagEinde = eindeVanTag(bron, open);
      if (tagEinde < 0) continue;
      if (bron[tagEinde - 1] === "/") continue; // <button ... /> bestaat niet, maar toch
      const sluit = bron.indexOf("</button>", tagEinde);
      if (sluit < 0) continue;
      uit.push({
        pad,
        attributen: bron.slice(open, tagEinde),
        inhoud: bron.slice(tagEinde + 1, sluit),
        regel: bron.slice(0, open).split("\n").length,
      });
    }
  }
  return uit;
}

/** Alleen een icoon erin: `<GripVertical className="…" />` en verder niets. */
function alleenIcoon(inhoud: string): boolean {
  return inhoud.replace(/<[A-Z][A-Za-z0-9]*\b[^>]*\/>/g, "").trim() === "";
}

const heeftNaam = (attributen: string) =>
  /\baria-label(ledby)?[= ]/.test(attributen) || /\btitle=/.test(attributen);

describe("ARIA in de admin", () => {
  it("er zijn admin-componenten om te controleren", () => {
    expect(BESTANDEN.length).toBeGreaterThan(10);
  });

  it("een knop met alleen een icoon heeft een toegankelijke naam", () => {
    const naamloos = knoppen()
      .filter((k) => alleenIcoon(k.inhoud) && !heeftNaam(k.attributen))
      .map((k) => `${k.pad}:${k.regel}`);
    expect(naamloos, "een schermlezer leest hier alleen 'knop' voor").toEqual([]);
  });

  it("een overlay-paneel is een echte dialoog", () => {
    const fout: string[] = [];
    for (const { pad, bron } of BESTANDEN) {
      // `role="dialog"` of `role={open ? "dialog" : undefined}`.
      if (!/role=(["']dialog["']|\{[^}]*["']dialog["'][^}]*\})/.test(bron)) continue;
      if (!bron.includes("aria-modal")) fout.push(`${pad}: geen aria-modal`);
      if (!/aria-label(ledby)?=/.test(bron)) fout.push(`${pad}: geen toegankelijke naam`);
      // Rol en aria-modal alleen zijn niet genoeg: zonder focusbeheer staat de
      // focus na het openen nog achter het paneel.
      if (!bron.includes("useDialoog")) fout.push(`${pad}: regelt de focus niet via useDialoog`);
    }
    expect(fout).toEqual([]);
  });

  it("een groep schakelknoppen laat zien welke aan staat", () => {
    const fout = BESTANDEN.filter(
      ({ bron }) => bron.includes('role="group"') && !bron.includes("aria-pressed"),
    ).map(({ pad }) => pad);
    expect(fout, "alleen een .on-klasse ziet een schermlezer niet").toEqual([]);
  });
});
