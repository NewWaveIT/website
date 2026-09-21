import { test, expect } from "@playwright/test";

/**
 * De herkenningssectie op een sectorpagina.
 *
 * Aanleiding: dit waren rijen in een tweekolomslijst met alleen een dunne
 * scheidingslijn, op de eggshell-achtergrond van de sectie. De eigenaar zag ze
 * bij het nalezen niet staan: "nu gaat het wat op in de pagina". Het is juist
 * het blok waarin een bezoeker zichzelf moet herkennen, dus het mag niet
 * wegvallen.
 *
 * Twee dingen liggen hier vast: een kaart steekt af tegen de sectie, en een
 * oneven laatste kaart laat geen gat naast zich (banken heeft er vijf, de
 * andere sectoren vier).
 */

const wegMetDeCookiemelding = (page: import("@playwright/test").Page) =>
  page
    .getByRole("button", { name: "Alleen functioneel" })
    .click({ timeout: 3000 })
    .catch(() => {});

test.describe("herkenningspunten", () => {
  test("staan als kaarten los van de achtergrond", async ({ page }) => {
    await page.goto("/sectoren/publieke-sector");
    await wegMetDeCookiemelding(page);

    const gemeten = await page.evaluate(() => {
      const sectie = document.querySelector<HTMLElement>(".pain");
      const kaart = document.querySelector<HTMLElement>(".pain-item");
      if (!sectie || !kaart) return null;
      const k = getComputedStyle(kaart);
      return {
        sectieAchtergrond: getComputedStyle(sectie).backgroundColor,
        kaartAchtergrond: k.backgroundColor,
        rand: parseFloat(k.borderTopWidth),
        randKleur: k.borderTopColor,
        ronding: parseFloat(k.borderTopLeftRadius),
      };
    });

    expect(gemeten, "er staat een .pain-item in een .pain").not.toBeNull();
    const g = gemeten!;
    expect(g.kaartAchtergrond, "de kaart heeft een eigen vlak").not.toBe(g.sectieAchtergrond);
    expect(g.rand, `rand ${g.rand}px in ${g.randKleur}`).toBeGreaterThanOrEqual(1);
    expect(g.ronding, "dezelfde ronding als de andere kaarten op deze pagina").toBeGreaterThan(0);
  });

  test("laten geen gat naast de laatste kaart bij een oneven aantal", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/sectoren/banken");
    await wegMetDeCookiemelding(page);

    const gemeten = await page.evaluate(() => {
      const grid = document.querySelector<HTMLElement>(".pain-grid");
      const kaarten = [...document.querySelectorAll<HTMLElement>(".pain-item")];
      const laatste = kaarten.at(-1);
      if (!grid || !laatste) return null;
      return {
        aantal: kaarten.length,
        gridBreedte: Math.round(grid.getBoundingClientRect().width),
        laatsteBreedte: Math.round(laatste.getBoundingClientRect().width),
      };
    });

    expect(gemeten, "banken heeft herkenningspunten").not.toBeNull();
    const { aantal, gridBreedte, laatsteBreedte } = gemeten!;
    expect(aantal % 2, `dit gaat alleen op bij een oneven aantal, nu ${aantal}`).toBe(1);
    expect(
      laatsteBreedte,
      `laatste kaart ${laatsteBreedte}px in een grid van ${gridBreedte}px`,
    ).toBeGreaterThan(gridBreedte - 4);
  });
});
