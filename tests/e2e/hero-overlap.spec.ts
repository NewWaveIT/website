import { test, expect } from "@playwright/test";

/* Regressietest: de decoratieve hero-animatie (`.shero-anim`) beslaat de rechterhelft van de
   paginakop. Op een smal scherm liep hij dwars door de lead heen: op /klantverhalen
   schoten sterren en een oranje lijn door "daadwerkelijk" en "handwerk". Dat valt niet op in
   tsc of lint, en niet in een test die alleen kijkt of de pagina rendert. */

const PAGINAS = ["/diensten", "/sectoren", "/klantverhalen", "/inzichten"];
const BREEDTES = [375, 800];

for (const breedte of BREEDTES) {
  for (const pad of PAGINAS) {
    test(`${pad} op ${breedte}px: de hero-animatie loopt niet door de tekst`, async ({ page }) => {
      await page.setViewportSize({ width: breedte, height: 900 });
      await page.goto(pad);
      const anim = page.locator(".pkop .shero-anim").first();
      if ((await anim.count()) === 0 || !(await anim.isVisible())) return; // weggevallen: prima

      const a = await anim.boundingBox();
      for (const tekst of await page.locator(".pkop h1, .pkop p").all()) {
        const t = await tekst.boundingBox();
        if (!a || !t) continue;
        const raakt =
          a.x < t.x + t.width &&
          a.x + a.width > t.x &&
          a.y < t.y + t.height &&
          a.y + a.height > t.y;
        expect(raakt, `animatie raakt "${(await tekst.innerText()).slice(0, 40)}"`).toBe(false);
      }
    });
  }
}
