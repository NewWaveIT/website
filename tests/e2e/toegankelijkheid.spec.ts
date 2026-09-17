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
 * vastgelegd in CLAUDE.md.
 *
 * Die uitzondering stond eerder als `disableRules(["color-contrast"])`, dus
 * regelbreed. Daarmee glipte álles wat verder niet haalde er ook doorheen:
 * oranje tekst op wit (3,4:1), het kruimelpad op de donkere hero (2,9:1),
 * partnerlogo's op wit (2,65:1). De regel staat nu aan en alleen déze ene
 * combinatie wordt achteraf weggefilterd, op de gemeten kleuren zelf.
 */
const MERKUITZONDERING = { voorgrond: "#ffffff", achtergrond: "#f15822" };

/** Is deze melding de merkcombinatie wit-op-flame? */
function isMerkuitzondering(node: { any?: { message?: string }[] }): boolean {
  const m = node.any?.[0]?.message ?? "";
  return (
    m.includes(`foreground color: ${MERKUITZONDERING.voorgrond}`) &&
    m.includes(`background color: ${MERKUITZONDERING.achtergrond}`)
  );
}

/** Laat alleen contrastfouten over die niet onder de merkuitzondering vallen. */
function zonderMerkuitzondering<
  T extends { id: string; nodes: { any?: { message?: string }[] }[] },
>(violations: T[]): T[] {
  return violations
    .map((v) =>
      v.id === "color-contrast"
        ? { ...v, nodes: v.nodes.filter((n) => !isMerkuitzondering(n)) }
        : v,
    )
    .filter((v) => v.nodes.length > 0);
}

for (const [naam, pad] of PAGINATYPEN) {
  test(`${naam} (${pad}) voldoet aan WCAG 2.1 AA`, async ({ page }) => {
    await page.goto(pad);
    const rapport = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const violations = zonderMerkuitzondering(rapport.violations);

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

  const rapport = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(zonderMerkuitzondering(rapport.violations).map((v) => v.id)).toEqual([]);
});
