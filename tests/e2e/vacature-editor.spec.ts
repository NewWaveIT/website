import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";

/**
 * De vacature-editor: één groot tekstveld waarin de hele vacature in één keer wordt geplakt.
 *
 * Gemeten in een echte browser, want de plakactie loopt via het klembord en de editor, en dat is
 * met een unittest niet na te bootsen. De echte vacature uit `tests/fixtures/vacature-ai.txt`
 * (platte tekst uit LinkedIn, bullets met een sterretje) is het testgeval.
 */

const VACATURE = readFileSync("tests/fixtures/vacature-ai.txt", "utf8");

/** Plakt platte tekst alsof hij van het klembord komt, op de plek van de cursor. */
async function plak(page: import("@playwright/test").Page, tekst: string) {
  await page.locator(".rte-tekst .ProseMirror").click();
  await page.evaluate((t) => {
    const doel = document.querySelector(".rte-tekst .ProseMirror")!;
    const data = new DataTransfer();
    data.setData("text/plain", t);
    doel.dispatchEvent(
      new ClipboardEvent("paste", { clipboardData: data, bubbles: true, cancelable: true }),
    );
  }, tekst);
}

test.describe("vacatureformulier", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ontwerp/editor-vacature");
  });

  test("heeft één groot tekstveld en geen aparte intro of secties meer", async ({ page }) => {
    await expect(page.getByText("Vacaturetekst", { exact: true })).toBeVisible();
    await expect(page.locator(".rte-tekst")).toHaveCount(1);
    await expect(page.getByText("Regel toevoegen")).toHaveCount(1); // alleen bij de optionele tags
    await expect(page.getByText("Sectie toevoegen")).toHaveCount(0);
  });

  test("een hele vacature in één keer plakken geeft koppen, alinea's en opsommingen", async ({
    page,
  }) => {
    await plak(page, VACATURE);
    const editor = page.locator(".rte-tekst .ProseMirror");
    await expect(editor.locator("h2")).toHaveCount(6);
    await expect(editor.locator("h3")).toHaveCount(6);
    await expect(editor.locator("ul")).toHaveCount(8);
    await expect(editor.locator("li")).toHaveCount(40);
    // En het gaat mee naar het formulier, dus het wordt ook echt opgeslagen.
    const opgeslagen = await page.locator('input[name="f_inhoud"]').inputValue();
    expect(opgeslagen).toContain("<h2>Wat ga je doen?</h2>");
    expect(opgeslagen).toContain("<li><p>Zelfstandig kunnen opereren bij klanten.</p></li>");
  });

  test("laat zien dat de eerste alinea de intro in de header wordt", async ({ page }) => {
    await plak(page, VACATURE);
    const intro = page.locator(".rte-tekst .ProseMirror .rte-intro");
    await expect(intro).toHaveCount(1);
    await expect(intro).toContainText("The New Wave IT helpt organisaties");
    // Het label komt uit de CSS (::before), dus meet het zoals de bezoeker het ziet.
    const label = await intro.evaluate((el) => getComputedStyle(el, "::before").content);
    expect(label).toBe('"Intro in de header"');
  });

  test("een kop vóór de eerste alinea blijft bij de tekst en de alinea erna is de intro", async ({
    page,
  }) => {
    await plak(
      page,
      "Over de rol\nDit is de intro.\nTweede alinea.\n\nWat ga je doen?\n* een\n* twee",
    );
    const intro = page.locator(".rte-tekst .ProseMirror .rte-intro");
    await expect(intro).toHaveText(/Dit is de intro\./);
    await expect(page.locator(".rte-tekst .ProseMirror h2").first()).toHaveText("Over de rol");
  });

  test("een tekst die met een lijst begint heeft geen intro", async ({ page }) => {
    await plak(page, "* een\n* twee\n\nDaarna een zin.");
    await expect(page.locator(".rte-tekst .ProseMirror .rte-intro")).toHaveCount(0);
  });

  test("toont de nieuwe vacature met een standaardlocatie, datum en type", async ({ page }) => {
    await expect(page.locator('input[name="f_locatie"]')).toHaveValue("Utrecht / hybride");
    await expect(page.locator('input[name="f_gepubliceerdOp"]')).not.toHaveValue("");
    await expect(page.locator('input[name="f_employmentType"]')).toHaveValue("FULL_TIME");
  });

  test("de werkbalk heeft koppen maar geen afbeelding of citaat", async ({ page }) => {
    const balk = page.locator(".rte-tekst .rte-bar");
    await expect(balk.getByRole("button", { name: "Kop", exact: true })).toBeVisible();
    await expect(balk.getByRole("button", { name: "Subkop" })).toBeVisible();
    await expect(balk.getByRole("button", { name: "Afbeelding" })).toHaveCount(0);
    await expect(balk.getByRole("button", { name: "Citaat" })).toHaveCount(0);
  });
});
