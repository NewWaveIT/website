import { test, expect, type Page } from "@playwright/test";

/* De paginawissel binnen de site (components/layout/navigatie-overgang.tsx): een zachte
   fade van <main> en een voortgangsbalk. Een wissel naar een voorgerenderde pagina duurt
   milliseconden, dus de balk zelf is te vluchtig om op te asserteren. Wat wel vaststaat:
   de fade draait (of draait juist niet bij verminderde beweging), en de pagina is erna
   volledig zichtbaar met een rustende balk. */

async function naarOverOns(page: Page) {
  await page.goto("/");
  await page.getByRole("link", { name: "Over ons" }).first().click();
  await expect(page).toHaveURL(/\/over-ons$/);
}

/** Houdt bij of <main> in de komende seconden een lopende animatie had. */
async function volgAnimaties(page: Page) {
  await page.evaluate(() => {
    const w = window as unknown as { __animatieGezien: boolean };
    w.__animatieGezien = false;
    const t = setInterval(() => {
      if (document.getElementById("main")?.getAnimations().length) w.__animatieGezien = true;
    }, 5);
    setTimeout(() => clearInterval(t), 3000);
  });
}
const animatieGezien = (page: Page) =>
  page.evaluate(() => (window as unknown as { __animatieGezien: boolean }).__animatieGezien);

test("een paginawissel fadet <main> in en laat hem volledig zichtbaar achter", async ({ page }) => {
  await page.goto("/");
  await volgAnimaties(page);
  await page.getByRole("link", { name: "Over ons" }).first().click();
  await expect(page).toHaveURL(/\/over-ons$/);

  await expect.poll(() => animatieGezien(page)).toBe(true);
  await expect(page.locator("main")).toHaveCSS("opacity", "1");
  await expect(page.locator(".nav-voortgang")).toHaveAttribute("data-actief", "false");
});

test("bij verminderde beweging blijft de fade achterwege", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await volgAnimaties(page);
  await page.getByRole("link", { name: "Over ons" }).first().click();
  await expect(page).toHaveURL(/\/over-ons$/);
  await page.waitForTimeout(500);
  expect(await animatieGezien(page)).toBe(false);
});

test("het eerste laden fadet niet: het LCP-element mag niet infaden", async ({ page }) => {
  await page.goto("/over-ons");
  expect(await page.evaluate(() => document.getElementById("main")?.getAnimations().length)).toBe(
    0,
  );
});

test("de balk rust na een wissel en een anker start hem niet", async ({ page }) => {
  await naarOverOns(page);
  const balk = page.locator(".nav-voortgang");
  await expect(balk).toHaveAttribute("data-actief", "false");
  // Een interne ankerlink verandert het pad niet: geen paginawissel, dus geen balk.
  await page.evaluate(() => {
    const a = document.createElement("a");
    a.href = "#main";
    a.textContent = "anker";
    a.id = "test-anker";
    document.body.append(a);
  });
  await page.locator("#test-anker").click();
  await expect(balk).toHaveAttribute("data-actief", "false");
});

/* Regressietest: de animatieklok kan stilstaan (achtergrondtabblad, browser zonder
   frames). Dan bleef <main> op opacity 0 hangen en was de hele pagina onzichtbaar. */
test("een vastgelopen animatie laat de pagina niet onzichtbaar achter", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    setInterval(
      () =>
        document
          .getElementById("main")
          ?.getAnimations()
          .forEach((a) => a.pause()),
      5,
    );
  });
  await page.getByRole("link", { name: "Over ons" }).first().click();
  await expect(page).toHaveURL(/\/over-ons$/);
  await expect(page.locator("main")).toHaveCSS("opacity", "1", { timeout: 3000 });
});
