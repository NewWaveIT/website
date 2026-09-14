import { mkdirSync } from "node:fs";
import { test } from "@playwright/test";

/**
 * Schermafdrukken van de kernpagina's, op drie breedtes.
 *
 * Waarom dit bestaat: een vraag als "past die kop nog op mobiel" was tot nu toe
 * een vraag aan de eigenaar, met een screenshot als antwoord. Dat kost twee
 * beurten en een aanname. Met `npm run shots` staat het antwoord in
 * docs/shots/ en is het in tien seconden na te kijken.
 *
 * Dit zijn geen tests: er wordt niets beweerd. Ze draaien daarom niet mee met
 * `npm run test:e2e` (eigen config, eigen map) en de afbeeldingen gaan niet de
 * repo in.
 */

const PAGINAS: Record<string, string> = {
  home: "/",
  diensten: "/diensten",
  "dienst-detail": "/diensten/app-in-a-day",
  "richting-hub": "/diensten/mendix",
  sectoren: "/sectoren",
  "sector-detail": "/sectoren/publieke-sector",
  klantverhalen: "/klantverhalen",
  "klantverhaal-detail": "/klantverhalen/moove",
  "over-ons": "/over-ons",
  "werken-bij": "/werken-bij",
  inzichten: "/inzichten",
  contact: "/contact",
};

const BREEDTES = { telefoon: 390, tablet: 834, desktop: 1440 } as const;

for (const [breedte, w] of Object.entries(BREEDTES)) {
  test.describe(breedte, () => {
    test.use({ viewport: { width: w, height: 900 } });

    for (const [naam, pad] of Object.entries(PAGINAS)) {
      test(naam, async ({ page }) => {
        mkdirSync(`docs/shots/${breedte}`, { recursive: true });
        await page.goto(pad, { waitUntil: "load" });
        // De cookiemelding dekt de onderkant af; wegklikken zodat de pagina
        // eronder zichtbaar is.
        await page
          .getByRole("button", { name: "Alleen functioneel" })
          .click({ timeout: 2000 })
          .catch(() => {});
        await page.screenshot({ path: `docs/shots/${breedte}/${naam}.png`, fullPage: true });
      });
    }
  });
}
