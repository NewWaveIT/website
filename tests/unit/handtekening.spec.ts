import { describe, expect, it } from "vitest";
import { bouwHandtekening, type Gegevens } from "@/components/handtekening/generator";

/**
 * De e-mailhandtekening uit het medewerkerspakket.
 *
 * Aanleiding: de donkere variant zette lichtere tekstkleuren en het witte logo,
 * maar géén achtergrond. Op deze pagina zag dat er goed uit, want daar stond de
 * donkere ondergrond in de CSS van de site (`.hgen-doek--donker`). Wat je
 * plakte had die ondergrond niet, dus in Outlook was het wit op wit.
 *
 * Een e-mail kan zich niet naar het thema van de ontvanger voegen: Outlook voor
 * Windows leest `prefers-color-scheme` in een bericht niet. De donkere variant
 * neemt daarom zijn eigen vlak mee.
 */

const BASIS: Gegevens = {
  naam: "Voornaam Achternaam",
  functie: "Functietitel",
  email: "voornaam@thenewwaveit.com",
  telefoon: "+31 6 00 00 00 00",
  donker: false,
  basisUrl: "https://www.thenewwaveit.com",
};

const ESPRESSO = "#2E251A";

describe("donkere handtekening", () => {
  const donker = bouwHandtekening({ ...BASIS, donker: true });

  it("neemt zijn eigen achtergrond mee", () => {
    expect(donker, "zonder achtergrond is het wit op wit in Outlook").toContain(
      `background-color:${ESPRESSO}`,
    );
  });

  /* Outlook op Windows rendert met de Word-engine en honoreert het attribuut
     betrouwbaarder dan de stijlregel. Ze moeten er allebei staan. */
  it("zet de achtergrond ook als bgcolor-attribuut", () => {
    expect(donker).toContain(`bgcolor="${ESPRESSO}"`);
  });

  /* Word negeert een achtergrond op een <div> vaak; op een tabelcel niet. */
  it("hangt de achtergrond aan een tabelcel, niet aan een div", () => {
    const opDiv = /<div[^>]*background-color/i.test(donker);
    expect(opDiv, "zet het vlak op een <td>, niet op een <div>").toBe(false);
    expect(/<td[^>]*background-color/i.test(donker)).toBe(true);
  });

  it("zet de tekst er niet tegen de rand aan", () => {
    expect(donker).toMatch(/padding:\s*20px 24px/);
  });

  it("gebruikt het witte logo", () => {
    expect(donker).toContain("/handtekening/logo-wit.png");
  });
});

describe("lichte handtekening", () => {
  const licht = bouwHandtekening(BASIS);

  /* De lichte variant erft de achtergrond van het bericht. Zou hij er zelf een
     zetten, dan krijgt iedereen een wit blok in een donkere mailbox. */
  it("zet geen achtergrond, op de oranje scheidingsstreep na", () => {
    expect(licht).not.toContain("background-color");
    expect(licht).not.toContain("bgcolor=");
    expect(licht, "de streep tussen logo en gegevens blijft").toContain("background:#F15822");
  });

  it("gebruikt het donkere logo", () => {
    expect(licht).toContain("/handtekening/logo.png");
  });
});

describe("beide varianten", () => {
  it("ontsnappen een naam met tekens die de tabel kunnen openbreken", () => {
    const html = bouwHandtekening({ ...BASIS, naam: 'Jan & "Piet" <script>' });
    expect(html).toContain("Jan &amp; &quot;Piet&quot; &lt;script&gt;");
    expect(html).not.toContain("<script>");
  });

  it("maken van een telefoonnummer met spaties een bruikbare tel-link", () => {
    const html = bouwHandtekening({ ...BASIS, telefoon: "06 10 75 12 54" });
    expect(html).toContain('href="tel:+31610751254"');
    expect(html, "zichtbaar blijft het nummer zoals ingevuld").toContain("06 10 75 12 54");
  });
});
