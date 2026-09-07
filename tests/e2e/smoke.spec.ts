import { test, expect } from "@playwright/test";

/**
 * Smoketests: de publieke site moet renderen en de kernroutes moeten 200 geven.
 * Draait tegen een productie-build met ingebouwde fallback-content (geen
 * Supabase-env nodig), dus we testen structuur/bereikbaarheid, geen live data.
 */

const ROUTES = [
  "/",
  "/diensten",
  "/diensten/mendix",
  "/diensten/ai",
  "/diensten/strategie",
  "/diensten/it-strategie",
  "/diensten/foundation-starterkit",
  "/diensten/fusion-team-startsprint",
  "/sectoren",
  "/over-ons",
  "/werken-bij",
  "/inzichten",
  "/klantverhalen",
  "/contact",
];

test.describe("Publieke routes", () => {
  for (const path of ROUTES) {
    test(`${path} rendert en geeft 200`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status(), `status van ${path}`).toBe(200);
      await expect(page.locator("main")).toBeVisible();
      // Nav + footer horen op elke pagina te staan.
      await expect(page.getByRole("link", { name: /The New Wave IT/i }).first()).toBeVisible();
    });
  }
});

test("Onbekende route toont de 404-pagina", async ({ page }) => {
  const res = await page.goto("/deze-pagina-bestaat-niet-42");
  expect(res?.status()).toBe(404);
  await expect(page.locator("main")).toBeVisible();
});

test("Contactformulier is aanwezig en invulbaar", async ({ page }) => {
  await page.goto("/contact");
  const naam = page.locator('input[name="naam"]');
  const email = page.locator('input[name="email"]');
  const toelichting = page.locator('textarea[name="toelichting"]');

  await expect(naam).toBeVisible();
  await expect(email).toBeVisible();
  await expect(toelichting).toBeVisible();
  await expect(
    page.getByRole("button", { name: /verstuur|plan|verzend|vraag|contact/i }),
  ).toBeVisible();

  await naam.fill("Test Bezoeker");
  await email.fill("test@example.com");
  await expect(naam).toHaveValue("Test Bezoeker");
  await expect(email).toHaveValue("test@example.com");
});

test("?dienst= selecteert de dienst en toont de bijbehorende vervolgvraag", async ({ page }) => {
  await page.goto("/contact?dienst=app-in-a-day");
  await expect(page.locator("select#f-dienst")).toHaveValue("app-in-a-day");
  await expect(page.getByText("Welk proces heb je in gedachten?")).toBeVisible();
  // Een dagdienst vraagt om een datum, geen strategiegesprek.
  await expect(page.getByRole("button", { name: /vraag een datum aan/i })).toBeVisible();
});

test("de contact-CTA is laagdrempelig, geen strategiegesprek", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Plan een gesprek" }).first()).toBeVisible();
  await expect(page.getByText(/strategiegesprek/i)).toHaveCount(0);
});
