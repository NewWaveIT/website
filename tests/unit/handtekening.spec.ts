import { describe, expect, it } from "vitest";
import { bouwHandtekening, mailUitNaam, type Gegevens } from "@/components/handtekening/generator";

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

  /* Ronde hoeken vragen `border-collapse: separate`; bij `collapse` laten
     browsers de ronding van een tabel vallen. Het klassieke Outlook voor
     Windows negeert `border-radius` sowieso en houdt rechte hoeken. */
  it("heeft ronde hoeken waar de client ze aankan", () => {
    expect(donker).toContain("border-radius:12px");
    expect(donker, "met border-collapse:collapse valt de ronding weg").toContain(
      "border-collapse:separate",
    );
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

/**
 * Het e-mailadres volgt de naam, want dat is de enige plek waar het uit af te
 * leiden valt en niemand twee keer hetzelfde wil typen.
 */
describe("e-mailadres uit de naam", () => {
  it("maakt voornaam.achternaam", () => {
    expect(mailUitNaam("Mitchel Wallaart")).toBe("mitchel.wallaart@thenewwaveit.com");
  });

  /* Een tussenvoegsel krijgt een eigen punt: sonny.van.rein, niet sonny.vanrein. */
  it("zet een punt tussen elk woord, ook bij een tussenvoegsel", () => {
    expect(mailUitNaam("Sonny van Rein")).toBe("sonny.van.rein@thenewwaveit.com");
    expect(mailUitNaam("Jan van der Berg")).toBe("jan.van.der.berg@thenewwaveit.com");
  });

  it("haalt accenten weg, want een adres heeft ze niet", () => {
    expect(mailUitNaam("José Muñoz")).toBe("jose.munoz@thenewwaveit.com");
  });

  it("houdt een koppelteken in een dubbele naam", () => {
    expect(mailUitNaam("Anne-Marie Jansen")).toBe("anne-marie.jansen@thenewwaveit.com");
  });

  it("negeert leestekens en dubbele spaties", () => {
    expect(mailUitNaam("  Piet   de Vries!  ")).toBe("piet.de.vries@thenewwaveit.com");
  });

  /* Eén woord geeft niets terug: het veld houdt dan wat er stond, in plaats van
     te flitsen terwijl iemand zijn achternaam nog typt. */
  it("levert niets bij een naam van één woord of leeg", () => {
    expect(mailUitNaam("Mitchel")).toBe("");
    expect(mailUitNaam("")).toBe("");
    expect(mailUitNaam("   ")).toBe("");
  });
});
