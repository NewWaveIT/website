import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { beschrijf, zonderMerkuitzondering } from "./axe-merkuitzondering";

/**
 * Mobiele bewaking. De rest van de e2e-suite draait op Desktop Chrome
 * (1280×720), dus tot nu toe kwam geen enkele mobiele regressie hier langs.
 *
 * Deze drie metingen vingen in de audit van 18 september samen het grootste
 * deel van wat er mis was, en ze zijn alle drie hard: ze meten een getal, geen
 * indruk. Wat je met het oog moet beoordelen (regellengte, ritme) staat niet
 * hier maar in `npm run shots`.
 */

const TELEFOON = { width: 375, height: 667 } as const;
const KLEIN = { width: 320, height: 568 } as const;

const PAGINAS: [naam: string, pad: string][] = [
  ["homepage", "/"],
  ["dienstenoverzicht", "/diensten"],
  ["dienstpagina", "/diensten/app-in-a-day"],
  ["richting-hub", "/diensten/mendix"],
  ["sectoroverzicht", "/sectoren"],
  ["sectorpagina", "/sectoren/publieke-sector"],
  ["klantverhaal", "/klantverhalen/moove"],
  ["inzichten", "/inzichten"],
  ["over-ons", "/over-ons"],
  ["werken-bij", "/werken-bij"],
  ["contact", "/contact"],
];

const wegMetDeCookiemelding = (page: import("@playwright/test").Page) =>
  page
    .getByRole("button", { name: "Alleen functioneel" })
    .click({ timeout: 3000 })
    .catch(() => {});

/**
 * De pagina mag niet horizontaal schuiven. Dat is de meest voorkomende mobiele
 * fout en de enige die een bezoeker meteen merkt: elke veeg verschuift de
 * tekst.
 *
 * Op 320px, de smalste breedte die we aanhouden — daar knelt het als eerste.
 *
 * Twee dingen gemeten in plaats van aangenomen, want deze test is twee keer
 * eerder groen geweest terwijl hij niets zei:
 *
 * 1. `window.innerWidth` is het verkeerde ijkpunt (zie de meting hieronder).
 * 2. `overflow-wrap: anywhere` op body in globals.css is op dit moment níét
 *    wat deze test groen houdt: haal die regel weg en alle elf pagina's
 *    blijven binnen de 320px. Sinds de paginamarge op een telefoon 20px is,
 *    passen de lange Nederlandse samenstellingen gewoon. De regel blijft staan
 *    als vangnet voor het volgende lange woord; deze test bewaakt de uitkomst,
 *    niet die ene regel.
 */
test.describe("mobiel · 320px", () => {
  test.use({ viewport: KLEIN, isMobile: true, hasTouch: true });

  for (const [naam, pad] of PAGINAS) {
    test(`${naam} schuift niet horizontaal`, async ({ page }) => {
      // `domcontentloaded` en niet de standaard `load`: deze test meet de
      // layoutbreedte, en die staat vast zodra de CSS is toegepast -- elk beeld
      // heeft een vaste verhouding of een min-hoogte, dus de bytes veranderen
      // er niets aan. Wachten tot het laatste plaatje binnen is maakte de test
      // afhankelijk van hoe druk de server het heeft: in CI hing hij twee keer
      // de volle zestig seconden op /klantverhalen/moove, de langste pagina van
      // de site, terwijl diezelfde pagina in drie andere tests gewoon laadde.
      // Lokaal is dat niet te reproduceren, dus dit haalt de afhankelijkheid
      // weg in plaats van de grens te verhogen.
      await page.goto(pad, { waitUntil: "domcontentloaded" });
      await wegMetDeCookiemelding(page);
      const gemeten = await page.evaluate(() => ({
        // Niet tegen window.innerWidth afzetten: onder mobiele emulatie is dat
        // de layout-viewport, en die groeit mee met de inhoud. Op een pagina
        // van 900px meldt hij dus 900, waarmee de vergelijking altijd opgaat en
        // deze test nooit rood wordt. clientWidth blijft de schermbreedte.
        doc: document.documentElement.scrollWidth,
        scherm: document.documentElement.clientWidth,
      }));
      // 1px speling: subpixelafronding van een border telt anders als fout.
      expect(
        gemeten.doc,
        `${naam} is ${gemeten.doc - gemeten.scherm}px breder dan het scherm`,
      ).toBeLessThanOrEqual(gemeten.scherm + 1);
    });
  }
});

