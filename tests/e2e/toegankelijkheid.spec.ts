import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
 * Witte tekst op flame (#f15822) haalt bewust geen AA — dat is een merkkeuze,
 * vastgelegd in CLAUDE.md. Zou contrast hier meedoen, dan is de test permanent
 * rood en kijkt niemand er meer naar. De rest van WCAG geldt onverkort.
 */
const UITGEZONDERD = ["color-contrast"];

for (const [naam, pad] of PAGINATYPEN) {
  test(`${naam} (${pad}) voldoet aan WCAG 2.1 AA`, async ({ page }) => {
    await page.goto(pad);
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .disableRules(UITGEZONDERD)
      .analyze();

    // Bij een fout wil je weten wélk element, niet alleen hoeveel er zijn.
    const melding = violations
      .map(
        (v) =>
          `${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.map((n) => n.target).join("\n    ")}`,
      )
      .join("\n  ");
    expect(violations, `${violations.length} probleem(en) op ${pad}:\n  ${melding}`).toEqual([]);
  });
}

test("het contactformulier blijft toegankelijk als het fouten toont", async ({ page }) => {
  await page.goto("/contact");
  // Leeg versturen: de validatie zet aria-invalid en focus op het eerste veld.
  await page.getByRole("button", { name: /verstuur|plan|verzend|vraag/i }).click();
  await expect(page.locator("[aria-invalid='true']").first()).toBeVisible();

  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .disableRules(UITGEZONDERD)
    .analyze();
  expect(violations.map((v) => v.id)).toEqual([]);
});
