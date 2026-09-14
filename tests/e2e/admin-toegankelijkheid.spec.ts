import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * WCAG-gate op de admin.
 *
 * De admin zit achter Supabase-auth en CI komt daar niet in, dus axe kan de
 * echte schermen niet bezoeken. Wat wél kan: dezelfde markup naast dezelfde CSS
 * zetten in een fixture, en die meten. Dat vangt contrast, focus, koppen en
 * namen — precies de laag waar de fouten zaten die deze test aanleiding gaven
 * (groepskopjes op 4,19:1, actief menu-item op 3,41:1).
 *
 * Wat het níet vangt: of de componenten de juiste ARIA meegeven. Dat leest
 * tests/unit/admin-aria.spec.ts uit de bron.
 *
 * Anders dan de publieke suite doet contrast hier wél mee. Op de site is wit op
 * flame een merkkeuze voor grote displaytekst; in een werkbalk waar iemand de
 * hele dag naar kijkt telt leesbaarheid zwaarder, en daar is naar gehandeld.
 */

const FIXTURE = pathToFileURL(resolve("tests/e2e/fixtures/admin-schil.html")).href;

for (const [naam, breedte] of [
  ["desktop", 1440],
  ["tablet", 768],
  ["telefoon", 375],
] as const) {
  test(`de admin-schil voldoet aan WCAG 2.1 AA (${naam})`, async ({ page }) => {
    await page.setViewportSize({ width: breedte, height: 900 });
    await page.goto(FIXTURE);
    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      violations.map((v) => `${v.id}: ${v.nodes.length}× — ${v.help}`),
      `axe-overtredingen op ${breedte}px`,
    ).toEqual([]);
  });
}

/**
 * De admin schoof horizontaal onder 1024px: 296px op 768, 689px op 375. De
 * oorzaak was dat een grid-track `1fr` is en dus niet onder zijn eigen inhoud
 * kan krimpen. Deze test houdt vast dat dat weg blijft.
 */
test("de admin schuift op geen enkele breedte horizontaal", async ({ page }) => {
  await page.goto(FIXTURE);
  const schuif: Record<number, number> = {};
  for (const w of [1440, 1280, 1024, 900, 768, 430, 375, 320]) {
    await page.setViewportSize({ width: w, height: 900 });
    schuif[w] = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
  }
  expect(schuif).toEqual({
    1440: 0,
    1280: 0,
    1024: 0,
    900: 0,
    768: 0,
    430: 0,
    375: 0,
    320: 0,
  });
});

/** De enige admin-pagina die zonder sessie te bereiken is. */
test("de loginpagina voldoet aan WCAG 2.1 AA", async ({ page }) => {
  await page.goto("/admin/login");
  const { violations } = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});