test.describe("mobiel", () => {
  test.use({ viewport: TELEFOON, isMobile: true, hasTouch: true });

  /**
   * Contrast en structuur op telefoonbreedte. De gate in
   * `toegankelijkheid.spec.ts` draait op 1280×720, en daar komt een deel van
   * de opmaak niet voor: de mobiele balk, het menupaneel, de plakkende CTA en
   * de kleinste tekstmaten (die onder 640px een trap omhoog gaan). Drie
   * sjablonen, niet elf: hetzelfde component levert anders dezelfde melding
   * tien keer op.
   */
  for (const [naam, pad] of [
    ["homepage", "/"],
    ["sectorpagina", "/sectoren/publieke-sector"],
    ["dienstpagina", "/diensten/app-in-a-day"],
  ] as const) {
    test(`${naam} voldoet op telefoonbreedte aan WCAG 2.1 AA`, async ({ page }) => {
      // Zie de toelichting in toegankelijkheid.spec.ts: zonder dit meet axe af
      // en toe midden in een crossfade op de homepage.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(pad);
      const rapport = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const violations = zonderMerkuitzondering(rapport.violations);
      expect(
        violations,
        `${violations.length} probleem(en) op ${pad} (375px):\n  ${beschrijf(violations)}`,
      ).toEqual([]);
    });
  }

  /**
   * Een ankerlink moet de kop van de sectie onder de vaste balk uit zetten.
   * Zonder `scroll-padding-top` landde hij erachter: de kop stond op y=48
   * terwijl de balk plus de subnavigatie tot y=113 lopen.
   */
  test("een ankerlink zet de sectiekop onder de vaste balken", async ({ page }) => {
    await page.goto("/diensten/app-in-a-day");
    await wegMetDeCookiemelding(page);

    const links = page.locator(".p-dienst .subnav a");
    const aantal = await links.count();
    expect(aantal, "de dienstpagina hoort een subnavigatie te hebben").toBeGreaterThan(0);

    for (let i = 0; i < aantal; i++) {
      const href = await links.nth(i).getAttribute("href");
      const label = (await links.nth(i).textContent())?.trim();
      await links.nth(i).click();
      // De sprong is niet geanimeerd, maar de layout moet wel bezinken.
      await page.waitForTimeout(400);

      const meting = await page.evaluate((selector) => {
        const doel = document.querySelector(selector!);
        if (!doel) return null;
        const balk = document.querySelector(".p-dienst .subnav") ?? document.querySelector(".mnav");
        return {
          doelTop: doel.getBoundingClientRect().top,
          balkOnder: balk ? balk.getBoundingClientRect().bottom : 0,
        };
      }, href);

      expect(meting, `${href} bestaat niet op de pagina`).not.toBeNull();
      expect(
        meting!.doelTop,
        `"${label}" landt achter de vaste balk (top ${Math.round(meting!.doelTop)}, balk tot ${Math.round(meting!.balkOnder)})`,
      ).toBeGreaterThanOrEqual(meting!.balkOnder - 1);
    }
  });
});

/**
 * Het menupaneel is `position: fixed; inset: 0` en de body scrollt niet meer
 * zolang het open staat. Past de inhoud er niet in, dan is alles onder de vouw
 * onbereikbaar — en dat was zo: op 320×568 en in elke liggende stand viel
 * "Plan een gesprek" eruit. Twee kleine schermen, want juist daar knelt het.
 */
for (const [naam, viewport] of [
  ["staand op een klein scherm", KLEIN],
  ["liggend", { width: 667, height: 375 }],
] as const) {
  test(`het mobiele menu is ${naam} helemaal bereikbaar`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/diensten");
    await wegMetDeCookiemelding(page);
    await page.getByRole("button", { name: "Menu", exact: true }).click();

    const knop = page.locator("#m-menu .mfoot a");
    await expect(knop).toBeVisible();

    const bereikbaar = await page.evaluate(() => {
      const paneel = document.querySelector<HTMLElement>("#m-menu")!;
      const laatste = paneel.querySelectorAll("a");
      const doel = laatste[laatste.length - 1]!.getBoundingClientRect();
      const stijl = getComputedStyle(paneel);
      return {
        onder: doel.bottom,
        vh: window.innerHeight,
        kanScrollen:
          paneel.scrollHeight > paneel.clientHeight && /auto|scroll/.test(stijl.overflowY),
      };
    });

    expect(
      bereikbaar.onder <= bereikbaar.vh || bereikbaar.kanScrollen,
      `de laatste menuknop staat op ${Math.round(bereikbaar.onder)} in een venster van ${bereikbaar.vh} en het paneel scrollt niet`,
    ).toBe(true);
  });
}
