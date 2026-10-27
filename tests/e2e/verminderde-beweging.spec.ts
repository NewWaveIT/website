import { test, expect } from "@playwright/test";

/* Regressietest: `prefers-reduced-motion` werd maar voor een deel gehonoreerd. De hero, de
   paginafade en de paginakop-vignetten gingen netjes stil, maar de klantenband (45 seconden
   oneindig) en de sectorillustraties op de homepage (sterretjes, vlag, rijdende trein) bleven
   bewegen: 75 lopende animaties bij iemand die "verminderde beweging" aan heeft staan. Wie
   dat instelt kan er letterlijk onwel van worden. Eindeloze animaties horen dan uit. */

const PAGINAS = ["/", "/diensten", "/sectoren/zorg", "/over-ons", "/contact"];

for (const pad of PAGINAS) {
  test(`${pad}: bij verminderde beweging loopt er niets eindeloos`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(pad);
    await page
      .getByRole("button", { name: "Alleen functioneel" })
      .click({ timeout: 2000 })
      .catch(() => {});
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((klaar) => setTimeout(klaar, 50));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    const eindeloos = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => a.playState === "running" && a.effect?.getTiming().iterations === Infinity)
        .map((a) => {
          const doel = a.effect instanceof KeyframeEffect ? a.effect.target : null;
          const naam = a instanceof CSSAnimation ? a.animationName : "animatie";
          return `${naam} op ${doel ? doel.tagName.toLowerCase() : "?"}`;
        }),
    );
    expect([...new Set(eindeloos)], `eindeloze animaties op ${pad}`).toEqual([]);
  });
}

test("bij verminderde beweging staan alle klanten binnen de band", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const buiten = await page.evaluate(() => {
    const band = document.querySelector(".logo-track")!.getBoundingClientRect();
    return [...document.querySelectorAll(".logo-set:not([aria-hidden='true']) .logo-tile")]
      .filter((t) => {
        const r = t.getBoundingClientRect();
        return r.left < band.left - 1 || r.right > band.right + 1;
      })
      .map((t) => (t.querySelector("img")?.alt ?? t.textContent ?? "").trim());
  });
  expect(buiten, "klanten die buiten de band vallen").toEqual([]);
});
