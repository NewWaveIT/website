import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { kiesPlak, plakTekstNaarHtml, splitsVacature } from "@/lib/cms/vacature-tekst";

/* De echte vacature "Senior AI consultant & Forward Deployed Engineer", zoals hij uit
   LinkedIn komt: platte tekst, bullets met `*`, koppen als losse korte regels. Dit is het
   testgeval waar het plakken in één keer goed uit moet komen. */
const VACATURE = readFileSync("tests/fixtures/vacature-ai.txt", "utf8");

const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const tekstenVan = (html: string, tag: string) =>
  [...html.matchAll(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`, "g"))].map((m) => decode(m[1]!));
const zonderLijsten = (html: string) => html.replace(/<ul>[\s\S]*?<\/ul>/g, "");

describe("plakTekstNaarHtml, met de echte vacature", () => {
  const html = plakTekstNaarHtml(VACATURE);

  it("maakt van de zes vraagkoppen een H2", () => {
    expect(tekstenVan(html, "h2")).toEqual([
      "Over de rol",
      "Wat ga je doen?",
      "Wat breng je mee?",
      "Wat bieden wij jou?",
      "Wat maakt deze rol bijzonder?",
      "Wat zoeken we nadrukkelijk niet?",
    ]);
  });

  it("zet de koppen onder 'Wat breng je mee?' een niveau lager", () => {
    expect(tekstenVan(html, "h3")).toEqual([
      "Must-haves",
      "Software engineering",
      "AI engineering",
      "Cloud & production engineering",
      "Consultancy & business",
      "Nice-to-haves",
    ]);
  });

  it("maakt van elke bullet een lijstitem, in acht lijsten", () => {
    expect(html.match(/<ul>/g)).toHaveLength(8);
    expect(html.match(/<li>/g)).toHaveLength(40);
  });

  it("houdt de gewone zinnen als alinea's: drie bovenaan, twee bij software engineering, vier bij 'bijzonder'", () => {
    expect(tekstenVan(zonderLijsten(html), "p")).toHaveLength(9);
  });

  it("laat de LinkedIn-regel 'Over de vacature' weg", () => {
    expect(html).not.toContain("Over de vacature");
  });

  it("neemt de eerste alinea mee als eerste blok na de kop", () => {
    expect(html.startsWith("<h2>Over de rol</h2><p>The New Wave IT helpt organisaties")).toBe(true);
  });
});

describe("plakTekstNaarHtml, de regels", () => {
  it("kent bullets met *, - en •", () => {
    const html = plakTekstNaarHtml("Een zin.\n\n* een\n- twee\n• drie");
    expect(html).toBe(
      "<p>Een zin.</p><ul><li><p>een</p></li><li><p>twee</p></li><li><p>drie</p></li></ul>",
    );
  });

  it("houdt één lijst bij elkaar over een lege regel heen", () => {
    const html = plakTekstNaarHtml("* een\n\n* twee");
    expect(html.match(/<ul>/g)).toHaveLength(1);
    expect(html.match(/<li>/g)).toHaveLength(2);
  });

  it("splitst twee lijsten als er een alinea tussen staat", () => {
    const html = plakTekstNaarHtml("* een\n\nEen zin ertussen.\n\n* twee");
    expect(html.match(/<ul>/g)).toHaveLength(2);
  });

  it("ziet een lange regel zonder punt als alinea, niet als kop", () => {
    const lang =
      "Een heel lang stuk tekst dat niet met een punt eindigt maar duidelijk een zin is die doorloopt";
    expect(plakTekstNaarHtml(`${lang}\n\nVolgende zin.`)).toContain(`<p>${lang}</p>`);
  });

  it("ziet een regel van weinig woorden maar veel tekens ook niet als kop", () => {
    const lang =
      "Internationaliseringsstrategieontwikkeling Verantwoordelijkheidsverdeling Samenwerkingsovereenkomsten";
    expect(
      plakTekstNaarHtml(`${lang}

Volgende zin.`),
    ).toContain(`<p>${lang}</p>`);
  });

  it("maakt zonder vraagkoppen van elke kop een H2", () => {
    const html = plakTekstNaarHtml("Taken\n* een\n\nProfiel\n* twee");
    expect(tekstenVan(html, "h2")).toEqual(["Taken", "Profiel"]);
    expect(html).not.toContain("<h3>");
  });

  it("ontsnapt HTML in de tekst", () => {
    const html = plakTekstNaarHtml("Kijk <script>alert(1)</script> & klaar.\n\nNog een zin.");
    expect(html).toContain("&lt;script&gt;alert(1)&lt;/script&gt; &amp; klaar.");
    expect(html).not.toContain("<script>");
  });

  it("geeft niets terug voor lege invoer", () => {
    expect(plakTekstNaarHtml("  \n \n")).toBe("");
  });
});

describe("splitsVacature", () => {
  it("haalt de eerste alinea eruit als intro", () => {
    expect(splitsVacature("<p>Intro</p><h2>Kop</h2><p>Tekst</p>")).toEqual({
      intro: "Intro",
      body: "<h2>Kop</h2><p>Tekst</p>",
    });
  });

  it("laat een kop vóór de eerste alinea in de tekst staan", () => {
    expect(splitsVacature("<h2>Over de rol</h2><p>Intro</p><p>Meer</p>")).toEqual({
      intro: "Intro",
      body: "<h2>Over de rol</h2><p>Meer</p>",
    });
  });

  it("heeft geen intro als de tekst met een lijst begint", () => {
    const html = "<ul><li><p>een</p></li></ul><p>Daarna</p>";
    expect(splitsVacature(html)).toEqual({ intro: "", body: html });
  });

  it("heeft geen intro als er geen enkele alinea voor de lijst staat", () => {
    const html = "<h2>Kop</h2><ul><li><p>een</p></li></ul>";
    expect(splitsVacature(html)).toEqual({ intro: "", body: html });
  });

  it("bewaart opmaak in de intro", () => {
    expect(splitsVacature("<p>Met <strong>vet</strong></p><p>Rest</p>").intro).toBe(
      "Met <strong>vet</strong>",
    );
  });

  it("slaat een lege eerste alinea over", () => {
    expect(splitsVacature("<p></p><h2>Kop</h2>")).toEqual({ intro: "", body: "<h2>Kop</h2>" });
  });

  it("splitst de echte vacature: intro bovenaan, de rest eronder", () => {
    const { intro, body } = splitsVacature(plakTekstNaarHtml(VACATURE));
    expect(intro.startsWith("The New Wave IT helpt organisaties")).toBe(true);
    expect(body.startsWith("<h2>Over de rol</h2><p>Als Senior AI Engineer")).toBe(true);
    expect(body).not.toContain("The New Wave IT helpt organisaties");
  });
});

describe("kiesPlak", () => {
  it("laat een plakactie met echte lijsten of koppen aan de editor", () => {
    expect(kiesPlak("<ul><li>een</li></ul>", "* een\n* twee")).toBeNull();
    expect(kiesPlak("<h2>Kop</h2><p>x</p>", "Kop\nx")).toBeNull();
  });

  it("zet platte tekst met meerdere regels om", () => {
    const html = kiesPlak("<span>Wat ga je doen?</span>", "Wat ga je doen?\n* een\n* twee");
    expect(html).toBe("<h2>Wat ga je doen?</h2><ul><li><p>een</p></li><li><p>twee</p></li></ul>");
  });

  it("zet platte tekst zonder HTML op het klembord om", () => {
    expect(kiesPlak("", "Kop?\n* een")).toContain("<h2>Kop?</h2>");
  });

  it("laat één regel tekst met rust", () => {
    expect(kiesPlak("", "gewoon een woord")).toBeNull();
  });
});
