import { test, expect } from "@playwright/test";

/**
 * De twee stukken schil die op elke pagina meeliften en tot nu toe door geen
 * enkele test werden aangeraakt: het mobiele menu en de cookiebanner.
 *
 * Allebei zijn ze puur client-side, allebei staan ze op élke route, en allebei
 * kunnen ze de site onbruikbaar maken zonder dat er iets rood wordt — een menu
 * dat niet meer sluit, of een banner die na "Alleen functioneel" bij elke
 * paginawissel terugkomt.
 */

const TELEFOON = { width: 390, height: 844 };

test.describe("mobiel menu", () => {
  test.use({ viewport: TELEFOON });

  test("opent, sluit met Escape en geeft de focus netjes door", async ({ page }) => {
    await page.goto("/");
    const burger = page.getByRole("button", { name: "Menu", exact: true });
    const menu = page.locator("#m-menu");

    await expect(burger).toHaveAttribute("aria-expanded", "false");
    // Dicht hoort het paneel ook echt buiten bereik te zijn, niet alleen
    // onzichtbaar: anders tabt de bezoeker door links die hij niet ziet.
    await expect(menu).toHaveAttribute("inert", "");

    await burger.click();
    await expect(burger).toHaveAttribute("aria-expanded", "true");
    await expect(menu).not.toHaveAttribute("inert", "");
    // De focus verhuist mee naar binnen.
    await expect(page.getByRole("button", { name: "Sluit menu" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(burger).toHaveAttribute("aria-expanded", "false");
    // En komt terug op de knop waarmee het menu openging.
    await expect(burger).toBeFocused();
  });

  test("een link in het menu navigeert en laat het menu dicht achter", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await page.locator("#m-menu nav a", { hasText: "Werken bij" }).first().click();

    await expect(page).toHaveURL(/\/werken-bij$/);
    await expect(page.getByRole("button", { name: "Menu", exact: true })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  test("de pagina eronder scrollt niet mee zolang het menu open staat", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await expect(page.locator("body")).toHaveClass(/m-menu-open/);
    await page.keyboard.press("Escape");
    await expect(page.locator("body")).not.toHaveClass(/m-menu-open/);
  });
});

test.describe("cookiebanner", () => {
  const banner = (page: import("@playwright/test").Page) =>
    page.getByRole("dialog", { name: "Cookie-toestemming" });

  test("verschijnt bij een eerste bezoek en blijft weg na een keuze", async ({ page }) => {
    await page.goto("/");
    await expect(banner(page)).toBeVisible();

    await page.getByRole("button", { name: "Alleen functioneel" }).click();
    await expect(banner(page)).toHaveCount(0);

    // De keuze staat in localStorage, dus ook na een herlaadbeurt en op een
    // andere route blijft hij weg. Kwam die banner elke keer terug, dan was dat
    // op elke pagina het eerste wat de bezoeker ziet.
    await page.reload();
    await expect(banner(page)).toHaveCount(0);
    await page.goto("/contact");
    await expect(banner(page)).toHaveCount(0);
  });

  test("de twee knoppen leggen elk hun eigen keuze vast", async ({ page }) => {
    // Waarom niet meten of Google echt wordt aangeroepen: die scripts laden
    // alleen als NEXT_PUBLIC_GA_ID is ingesteld, en deze build heeft geen
    // sleutels. Zo'n test zou altijd groen zijn, ook als de opt-in stuk is.
    // Wat wél te controleren valt is de waarde waar de component op afgaat.
    const keuze = () => page.evaluate(() => localStorage.getItem("tnw-consent"));

    await page.goto("/");
    expect(await keuze(), "vooraf is er geen keuze").toBeNull();

    await page.getByRole("button", { name: "Alleen functioneel" }).click();
    expect(await keuze()).toBe("denied");

    // En andersom: accepteren zet 'granted', de enige waarde waarop de
    // component analytics inlaadt.
    await page.evaluate(() => localStorage.removeItem("tnw-consent"));
    await page.reload();
    await page.getByRole("button", { name: "Accepteren" }).click();
    expect(await keuze()).toBe("granted");
  });
});
