import { describe, expect, it } from "vitest";
import { koppenUit, kopSlug } from "@/lib/artikel-koppen";

/**
 * De inhoudsopgave naast een artikel wijst naar ankers die `ArticleContent` op
 * de koppen zet. Die twee worden uit dezelfde functie afgeleid; gaat het hier
 * mis, dan verwijst de lijst naar ankers die niet bestaan en springt een klik
 * nergens heen.
 */

describe("anker uit een kop", () => {
  it("maakt een leesbare slug", () => {
    expect(kopSlug("Niet elke taak verdient een agent")).toBe("niet-elke-taak-verdient-een-agent");
  });

  it("haalt accenten en leestekens weg", () => {
    expect(kopSlug("Wat is één AI-agent, eigenlijk?")).toBe("wat-is-een-ai-agent-eigenlijk");
  });

  /* Een kop van alleen leestekens gaf een lege string, en `href="#"` springt
     naar de bovenkant van de pagina in plaats van naar de kop. */
  it("levert nooit een leeg anker", () => {
    expect(kopSlug("···")).toBe("kop");
    expect(kopSlug("")).toBe("kop");
  });
});

describe("koppen uit de artikeltekst", () => {
  it("vindt de h2's in volgorde", () => {
    const html = "<p>Intro</p><h2>Eerst dit</h2><p>x</p><h2>Dan dat</h2>";
    expect(koppenUit(html)).toEqual([
      { id: "eerst-dit", tekst: "Eerst dit" },
      { id: "dan-dat", tekst: "Dan dat" },
    ]);
  });

  /* De editor kan vet en cursief in een kop zetten, en de saneerstap laat dat
     staan. De lijst hoort de tekst te tonen, niet de opmaak. */
  it("leest door tags en attributen heen", () => {
    const html = '<h2 class="x" id="y">Een <strong>vette</strong> kop</h2>';
    expect(koppenUit(html)).toEqual([{ id: "een-vette-kop", tekst: "Een vette kop" }]);
  });

  it("slaat een lege kop over", () => {
    expect(koppenUit("<h2></h2><h2>  </h2><h2>Echt</h2>")).toEqual([{ id: "echt", tekst: "Echt" }]);
  });

  /* Twee keer dezelfde kop zou twee items geven die naar hetzelfde anker
     springen; dan werkt de tweede niet. */
  it("maakt dubbele koppen uniek", () => {
    expect(koppenUit("<h2>Tot slot</h2><h2>Tot slot</h2>").map((k) => k.id)).toEqual([
      "tot-slot",
      "tot-slot-2",
    ]);
  });

  it("negeert andere kopniveaus", () => {
    expect(koppenUit("<h1>Titel</h1><h3>Sub</h3><h2>Wel</h2>").map((k) => k.tekst)).toEqual([
      "Wel",
    ]);
  });

  it("geeft een lege lijst voor tekst zonder koppen", () => {
    expect(koppenUit("<p>Alleen alinea's.</p>")).toEqual([]);
  });
});
