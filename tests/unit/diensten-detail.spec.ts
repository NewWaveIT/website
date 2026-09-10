import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { ICONEN } from "@/app/(marketing)/diensten/[slug]/iconen";
import { SERVICES } from "@/lib/services";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { FIELD_SCHEMAS } from "@/lib/cms/schema";

/**
 * De dienstdetailpagina is één sjabloon voor negen diensten, gevoed vanuit het
 * CMS. Deze tests bewaken de drie manieren waarop zo'n veld stil kan sneuvelen:
 * een icoonnaam die niet bestaat, een foto die er niet is, en een veld dat het
 * leespad of de admin niet kent.
 */

/** De velden die het ontwerp van september toevoegde aan een dienst. */
const DETAILVELDEN = [
  "kop",
  "lead",
  "feiten",
  "prijsToelichting",
  "boekPunten",
  "herkenIntro",
  "herken",
  "meeneemtTitel",
  "meeneemt",
  "meeneemtFoto",
  "dagLabel",
  "dagTitel",
  "dagIntro",
  "dagSlots",
  "voorbereidingIntro",
  "wijZorgen",
  "jijZorgt",
  "daarnaIntro",
  "vervolg",
  "faqTitel",
  "faq",
  "ctaTitel",
] as const;

describe("dienstdetail — de seed", () => {
  it("gebruikt alleen icoonnamen die de pagina kent", () => {
    // Een onbekende naam valt stil terug op een vinkje; dat zie je pas op de
    // live pagina en dan is het al gepubliceerd.
    const gebruikt = new Set(SERVICES.flatMap((s) => (s.meeneemt ?? []).map((m) => m.icon)));
    expect([...gebruikt].filter((i) => !(i in ICONEN))).toEqual([]);
  });

  it("verwijst alleen naar foto's die in public/ staan", () => {
    const ontbreekt = SERVICES.filter((s) => s.meeneemtFoto).filter((s) => {
      try {
        readFileSync(`public${s.meeneemtFoto}`);
        return false;
      } catch {
        return true;
      }
    });
    expect(ontbreekt.map((s) => `${s.slug} → ${s.meeneemtFoto}`)).toEqual([]);
  });

  it("verwijst alleen naar vervolgdiensten die bestaan", () => {
    const slugs = new Set(SERVICES.map((s) => s.slug));
    const dood = SERVICES.flatMap((s) =>
      (s.vervolg ?? []).filter((v) => !slugs.has(v.slug)).map((v) => `${s.slug} → ${v.slug}`),
    );
    expect(dood).toEqual([]);
  });
});

describe("dienstdetail — het CMS is de waarheid", () => {
  it("laat elk detailveld door het leespad", () => {
    // Een veld dat serviceSchema niet kent wordt bij het lezen weggegooid, en
    // dan wint de seed terwijl de admin iets anders zegt.
    const onbekend = DETAILVELDEN.filter((v) => !(v in CONTENT_SCHEMAS.services.shape));
    expect(onbekend).toEqual([]);
  });

  it("toont elk detailveld in de admin-editor", () => {
    const keys = new Set(FIELD_SCHEMAS.services.map((f) => f.key));
    expect(DETAILVELDEN.filter((v) => !keys.has(v))).toEqual([]);
  });
});
