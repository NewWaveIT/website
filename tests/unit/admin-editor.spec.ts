import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Eén regel, met een dure aanleiding.
 *
 * Zes velden in de editor bewaren hun waarde in een verborgen invoerveld:
 * rijke tekst, afbeelding, icoon, auteur, keuze en de gestructureerde
 * lijsten. Uit zo'n veld komt geen change-event, en React maakt
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

/**
 * Commentaar eruit, regelnummers intact — zelfde reden als in
 * admin-aria.spec.ts: een toelichting die het gezochte woord noemt zou de
 * controle laten slagen bij precies het bestand dat hem uitlegt.
 */
function zonderCommentaar(bron: string): string {
  const blanco = (m: string) => m.replace(/[^\n]/g, " ");
  return bron.replace(/\/\*[\s\S]*?\*\//g, blanco).replace(/^[ \t]*\/\/.*$/gm, blanco);
}

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

  /**
   * De werkbalk moet tonen waar de cursor ín staat. In TipTap 3 hertekent
   * `useEditor` de component niet meer bij elke transactie, alleen als de
   * inhoud verandert — dus `editor.isActive(...)` werd één keer uitgelezen en
   * daarna niet meer. Je klikte op Kop, de knop sprong aan, en hij bleef aan
   * zodra je de cursor naar een gewone alinea zette.
   *
   * Dit is een bewaker op de bron en niet op het gedrag, want de editor zit
   * achter Supabase-auth en is in CI niet te bereiken. Nagemeten is hij wel:
   * met een tijdelijke proefpagina op de dev-server volgde de knop de cursor
   * correct, en zodra de abonnering bevroren werd liep hij weer achter.
   */
  it("de werkbalk abonneert op de selectie", () => {
    const bron = zonderCommentaar(lees("rich-text-editor.tsx"));
    // Op de aanroep en niet op de import: met `useEditorState as iets` staat de
    // naam er nog wel, terwijl de haak niet meer gebruikt hoeft te worden.
    expect(bron, "zonder useEditorState hertekent de werkbalk niet bij een cursorsprong").toMatch(
      /useEditorState\(\{/,
    );
    // En de aan-stand hoort ook hoorbaar te zijn, niet alleen zichtbaar.
    expect(bron).toContain("aria-pressed");
  });

  it("het formulier luistert op de DOM en niet met onChange", () => {
    const bron = lees("content-editor.tsx");
    expect(bron).toContain('form.addEventListener("input"');
    // `<form onChange={…}>` slaat juist de verborgen velden over.
    expect(bron).not.toMatch(/<form[\s\S]{0,200}?onChange=/);
  });
});
