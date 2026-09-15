import { describe, expect, it } from "vitest";
import { blokkerend, kort, tel, vergelijk, type SoortInvoer } from "@/lib/cms/baseline";
import type { FieldDef } from "@/lib/cms/schema";

/**
 * De nulmeting is alleen iets waard als hij rood wordt bij precies de vier
 * situaties die het hier eerder mis lieten gaan: een sleutel die een rij nooit
 * kreeg, een sleutel die na een schemawijziging bleef staan, een leeg
 * opgeslagen veld waar de seed tekst heeft, en een tekst die in de code is
 * bijgewerkt terwijl de rij achterbleef. Elk van de vier staat hieronder, plus
 * de gevallen waarin hij juist stil moet blijven.
 */

const VELDEN: FieldDef[] = [
  { key: "titel", label: "Titel", type: "text" },
  { key: "intro", label: "Intro", type: "textarea" },
  { key: "punten", label: "Punten", type: "list" },
];

function invoer(
  rijen: SoortInvoer["rijen"],
  seed: SoortInvoer["seed"],
  vergelijkWaarden = true,
): SoortInvoer[] {
  return [{ soort: "test", velden: () => VELDEN, rijen, seed, vergelijkWaarden }];
}

const NORM = (s: string) => s.split("\r\n").join("\n");

const VOLLEDIG = {
  slug: "a",
  status: "live",
  data: { titel: "Titel", intro: "Intro", punten: ["een"] },
};
const ZAAD = { a: { titel: "Titel", intro: "Intro", punten: ["een"] } };

describe("nulmeting", () => {
  it("zwijgt als de rij precies het schema en de seed volgt", () => {
    expect(vergelijk(invoer([VOLLEDIG], ZAAD), NORM)).toEqual([]);
  });

  it("ziet een sleutel die de rij niet heeft", () => {
    const rij = { ...VOLLEDIG, data: { titel: "Titel", punten: ["een"] } };
    const uit = vergelijk(invoer([rij], ZAAD), NORM);
    expect(uit.map((b) => [b.categorie, b.veld])).toEqual([["ontbrekend", "intro"]]);
    // De seedwaarde staat erbij, want dát is wat de site nu toont.
    expect(uit[0]?.seed).toBe("Intro");
  });

  it("ziet een sleutel die het schema niet kent", () => {
    const rij = { ...VOLLEDIG, data: { ...VOLLEDIG.data, oudVeld: "rest" } };
    expect(vergelijk(invoer([rij], ZAAD), NORM).map((b) => [b.categorie, b.veld])).toEqual([
      ["wees", "oudVeld"],
    ]);
  });

  it("onderscheidt leeg opgeslagen van een andere tekst", () => {
    const leeg = { ...VOLLEDIG, data: { ...VOLLEDIG.data, intro: "" } };
    const anders = { ...VOLLEDIG, data: { ...VOLLEDIG.data, intro: "Nieuwe intro" } };
    expect(vergelijk(invoer([leeg], ZAAD), NORM)[0]?.categorie).toBe("leeg");
    expect(vergelijk(invoer([anders], ZAAD), NORM)[0]?.categorie).toBe("afwijkend");
  });

  it("laat leeg met leeg met rust", () => {
    const rij = { ...VOLLEDIG, data: { ...VOLLEDIG.data, intro: "" } };
    const zaad = { a: { ...ZAAD.a, intro: "" } };
    expect(vergelijk(invoer([rij], zaad), NORM)).toEqual([]);
  });

  it("telt een CRLF-regeleinde niet als verschil", () => {
    const rij = { ...VOLLEDIG, data: { ...VOLLEDIG.data, intro: "een\r\ntwee" } };
    const zaad = { a: { ...ZAAD.a, intro: "een\ntwee" } };
    expect(vergelijk(invoer([rij], zaad), NORM)).toEqual([]);
  });

  it("vergelijkt lijsten en objecten op inhoud, niet op sleutelvolgorde", () => {
    const rij = { ...VOLLEDIG, data: { ...VOLLEDIG.data, punten: [{ b: 2, a: 1 }] } };
    const zaad = { a: { ...ZAAD.a, punten: [{ a: 1, b: 2 }] } };
    expect(vergelijk(invoer([rij], zaad), NORM)).toEqual([]);
  });

  it("ziet een waarde die niet bij het veldtype past", () => {
    const rij = { ...VOLLEDIG, data: { ...VOLLEDIG.data, punten: "geen lijst" } };
    expect(vergelijk(invoer([rij], ZAAD), NORM).map((b) => [b.categorie, b.veld])).toEqual([
      ["ongeldig", "punten"],
    ]);
  });

  it("meldt een slug die alleen aan één kant bestaat", () => {
    const alleenSeed = vergelijk(invoer([], ZAAD), NORM);
    expect(alleenSeed.map((b) => b.categorie)).toEqual(["alleen-seed"]);
    // En dan niet óók nog per veld klagen: één regel per slug.
    const alleenCms = vergelijk(invoer([VOLLEDIG], {}), NORM);
    expect(alleenCms.map((b) => b.categorie)).toEqual(["alleen-cms"]);
  });

  it("meldt een rij op concept die de seed wel kent", () => {
    const rij = { ...VOLLEDIG, status: "concept" };
    expect(vergelijk(invoer([rij], ZAAD), NORM).map((b) => b.categorie)).toEqual(["concept"]);
  });

  it("vergelijkt geen waarden als de seedvorm afwijkt", () => {
    const rij = { ...VOLLEDIG, data: { ...VOLLEDIG.data, intro: "heel iets anders" } };
    expect(vergelijk(invoer([rij], ZAAD, false), NORM)).toEqual([]);
  });

  it("scheidt wat naar nul moet van wat mag blijven staan", () => {
    const uit = vergelijk(
      invoer([{ ...VOLLEDIG, data: { titel: "Titel", intro: "Intro", punten: ["een"] } }], {}),
      NORM,
    );
    expect(blokkerend(uit)).toBe(0);
    expect(tel(uit)).toEqual([{ categorie: "alleen-cms", aantal: 1 }]);
  });
});

describe("kort", () => {
  it("kapt af en plet witruimte, zodat een tabelrij één regel blijft", () => {
    expect(kort("een\n  twee")).toBe("een twee");
    expect(kort("abcdefghij", 5)).toBe("abcde…");
    expect(kort(["a", "b"])).toBe('["a","b"]');
    expect(kort(undefined)).toBe("—");
  });
});
