import { test, expect } from "@playwright/test";

/**
 * Smoketests: de publieke site moet renderen en de kernroutes moeten 200 geven.
 * Draait tegen een productie-build met ingebouwde fallback-content (geen
 * Supabase-env nodig), dus we testen structuur/bereikbaarheid, geen live data.
 */

/** De negen boekbare diensten hebben elk een eigen pagina; die dekken we allemaal,
 *  want de matrix op /diensten linkt er rechtstreeks naartoe. */
const DIENST_SLUGS = [
  "app-in-a-day",
  "ai-agent-in-a-day",
  "ai-opportunity-scan",
  "ai-strategie",
  "it-strategie",
  "mendix-scale-sessie",
  "foundation-starterkit",
  "fusion-team-startsprint",
  "training-enablement",
];

const ROUTES = [
  "/",
  "/diensten",
  "/diensten/mendix",
  "/diensten/ai",
  "/diensten/strategie",
  ...DIENST_SLUGS.map((s) => `/diensten/${s}`),
  "/sectoren",
  "/sectoren/publieke-sector",
  "/over-ons",
  "/werken-bij",
  "/inzichten",
  "/inzichten/novi-ai-collega-overheid",
  "/klantverhalen",
  "/klantverhalen/moove",
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

test("elke kaart in de keuzematrix linkt naar een bestaande pagina", async ({ page, request }) => {
  await page.goto("/diensten");
  const hrefs = await page
    .locator('a[href^="/diensten/"]')
    .evaluateAll((as) => [...new Set(as.map((a) => a.getAttribute("href")!))]);
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    expect((await request.get(href)).status(), `status van ${href}`).toBe(200);
  }
});

test.describe("geen openstaande vacatures", () => {
  test("werken-bij toont een lege staat in plaats van een lege lijst", async ({ page }) => {
    await page.goto("/werken-bij");
    await expect(page.getByText(/geen vacatures open/i)).toBeVisible();
    await expect(page.locator("#vacatures .vrow")).toHaveCount(0);
    // De heroknop mag niet naar een leeg anker springen.
    await expect(page.getByRole("link", { name: /stuur een open sollicitatie/i })).toBeVisible();
    // Het open-sollicitatieformulier blijft juist wél bereikbaar.
    await expect(page.locator("#open-sollicitatie")).toBeVisible();
  });

  test("een vacature-URL geeft 404, en de sitemap noemt er geen", async ({ request }) => {
    expect((await request.get("/vacatures/medior-mendix-consultant")).status()).toBe(404);
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).not.toContain("/vacatures/");
  });
});

test("de richting-hubs tonen 'wanneer wel, wanneer niet'", async ({ page }) => {
  for (const richting of ["mendix", "ai", "strategie"]) {
    await page.goto(`/diensten/${richting}`);
    const sectie = page.locator(".welniet");
    await expect(sectie, `welniet op /diensten/${richting}`).toBeVisible();
    // Beide kolommen gevuld: een eerlijk nee hoort erbij, anders is het reclame.
    expect(await sectie.locator(".welniet-kolom li").count()).toBeGreaterThan(1);
    await expect(sectie.locator(".welniet-kolom--niet li").first()).toBeVisible();
  }
});
