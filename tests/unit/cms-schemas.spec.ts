import { describe, expect, it } from "vitest";
import { CONTENT_SCHEMAS, GEVALIDEERDE_TYPES, type GevalideerdType } from "@/lib/cms/schemas";
import { FIELD_SCHEMAS } from "@/lib/cms/schema";
import { KLANTVERHALEN } from "@/lib/klantverhalen";
import { DIENSTEN } from "@/lib/diensten-detail";
import { SECTOREN } from "@/lib/sectoren-detail";
import { SERVICES } from "@/lib/services";
import { ARTIKELEN } from "@/lib/inzichten";
import { VACATURES } from "@/lib/vacatures";
import { TEAMLEDEN } from "@/lib/team";
import { PROPOSITIES } from "@/lib/proposities";

/**
 * Twee vangrails tegen de bugklasse die drie keer terugkwam: de seed, het
 * runtime-schema en het admin-schema beschrijven dezelfde data en mogen niet
 * uit elkaar lopen.
 */

const SEEDS: Record<GevalideerdType, unknown[]> = {
  cases: KLANTVERHALEN,
  diensten: Object.values(DIENSTEN),
  sectoren: Object.values(SECTOREN),
  services: SERVICES,
  artikelen: ARTIKELEN,
  vacatures: VACATURES,
  teamleden: TEAMLEDEN,
  proposities: PROPOSITIES,
};

describe("elke seed voldoet aan zijn runtime-schema", () => {
  for (const type of GEVALIDEERDE_TYPES) {
    it(type, () => {
      const schema = CONTENT_SCHEMAS[type];
      for (const item of SEEDS[type]) {
        const r = schema.safeParse(item);
        if (!r.success) {
          const waar = r.error.issues
            .map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`)
            .join("; ");
          const slug = (item as { slug?: string }).slug ?? "?";
          expect.fail(`${type}/${slug} → ${waar}`);
        }
      }
    });
  }
});

describe("elk schemaveld is te bewerken in de admin", () => {
  // Velden die bewust buiten de editor blijven: de rij levert ze zelf aan.
  const BUITEN_EDITOR: Partial<Record<GevalideerdType, string[]>> = {
    cases: ["slug"],
    diensten: ["slug"],
    sectoren: ["slug"],
    services: ["slug", "volgorde"],
    // Artikelen wijken af: de editor gebruikt andere veldnamen (cover, samenvatting,
    // inhoud) die inzichten-data.ts vertaalt, en titel komt van de rijtitel.
    artikelen: ["slug", "titel", "cat", "image", "intro", "body", "inhoudHtml", "auteurFoto"],
    vacatures: ["slug"],
    teamleden: ["slug", "naam"],
    proposities: ["slug", "titel"],
  };

  for (const type of GEVALIDEERDE_TYPES) {
    it(type, () => {
      const inEditor = new Set(FIELD_SCHEMAS[type].map((f) => f.key));
      const genegeerd = new Set(BUITEN_EDITOR[type] ?? []);
      const ontbreekt = Object.keys(CONTENT_SCHEMAS[type].shape).filter(
        (k) => !inEditor.has(k) && !genegeerd.has(k),
      );
      expect(ontbreekt, `niet bewerkbaar in /admin/${type}`).toEqual([]);
    });
  }
});
