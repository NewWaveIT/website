import { test, expect } from "@playwright/test";

/**
 * De uitgelichte kaart (beeld links, tekst rechts) staat op vier plekken:
 * de klantverhalen-carrousel op de homepage, het uitgelichte klantverhaal op
 * /klantverhalen en in een dienstsectie, en het uitgelichte artikel op
 * /inzichten.
 *
 * Die vier waren vier losse kopieën met kolommen van 1.05fr, 1fr en 1.1fr en
 * vier verschillende hoogtes: blokken die op elkaar leken zonder hetzelfde te
 * zijn. Bij de artikelvariant was de selector bovendien verschoven, waardoor de
 * binnenmarge van de tekstkolom óók op de <img> landde en de foto ingesprongen
 * in de kaart stond.
 *
 * Deze test houdt vast dat het één vorm blijft. De hoogte van het beeld mag
 * verschillen — dat is bewust en gaat via --beeldkaart-h.
 */

const KAARTEN: [naam: string, pad: string, selector: string][] = [
  ["homepage", "/", ".fcase"],
  ["klantverhaal", "/klantverhalen", ".case-mini"],
  ["dienstsectie", "/diensten/mendix", ".case-mini"],
  ["uitgelicht artikel", "/inzichten", ".feat"],
];

interface Vorm {
  verhouding: number;
  radius: string;
  imgPadding: string;
  breedte: number;
}

test("de vier uitgelichte kaarten delen één vorm", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  const gemeten: [string, Vorm][] = [];

  for (const [naam, pad, selector] of KAARTEN) {
    await page.goto(pad);
    await page
      .getByRole("button", { name: "Alleen functioneel" })
      .click({ timeout: 3000 })
      .catch(() => {});
    const kaart = page.locator(`${selector}.beeldkaart`).first();
    await expect(kaart, `${naam} gebruikt de gedeelde .beeldkaart niet`).toHaveCount(1);
    await kaart.scrollIntoViewIfNeeded();

    gemeten.push([
      naam,
      await kaart.evaluate((n) => {
        const s = getComputedStyle(n);
        const [a, b] = s.gridTemplateColumns.split(" ").map(parseFloat);
        const img = n.querySelector(":scope > .media img");
        return {
          verhouding: Math.round(((b ?? 0) / (a ?? 1)) * 100) / 100,
          radius: s.borderTopLeftRadius,
          imgPadding: img ? getComputedStyle(img).padding : "0px",
          breedte: Math.round(n.clientWidth),
        };
      }),
    ]);
  }

  const eerste = gemeten[0]![1];
  for (const [naam, v] of gemeten) {
    expect(v.verhouding, `${naam}: kolomverhouding`).toBeCloseTo(eerste.verhouding, 2);
    expect(v.radius, `${naam}: hoekradius`).toBe(eerste.radius);
    // De foto hoort tot de rand van de kaart te lopen, niet ingesprongen.
    expect(v.imgPadding, `${naam}: de foto heeft binnenmarge gekregen`).toBe("0px");
    // Alle vier staan in een .wrap-wide op dezelfde breedte. Loopt er één uit
    // de pas, dan knijpt een bovenliggende regel hem — zoals gebeurde toen de
    // gedeelde klasse botste met een bestaande sectieklasse.
    expect(v.breedte, `${naam}: kaartbreedte`).toBe(eerste.breedte);
  }
});
