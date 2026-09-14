import { test, expect } from "@playwright/test";

/**
 * De conversieflow in een echte browser.
 *
 * De server actions zijn per geval uitgetest (tests/unit/contact-actions.spec.ts
 * en inzichten-actions.spec.ts): honeypot, rate limit, validatie, beide mails,
 * een mislukte insert. Wat daar niet in past is de helft die in de browser
 * gebeurt — `useActionState`, de foutmarkering, de focussprong en de
 * bedankstaat. Een verkeerd bedrade `aria-invalid` of een bedanktekst die nooit
 * rendert is groen in de unit-tests en stuk voor de bezoeker.
 *
 * Waarom het honeypot-veld in de geslaagde inzending: deze suite draait tegen
 * een build zonder Supabase-sleutels, dus een echte insert kan niet slagen. De
 * action geeft bij een gevuld honeypot dezelfde `{ ok: true }` terug als bij een
 * geslaagde opslag — bots mogen niet merken dat ze eruit gefilterd zijn — en
 * dat is precies de toestand die we hier willen zien renderen. Of de opslag zelf
 * klopt, bewaken de unit-tests.
 */

const VERSTUUR = /verstuur|plan|verzend|vraag/i;

/** Een verborgen veld is niet te `fill()`en; de waarde er direct in zetten wel.
 *  Het is een ongecontroleerde input, dus FormData leest 'm gewoon mee. */
async function vulHoneypot(page: import("@playwright/test").Page, wortel: string) {
  await page.locator(`${wortel} input[name="website"]`).evaluate((el) => {
    (el as HTMLInputElement).value = "https://bot.example";
  });
}

test.describe("contactformulier", () => {
  test("een lege inzending toont álle fouten tegelijk en springt naar de eerste", async ({
    page,
  }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: VERSTUUR }).click();

    // Allebei tegelijk, niet veld voor veld: dat is de afspraak in
    // CONTRIBUTING.md. Naam en e-mail zijn de enige verplichte velden; een
    // toelichting mag ontbreken, en die mag dus ook niet meemelden.
    await expect(page.locator("#err-naam")).toBeVisible();
    await expect(page.locator("#err-mail")).toBeVisible();
    await expect(page.locator("#err-msg")).toHaveCount(0);
    await expect(page.locator(".form-card .field-err")).toHaveCount(2);

    // Elk fout veld is als zodanig gemarkeerd, en de focus staat op het eerste.
    const ongeldig = page.locator('.form-card [aria-invalid="true"]');
    await expect(ongeldig).toHaveCount(2);
    await expect(ongeldig.first()).toBeFocused();

    // En de bedankstaat is nadrukkelijk níet verschenen.
    await expect(page.getByRole("heading", { name: "Bedankt!" })).toHaveCount(0);
  });

  test("een geldige inzending vervangt het formulier door de bedankstaat", async ({ page }) => {
    await page.goto("/contact");
    await page.fill("#f-naam", "Testpersoon");
    await page.fill("#f-mail", "test@voorbeeld.nl");
    await page.fill("#f-msg", "Graag een gesprek over een Mendix-scan voor onze afdeling.");
    await vulHoneypot(page, ".form-card");

    await page.getByRole("button", { name: VERSTUUR }).click();

    await expect(page.getByRole("heading", { name: "Bedankt!" })).toBeVisible();
    await expect(page.locator(".form-status.ok")).toHaveAttribute("role", "status");
    // Het formulier is weg: er valt niets meer per ongeluk dubbel te versturen.
    await expect(page.locator("#f-naam")).toHaveCount(0);
  });
});

test.describe("inzichten-lead", () => {
  test("een ongeldig e-mailadres markeert het veld en houdt de focus daar", async ({ page }) => {
    await page.goto("/inzichten");
    const veld = page.getByLabel("E-mailadres");
    await veld.fill("geen-adres");
    await page.getByRole("button", { name: /aanmelden/i }).click();

    await expect(veld).toHaveAttribute("aria-invalid", "true");
    await expect(veld).toBeFocused();
  });

  test("een geldige aanmelding vervangt het formulier door een bevestiging", async ({ page }) => {
    await page.goto("/inzichten");
    await page.getByLabel("E-mailadres").fill("test@voorbeeld.nl");
    await vulHoneypot(page, ".lead-cta");
    await page.getByRole("button", { name: /aanmelden/i }).click();

    await expect(page.locator(".lead-cta .lead-ok")).toBeVisible();
    await expect(page.locator(".lead-cta form")).toHaveCount(0);
  });
});
