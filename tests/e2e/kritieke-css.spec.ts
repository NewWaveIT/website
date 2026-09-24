import { test, expect } from "@playwright/test";

/**
 * De productie-HTML bevat geen enkel `<style>`-element.
 *
 * Dat is geen esthetische voorkeur maar de aanname waarop de Content Security
 * Policy rust. `next.config.ts` zet `style-src-elem 'self'` juist dicht, met als
 * onderbouwing dat de HTML alleen `<link rel=stylesheet>` gebruikt; daarmee
 * blijft een geïnjecteerd `<style>`-blok geweigerd.
 *
 * Die aanname was nergens gecontroleerd, en dat is een keer misgegaan. Bij het
 * opvolgen van 450ms aan renderblokkerende verzoeken die PageSpeed meldde, stond
 * `experimental.inlineCss` aan: Next zette toen de hele opmaak als `<style>` in
 * de head, de CSP weigerde dat blok, en de site kwam kaal binnen -- Times New
 * Roman, geen enkele designtoken opgelost. In de HTML was niets te zien; alleen
 * de console zei "Applying inline style violates ... 'style-src-elem 'self''".
 *
 * Zet iemand die vlag opnieuw aan, of komt er langs een andere weg een
 * `<style>` in de HTML, dan faalt deze test in plaats van de site.
 */

const PAGINAS = ["/", "/sectoren", "/diensten", "/over-ons", "/contact"] as const;

for (const pad of PAGINAS) {
  test(`${pad} haalt zijn opmaak uit een stylesheet, niet uit een style-element`, async ({
    page,
  }) => {
    const antwoord = await page.goto(pad);
    const html = (await antwoord!.text()) ?? "";

    const stijlblokken = [...html.matchAll(/<style[\s>]/g)].length;
    const stylesheets = [...html.matchAll(/<link[^>]+rel="stylesheet"/g)].length;

    expect(
      stijlblokken,
      "een <style> in de HTML wordt door style-src-elem geweigerd en de pagina komt kaal binnen",
    ).toBe(0);
    expect(stylesheets, "de opmaak komt via <link rel=stylesheet>").toBeGreaterThan(0);
  });
}

/**
 * En de opmaak moet ook echt aankomen. Zonder deze controle zou een pagina die
 * om welke reden dan ook geen werkende stijlen heeft de test hierboven gewoon
 * halen -- precies de toestand die hierboven beschreven staat.
 */
test("de opmaak wordt daadwerkelijk toegepast", async ({ page }) => {
  await page.goto("/");
  const gemeten = await page.evaluate(() => {
    const wortel = getComputedStyle(document.documentElement);
    return {
      gutter: wortel.getPropertyValue("--gutter").trim(),
      achtergrond: getComputedStyle(document.body).backgroundColor,
      letter: getComputedStyle(document.body).fontFamily,
    };
  });

  expect(gemeten.gutter, "--gutter uit globals.css is opgelost").not.toBe("");
  expect(gemeten.achtergrond, "body heeft zijn eigen achtergrond").not.toBe("rgba(0, 0, 0, 0)");
  expect(gemeten.letter, "en niet de standaardletter van de browser").not.toMatch(/Times/i);
});
