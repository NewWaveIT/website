import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { beschrijf, zonderMerkuitzondering } from "./axe-merkuitzondering";

/**
 * WCAG 2.1 AA-gate op de sjablonen van de site: één pagina per paginatype,
 * niet elke route — dezelfde componenten leveren anders dezelfde melding tien
 * keer op.
 *
 * Bewust automatisch én beperkt: axe vindt ongeveer een derde van de echte
 * problemen (contrast, namen, rollen, structuur). Het vervangt geen
 * toetsenbord- en schermlezertest, maar het houdt wél tegen dat een nieuwe
 * sectie zonder alt-tekst of met een te licht label ongemerkt de site op komt.
 */

const PAGINATYPEN: [naam: string, pad: string][] = [
  ["homepage", "/"],
  ["dienstenoverzicht", "/diensten"],
  ["richting-hub", "/diensten/mendix"],
  ["dienstpagina", "/diensten/app-in-a-day"],
  ["sectoroverzicht", "/sectoren"],
  ["sectorpagina", "/sectoren/publieke-sector"],
  ["klantverhaal", "/klantverhalen/moove"],
  ["artikel", "/inzichten/novi-ai-collega-overheid"],
  ["over-ons", "/over-ons"],
  ["werken-bij", "/werken-bij"],
  ["contact", "/contact"],
];

/**
 * Met bewegingsvoorkeur "reduce": de homepage heeft twee blokken die vanzelf
 * doorwisselen (de hero-crossfade en de klantverhalen-carrousel). Meet axe
 * midden in zo'n overgang, dan leest hij een kleur op een half doorzichtige
 * ondergrond en meldt contrast dat er in geen enkele eindstand is -- twee keer
 * een rode test zonder bevinding. De site zet die animaties zelf uit bij deze
 * voorkeur, dus dit meet een stand die bezoekers ook echt krijgen. Beweging op
 * zich is een eigen eis (WCAG 2.2.2) en wordt bewaakt door de pauzeknoppen.
 */
test.use({ reducedMotion: "reduce" });

for (const [naam, pad] of PAGINATYPEN) {
  test(`${naam} (${pad}) voldoet aan WCAG 2.1 AA`, async ({ page }) => {
    await page.goto(pad);
    const rapport = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const violations = zonderMerkuitzondering(rapport.violations);

    // Bij een fout wil je weten wélk element, niet alleen hoeveel er zijn.
    expect(
      violations,
      `${violations.length} probleem(en) op ${pad}:\n  ${beschrijf(violations)}`,
    ).toEqual([]);
  });
}

test("het contactformulier blijft toegankelijk als het fouten toont", async ({ page }) => {
  await page.goto("/contact");
  // Leeg versturen: de validatie zet aria-invalid en focus op het eerste veld.
  await page.getByRole("button", { name: /verstuur|plan|verzend|vraag/i }).click();
  await expect(page.locator("[aria-invalid='true']").first()).toBeVisible();

  const rapport = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(zonderMerkuitzondering(rapport.violations).map((v) => v.id)).toEqual([]);
});
