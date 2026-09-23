import { test, expect } from "@playwright/test";

/**
 * De knoppenbalk van de editor, op elke breedte waarop hij vastgezet staat.
 *
 * Onder 1024px staat de instellingenrail ónder het formulier, dus staan Opslaan
 * en de rest als vaste balk onderaan het scherm. Twee dingen gingen daar mis, en
 * geen van beide was te zien op een schermafdruk van 1440:
 *
 * 1. Op 390px liep "Annuleren" van x=314 tot 420 in een venster van 390. Dertig
 *    pixels buiten beeld, en de balk schuift niet mee — die knop was gewoon niet
 *    te bereiken. Bij een opgeslagen live item staat "Bekijk" er ook nog bij.
 * 2. De ruimte die het formulier onder zich reserveert stond op 84px terwijl de
 *    balk 94 hoog is, dus het laatste veld verdween er tien pixels onder.
 *
 * Allebei zijn het getallen die bij de volgende knop weer mis kunnen gaan. Deze
 * test meet ze daarom op de pagina, op zes breedtes en met en zonder de extra
 * knop die een opgeslagen item krijgt.
 */

const SCHERMEN = [
  ["nieuw item", "/ontwerp/editor-nieuw"],
  ["bestaand item", "/ontwerp/editor"],
] as const;

for (const [wat, pad] of SCHERMEN) {
  for (const breedte of [320, 390, 480, 640, 768, 1024]) {
    test(`de knoppenbalk past en dekt niets af — ${wat}, ${breedte}px`, async ({ page }) => {
      await page.setViewportSize({ width: breedte, height: 900 });
      await page.goto(pad);

      const gemeten = await page.evaluate(() => {
        const balk = document.querySelector<HTMLElement>(".ce-actions");
        const raster = document.querySelector<HTMLElement>(".ce-grid");
        if (!balk || !raster) return null;
        const venster = document.documentElement.clientWidth;
        const knoppen = [...balk.querySelectorAll<HTMLElement>("a, button")].map((el) => {
          const r = el.getBoundingClientRect();
          return { naam: (el.textContent ?? "").trim(), links: r.x, rechts: r.right };
        });
        return {
          vast: getComputedStyle(balk).position === "fixed",
          hoogte: Math.round(balk.getBoundingClientRect().height),
          reserve: Math.round(parseFloat(getComputedStyle(raster).paddingBottom)),
          venster,
          buitenBeeld: knoppen
            .filter((k) => k.rechts > venster + 1 || k.links < -1)
            .map((k) => `${k.naam} (${Math.round(k.links)}–${Math.round(k.rechts)})`),
        };
      });

      expect(gemeten, `${pad} heeft een .ce-actions en een .ce-grid`).not.toBeNull();
      const { vast, hoogte, reserve, venster, buitenBeeld } = gemeten!;

      expect(buitenBeeld, `venster is ${venster}px breed`).toEqual([]);
      if (vast) {
        expect(
          reserve,
          `de balk is ${hoogte}px hoog en het formulier reserveert ${reserve}px eronder`,
        ).toBeGreaterThanOrEqual(hoogte);
      }
    });
  }
}

/**
 * Alle vijf de admintabellen op een telefoon.
 *
 * De contentlijst hield op 390px zijn vier kolommen: "Laatst bewerkt" brak af
 * tot één letter per regel en de datum werd zes regels hoog. De vier andere
 * tabellen -- activiteit, gebruikers, nieuwsbrief en de nulmeting -- hadden
 * dezelfde opbouw en dus hetzelfde probleem; de nulmeting met vijf kolommen het
 * ergst.
 *
 * Gestapeld hoort elke cel de volle kolombreedte te krijgen. De greepcel van de
 * contentlijst telt niet mee: die is met opzet smal.
 */
const TABELSCHERMEN = [
  ["contentlijst", "/ontwerp/lijst"],
  ["activiteit", "/ontwerp/activiteit"],
  ["gebruikers", "/ontwerp/gebruikers"],
  ["nieuwsbrief", "/ontwerp/nieuwsbrief"],
  ["nulmeting", "/ontwerp/baseline"],
] as const;

for (const [naam, pad] of TABELSCHERMEN) {
  test(`de tabel op ${naam} stapelt op een telefoon`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(pad);

    const gemeten = await page.evaluate(() => {
      const tabel = document.querySelector<HTMLTableElement>("table");
      if (!tabel) return null;
      const cellen = [...tabel.querySelectorAll<HTMLElement>("tbody td")].filter(
        (td) => !td.classList.contains("t-grip-cell") && td.getBoundingClientRect().width > 0,
      );
      const kop = tabel.querySelector("thead");
      return {
        gestapeld: getComputedStyle(tabel).display === "block",
        koppenVerborgen: kop ? getComputedStyle(kop).display === "none" : true,
        smalste: Math.min(...cellen.map((c) => Math.round(c.getBoundingClientRect().width))),
        aantalCellen: cellen.length,
        schuift: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });

    expect(gemeten, `${pad} heeft een tabel`).not.toBeNull();
    const { gestapeld, koppenVerborgen, smalste, aantalCellen, schuift } = gemeten!;

    expect(aantalCellen, "er staan rijen in").toBeGreaterThan(0);
    expect(gestapeld, "de tabel stapelt").toBe(true);
    expect(koppenVerborgen, "kolomkoppen zeggen niets meer bij één kolom").toBe(true);
    expect(smalste, "elke cel krijgt de volle kolombreedte").toBeGreaterThan(180);
    expect(schuift, "geen horizontaal schuiven").toBe(0);
  });
}

/**
 * Waar een waarde zonder kopje niet te plaatsen is -- twee stukken tekst onder
 * elkaar die "In het CMS" en "In de seed" heten -- staat er een `data-kop` op de
 * cel. Die hoort in de gestapelde weergave zichtbaar te zijn.
 */
test("een cel met data-kop toont zijn kopje", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/ontwerp/baseline");

  const koppen = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("td[data-kop]")].map((td) => ({
      kop: td.dataset.kop ?? "",
      zichtbaar: getComputedStyle(td, "::before").content !== "none",
    })),
  );

  expect(koppen.length, "de nulmeting zet data-kop op elke cel").toBeGreaterThan(0);
  expect(
    koppen.filter((k) => !k.zichtbaar).map((k) => k.kop),
    "elk kopje wordt getekend",
  ).toEqual([]);
  expect(koppen.map((k) => k.kop)).toContain("In de seed");
});
