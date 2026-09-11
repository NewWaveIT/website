import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { SERVICE_VRAGEN } from "@/lib/services-vragen";

/**
 * Het formulier en zijn server action delen een contract dat nergens is
 * vastgelegd: de `name`-attributen in de JSX moeten precies de sleutels zijn die
 * de action uit de FormData haalt.
 *
 * Niets bewaakte dat. De e2e verstuurt het contactformulier wel écht, maar leeg
 * — en dan komt er hoe dan ook een validatiefout terug, ook als een veld anders
 * heet dan de action verwacht. De unittests van de actions bouwen hun eigen
 * FormData op en gebruiken het formulier dus niet. Een hernoemd veld valt door
 * beide mazen en levert stil een lege waarde op.
 */

const HONEYPOT = "website";

/** Sleutels die de action uit de FormData leest, letterlijk in de bron. */
function gelezenSleutels(bron: string): Set<string> {
  const uit = new Set<string>();
  const patronen = [
    /\bstr\(formData,\s*"([a-zA-Z_]+)"\)/g,
    /\bpickDoc\(formData,\s*"([a-zA-Z_]+)"/g,
    /\bformData\.getAll\("([a-zA-Z_]+)"\)/g,
    /\bformData\.get\("([a-zA-Z_]+)"\)/g,
  ];
  for (const p of patronen) for (const m of bron.matchAll(p)) uit.add(m[1]!);
  return uit;
}

/** Namen die het formulier rendert, letterlijk in de JSX. */
function gerenderdeNamen(bron: string): Set<string> {
  return new Set([...bron.matchAll(/\bname="([a-zA-Z_]+)"/g)].map((m) => m[1]!));
}

/**
 * De vervolgvragen op het contactformulier krijgen hun naam uit
 * `SERVICE_VRAGEN`, aan beide kanten. Ze staan dus in geen van beide bestanden
 * als letterlijke string, en ze kunnen ook niet uit de pas lopen — één bron.
 */
const VRAAGNAMEN = new Set(Object.values(SERVICE_VRAGEN).map((v) => v.name));

const KOPPELINGEN = [
  {
    naam: "contact",
    formulier: "components/contact/contact-form.tsx",
    action: "app/(marketing)/contact/actions.ts",
  },
  {
    naam: "sollicitatie",
    formulier: "components/vacatures/sollicitatie-form.tsx",
    action: "app/(marketing)/vacatures/[slug]/actions.ts",
  },
  {
    naam: "inzichten-lead",
    formulier: "components/inzichten/lead-cta.tsx",
    action: "app/(marketing)/inzichten/actions.ts",
  },
];

describe("formulier en server action lezen dezelfde velden", () => {
  for (const { naam, formulier, action } of KOPPELINGEN) {
    const gerenderd = gerenderdeNamen(readFileSync(formulier, "utf8"));
    const gelezen = gelezenSleutels(readFileSync(action, "utf8"));

    it(`${naam} — de action leest niets wat het formulier niet stuurt`, () => {
      const nergensVandaan = [...gelezen].filter((k) => !gerenderd.has(k) && !VRAAGNAMEN.has(k));
      expect(nergensVandaan, `${action} leest een veld dat ${formulier} niet rendert`).toEqual([]);
    });

    it(`${naam} — het formulier stuurt niets wat de action negeert`, () => {
      const genegeerd = [...gerenderd].filter((k) => !gelezen.has(k) && !VRAAGNAMEN.has(k));
      expect(genegeerd, `${formulier} rendert een veld dat ${action} nooit uitleest`).toEqual([]);
    });

    it(`${naam} — het honeypotveld heet overal ${HONEYPOT}`, () => {
      expect(gerenderd.has(HONEYPOT), `${formulier} mist het honeypotveld`).toBe(true);
      expect(gelezen.has(HONEYPOT), `${action} controleert de honeypot niet`).toBe(true);
    });
  }
});
