import { test, expect } from "@playwright/test";

/**
 * Doorlopende tekst leest overal even breed.
 *
 * Aanleiding, gemeten op een venster van 1440: het artikel stond op 660px (57
 * tekens per regel), het klantverhaal op 1012 (111 tekens) en de twee
 * juridische pagina's op 691 (85 tekens). Comfortabel leest tussen de 45 en 75,
 * dus het klantverhaal was anderhalf keer te breed -- en het had als enige geen
 * enkele visuele sectiegrens: de body was 10.572px hoog met vier h2's die
 * niets markeerden.
 *
 * Alle vier lezen nu uit `.langvorm` in globals.css. Deze test meet dat op de
 * pagina zelf, want dat is waar het misging: in de CSS zag elk van de drie er
 * op zichzelf redelijk uit.
 */

const PAGINAS = [
  ["artikel", "/inzichten/van-0-naar-100-apps-in-een-bank", ".aprose"],
  ["klantverhaal", "/klantverhalen/moove", ".prose"],
  ["privacy", "/privacy", ".prose"],
  ["algemene voorwaarden", "/algemene-voorwaarden", ".prose"],
] as const;

const wegMetDeCookiemelding = (page: import("@playwright/test").Page) =>
  page
    .getByRole("button", { name: "Alleen functioneel" })
    .click({ timeout: 3000 })
    .catch(() => {});

test.describe("langvorm", () => {
  for (const [naam, pad, selector] of PAGINAS) {
    test(`${naam} leest op een prettige regellengte`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(pad);
      await wegMetDeCookiemelding(page);

      const gemeten = await page.evaluate((s) => {
        const kolom = document.querySelector<HTMLElement>(s);
        if (!kolom) return null;
        const alinea = [...kolom.querySelectorAll("p")].find(
          (p) => (p.textContent ?? "").trim().length > 120,
        );
        if (!alinea) return null;
        const cs = getComputedStyle(alinea);
        // De breedte van een "x" is een bruikbare benadering van de gemiddelde
        // letterbreedte; nauwkeuriger dan de ch-eenheid, die de nul meet.
        const meting = document.createElement("canvas").getContext("2d")!;
        meting.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        return {
          kolom: Math.round(kolom.getBoundingClientRect().width),
          tekens: Math.round(alinea.getBoundingClientRect().width / meting.measureText("x").width),
          grootte: cs.fontSize,
        };
      }, selector);

      expect(gemeten, `${pad} heeft een ${selector} met een alinea erin`).not.toBeNull();
      const { kolom, tekens, grootte } = gemeten!;
      expect(
        tekens,
        `${naam}: ${tekens} tekens per regel in een kolom van ${kolom}px op ${grootte}`,
      ).toBeLessThanOrEqual(80);
      expect(kolom, `${naam}: kolombreedte`).toBeLessThanOrEqual(700);
    });
  }

  /* De h2 markeert een sectiegrens met een lijn erboven. Op het klantverhaal
     ontbrak dat, en daar was het juist het hardst nodig: vier koppen in een
     body van tien schermen hoog. */
  test("een kop midden in de tekst markeert een sectiegrens", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/privacy");
    await wegMetDeCookiemelding(page);

    const lijn = await page.evaluate(() => {
      const koppen = [...document.querySelectorAll<HTMLElement>(".langvorm h2")];
      const later = koppen.find((h) => h.previousElementSibling);
      if (!later) return null;
      const cs = getComputedStyle(later);
      return { breedte: parseFloat(cs.borderTopWidth), boven: parseFloat(cs.marginTop) };
    });

    expect(lijn, "er staat een h2 met iets ervoor").not.toBeNull();
    expect(lijn!.breedte, "lijn boven de kop").toBeGreaterThan(0);
    expect(lijn!.boven, "ruimte boven de kop").toBeGreaterThan(40);
  });
});
