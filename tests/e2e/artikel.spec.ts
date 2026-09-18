import { test, expect } from "@playwright/test";

/**
 * De artikelpagina, en dan vooral het coverbeeld.
 *
 * Aanleiding: het kader had een vaste hoogte van 420px met `object-fit: cover`.
 * Een diagram van 417x290 werd daardoor uitgerekt naar 978 breed (wazig) en
 * verloor zijn bovenste rij (bijgesneden). Een redacteur ziet dat in de editor
 * niet — daar oogt het beeld prima — dus het moet hier vastliggen.
 *
 * Drie regels, en ze zijn alle drie te meten op de gerenderde pagina:
 * het kader heeft de verhouding van het beeld, het beeld wordt nooit breder
 * getoond dan het zelf is, en de bijsnijdmodus staat op `scale-down`.
 */

const ARTIKEL = "/inzichten/van-0-naar-100-apps-in-een-bank";

const wegMetDeCookiemelding = (page: import("@playwright/test").Page) =>
  page
    .getByRole("button", { name: "Alleen functioneel" })
    .click({ timeout: 3000 })
    .catch(() => {});

test.describe("coverbeeld", () => {
  test("wordt niet bijgesneden en niet opgeschaald", async ({ page }) => {
    await page.goto(ARTIKEL);
    await wegMetDeCookiemelding(page);

    const gemeten = await page.evaluate(async () => {
      const kader = document.querySelector<HTMLElement>(".acover.beeldkader");
      if (!kader) return null;
      const img = kader.querySelector("img") as HTMLImageElement | null;
      if (!img) return null;
      if (!img.complete) await img.decode().catch(() => {});
      return {
        kaderB: kader.clientWidth,
        kaderH: kader.clientHeight,
        natB: img.naturalWidth,
        natH: img.naturalHeight,
        fit: getComputedStyle(img).objectFit,
      };
    });

    expect(gemeten, "het coverbeeld staat in een .acover.beeldkader").not.toBeNull();
    const { kaderB, kaderH, natB, natH, fit } = gemeten!;

    expect(fit, "scale-down snijdt niet af en schaalt niet op").toBe("scale-down");

    // Het kader volgt het beeld: zelfde verhouding, op afronding na.
    const verschil = Math.abs(kaderB / kaderH - natB / natH);
    expect(
      verschil,
      `kader ${kaderB}x${kaderH} (${(kaderB / kaderH).toFixed(3)}) tegen beeld ${natB}x${natH} (${(natB / natH).toFixed(3)})`,
    ).toBeLessThan(0.02);

    // En het wordt nooit groter getoond dan het is. 1px speling voor afronding.
    expect(kaderB, `getoond op ${kaderB}px, beeld is ${natB}px`).toBeLessThanOrEqual(natB + 1);
  });

  test("toont de auteur en drie verwante artikelen", async ({ page }) => {
    await page.goto(ARTIKEL);
    await wegMetDeCookiemelding(page);

    // De auteur is een teamlid, dus naam én functie horen er te staan.
    const blok = page.locator(".auteurblok");
    await expect(blok).toBeVisible();
    await expect(blok.locator(".auteurblok-naam")).not.toBeEmpty();
    await expect(blok.locator(".auteurblok-rol")).not.toBeEmpty();

    await expect(page.locator(".verwant .post")).toHaveCount(3);
    // Nooit een verwijzing naar het artikel dat je al leest.
    await expect(page.locator(`.verwant a[href="${ARTIKEL}"]`)).toHaveCount(0);
  });

  /* Het label hing onvoorwaardelijk aan de waarde, dus een leeg leestijdveld
     gaf letterlijk " leestijd · 18 sep 2026". De leestijd komt nu uit de tekst. */
  test("zet geen label zonder waarde in de byline", async ({ page }) => {
    await page.goto(ARTIKEL);
    const regel = (await page.locator(".byline .sub").textContent()) ?? "";
    expect(regel.trim()).not.toMatch(/^leestijd/);
    expect(regel).toMatch(/\d+ min leestijd · /);
  });
});
