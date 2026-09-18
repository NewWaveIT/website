import { describe, expect, it } from "vitest";
import { kaartVerlies, uploadWaarschuwing } from "@/lib/beeld-eisen";

/**
 * De upload is de enige plek waar een redacteur te horen krijgt wat hij zelf
 * niet kan zien: of het beeld scherp genoeg is, en hoeveel de kaart in het
 * overzicht eraf haalt. De cijfers hieronder zijn de echte omslagen van de vijf
 * inzichten, gemeten op 18 september.
 */

describe("wat de kaart wegsnijdt", () => {
  it("laat een beeld dat al 3:2 is met rust", () => {
    expect(kaartVerlies(1800, 1200)).toBe(0);
  });

  it("rekent het verlies van de echte omslagen goed uit", () => {
    const pct = (b: number, h: number) => Math.round(kaartVerlies(b, h) * 100);
    expect(pct(1600, 1065), "Novi, 1.50").toBe(0);
    expect(pct(417, 290), "het diagram, 1.44").toBe(4);
    expect(pct(1600, 1417), "zorg, 1.13").toBe(25);
    expect(pct(1600, 1423), "bank, 1.12").toBe(25);
    expect(pct(1600, 826), "security-audit, 1.94").toBe(23);
  });

  it("valt niet om op een ontbrekende maat", () => {
    expect(kaartVerlies(0, 0)).toBe(0);
  });
});

describe("de melding bij een upload", () => {
  it("zwijgt bij een beeld dat groot genoeg en goed van vorm is", () => {
    expect(uploadWaarschuwing("cover", 1800, 1200)).toBeUndefined();
  });

  it("meldt een te kleine afbeelding", () => {
    expect(uploadWaarschuwing("cover", 900, 600)).toMatch(/900px breed/);
  });

  /* Beide bezwaren horen in één melding te staan: met alleen het eerste lever
     je hem opnieuw aan op 1200 breed en klopt de vorm nog steeds niet. Een
     vierkante schermafdruk van 500px is allebei. */
  it("noemt allebei de bezwaren als ze allebei gelden", () => {
    const m = uploadWaarschuwing("cover", 500, 500) ?? "";
    expect(m).toMatch(/500px breed/);
    expect(m).toMatch(/op de kaart/i);
  });

  /* Het diagram uit de praktijk (417x290) is wél te klein maar met 4% verlies
     niet te vierkant. Dan hoort er maar één bezwaar te staan -- anders leert de
     melding je iets aanpassen dat niet stuk is. */
  it("zwijgt over de vorm als de hap klein is", () => {
    const m = uploadWaarschuwing("cover", 417, 290) ?? "";
    expect(m).toMatch(/417px breed/);
    expect(m).not.toMatch(/op de kaart/i);
  });

  it("zegt of het beeld te vierkant of juist te breed is", () => {
    expect(uploadWaarschuwing("cover", 1600, 1417)).toMatch(/vierkanter/);
    expect(uploadWaarschuwing("cover", 1600, 826)).toMatch(/breder/);
  });

  /* Beeld in de lopende tekst staat op zijn eigen verhouding en komt nooit op
     een kaart, dus daar geldt alleen de breedte. */
  it("kijkt bij beeld in de tekst niet naar de vorm", () => {
    expect(uploadWaarschuwing("inline", 1600, 1417)).toBeUndefined();
    expect(uploadWaarschuwing("inline", 400, 400)).toMatch(/400px breed/);
  });
});
