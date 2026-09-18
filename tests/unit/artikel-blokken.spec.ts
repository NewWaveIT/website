import { describe, expect, it } from "vitest";
import { kiesVerwant } from "@/components/inzichten/verwante-artikelen";
import { leestijdUitTekst } from "@/lib/inzichten-data";
import type { Artikel } from "@/lib/inzichten";

/**
 * De twee stukjes logica onder de artikelpagina die stil fout kunnen gaan: een
 * leestijd die nergens vandaan komt, en een lijst verwante artikelen die leeg
 * blijft op precies het artikel dat nergens bij hoort.
 */

function art(slug: string, discipline: string, sector: string): Artikel {
  return {
    slug,
    cat: discipline,
    datum: "1 jan 2026",
    leestijd: "3 min",
    titel: slug,
    auteur: "The New Wave IT",
    image: "/assets/photos/x.webp",
    intro: "",
    body: [],
    discipline,
    sector,
  };
}

describe("leestijd uit de tekst", () => {
  it("rekent op 200 woorden per minuut en telt HTML niet mee", () => {
    const alinea = `<p>${"woord ".repeat(400)}</p>`;
    expect(leestijdUitTekst(alinea)).toBe("2 min");
  });

  it("wordt nooit nul, want '0 min' leest als een fout", () => {
    expect(leestijdUitTekst("Drie woorden hier")).toBe("1 min");
    expect(leestijdUitTekst("")).toBe("1 min");
  });
});

describe("verwante artikelen", () => {
  const huidig = art("nu", "AI", "Banken");
  const alle: Artikel[] = [
    huidig,
    art("los", "Algemeen", "Algemeen"),
    art("zelfde-sector", "Mendix", "Banken"),
    art("zelfde-discipline", "AI", "Zorg"),
    art("allebei", "AI", "Banken"),
  ];

  it("zet de beste match voorop en laat het artikel zelf weg", () => {
    expect(kiesVerwant(alle, huidig).map((a) => a.slug)).toEqual([
      "allebei",
      "zelfde-discipline",
      "zelfde-sector",
    ]);
  });

  /* Een filter zou hier niets teruggeven en het blok laten verdwijnen — juist
     op het artikel dat bij niets aansluit. Daarom een voorkeursvolgorde. */
  it("vult aan tot drie, ook zonder enige overlap", () => {
    const wees = art("wees", "Strategie", "Manufacturing");
    const uit = kiesVerwant([wees, ...alle], wees);
    expect(uit).toHaveLength(3);
    expect(uit.map((a) => a.slug)).not.toContain("wees");
  });

  it("houdt de bestaande volgorde aan bij een gelijke score", () => {
    const geen = art("geen", "Strategie", "Manufacturing");
    // 'los' staat vóór 'zelfde-sector' in de lijst en scoort even hoog (nul).
    expect(
      kiesVerwant([geen, art("los", "Algemeen", "Algemeen"), art("b", "Mendix", "Zorg")], geen).map(
        (a) => a.slug,
      ),
    ).toEqual(["los", "b"]);
  });

  /* "Algemeen" is de waarde voor 'niet gekoppeld'. Twee artikelen die allebei
     ongekoppeld zijn horen daar geen punten voor te krijgen. */
  it("telt 'Algemeen' niet als overeenkomst", () => {
    const a = art("a", "Algemeen", "Algemeen");
    const b = art("b", "Algemeen", "Algemeen");
    const c = art("c", "Mendix", "Zorg");
    expect(kiesVerwant([a, b, c], a).map((x) => x.slug)).toEqual(["b", "c"]);
  });
});
