import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Eén regel, met een dure aanleiding.
 *
 * Zeven velden in de editor bewaren hun waarde in een verborgen invoerveld:
 * rijke tekst, afbeelding, icoon, auteur, keuze, proposities en de
 * gestructureerde lijsten. Uit zo'n veld komt geen change-event, en React maakt
 * er ook geen `onChange` van. Het formulier luisterde met `onChange` op het
 * `<form>`, dus wie een heel artikel herschreef en daarna wegklikte kreeg geen
 * waarschuwing: de editor dacht dat er niets gewijzigd was.
 *
 * De oplossing zit op twee plekken en werkt alleen als ze allebei blijven
 * staan — vandaar dat deze test ze allebei vastlegt.
 */

const MAP = "components/admin";

/** De componenten die namens de editor één waarde bewaren. */
const VELDEN = readdirSync(MAP).filter(
  (n) => n.endsWith("-field.tsx") || n === "rich-text-editor.tsx",
);

const lees = (naam: string) => readFileSync(join(MAP, naam), "utf8");

describe("de editor merkt elke wijziging", () => {
  it("er zijn veldcomponenten om te controleren", () => {
    expect(VELDEN.length).toBeGreaterThanOrEqual(6);
  });

  it.each(VELDEN)("%s bewaart zijn waarde via VerborgenWaarde", (naam) => {
    const bron = lees(naam);
    expect(bron, "een kaal verborgen veld meldt zijn wijziging niet").not.toContain(
      'type="hidden"',
    );
    expect(bron).toContain("VerborgenWaarde");
  });

  it("het formulier luistert op de DOM en niet met onChange", () => {
    const bron = lees("content-editor.tsx");
    expect(bron).toContain('form.addEventListener("input"');
    // `<form onChange={…}>` slaat juist de verborgen velden over.
    expect(bron).not.toMatch(/<form[\s\S]{0,200}?onChange=/);
  });
});
