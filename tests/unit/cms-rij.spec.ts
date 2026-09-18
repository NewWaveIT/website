import { describe, expect, it } from "vitest";
import { rijNaarRuw } from "@/lib/cms/rij";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";

/**
 * De keuzevelden van een dienst zijn in het zod-schema een enum, en in de
 * editor een keuzelijst met een expliciete 'leeg'-optie. Tussen die twee zit
 * `rijNaarRuw`. Gaat daar iets langs dat de enum niet kent, dan zakt de hele
 * rij door de validatie: de site valt terug op de seed en logt een
 * console.error per render.
 *
 * Twee lege vormen komen in de praktijk voor. "(geen)" kiest een redacteur
 * zelf. De lege tekst zet "Ontbrekende sleutels aanvullen" op /admin/baseline
 * neer, voor elk keuzeveld dat de seed niet kent — zeven dienstrijen misten
 * `hubTier` of `richting`, dus één druk op die knop maakte ze alle zeven
 * ongeldig.
 */
describe("rijNaarRuw voor een dienst", () => {
  const ruw = (data: Record<string, unknown>) =>
    rijNaarRuw("services", {
      slug: "app-in-a-day",
      titel: "App in a Day",
      volgorde: 1,
      data,
    } as never) as Record<string, unknown>;

  for (const [naam, waarde] of [
    ["de expliciete leeg-optie", "(geen)"],
    ["een lege tekst", ""],
    ["alleen spaties", "  "],
  ] as const) {
    it(`maakt ${naam} leeg in plaats van ongeldig`, () => {
      const uit = ruw({ richting: waarde, hubTier: waarde });
      expect(uit.richting).toBeUndefined();
      expect(CONTENT_SCHEMAS.services.shape.richting.safeParse(uit.richting).success).toBe(true);
      expect(CONTENT_SCHEMAS.services.shape.hubTier.safeParse(uit.hubTier).success).toBe(true);
    });
  }

  it("laat een echte keuze staan", () => {
    const uit = ruw({ richting: "mendix", hubTier: "doen" });
    expect([uit.richting, uit.hubTier]).toEqual(["mendix", "doen"]);
  });

  /* `fase` staat als tekst in de keuzelijst maar is in het schema een getal;
     de seed schrijft er meteen een getal neer. Allebei moeten werken. */
  it("levert fase altijd als getal", () => {
    for (const invoer of [2, "2"]) {
      const uit = ruw({ fase: invoer });
      expect(uit.fase, `invoer ${JSON.stringify(invoer)}`).toBe(2);
      expect(CONTENT_SCHEMAS.services.shape.fase.safeParse(uit.fase).success).toBe(true);
    }
    expect(ruw({ fase: "(geen)" }).fase).toBeUndefined();
  });
});
