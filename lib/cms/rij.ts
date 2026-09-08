import "server-only";
import type { ContentRow } from "@/lib/cms/content";
import type { GevalideerdType } from "@/lib/cms/schemas";

/**
 * Van CMS-rij naar de vorm die de site verwacht.
 *
 * Een rij bewaart de inhoud in `data`, maar een paar velden staan in de kolommen
 * (`slug`, `titel`, `volgorde`). Welk veld waar vandaan komt verschilt per
 * contenttype en zat tot nu toe verspreid over negen `mapRow`-functies. Dit is
 * die kennis op één plek, zodat validatie, synchronisatie en het leespad
 * allemaal naar dezelfde vorm kijken.
 *
 * `artikelen` staat er bewust niet bij: dat type doet echte transformatie
 * (datumnotatie, HTML-detectie, auteur opzoeken) in plaats van een
 * veldvertaling, en kan daardoor structureel niet ongeldig zijn.
 */
export type GemapteType = Exclude<GevalideerdType, "artikelen">;

type Bouwer = (row: ContentRow) => Record<string, unknown>;

const BOUWERS: Record<GemapteType, Bouwer> = {
  cases: (row) => {
    const d = row.data as Record<string, unknown>;
    return {
      ...d,
      slug: row.slug,
      cardTitel: d.cardTitel || row.titel,
      h1: d.h1 || row.titel,
    };
  },
  diensten: (row) => ({ ...(row.data as object), slug: row.slug }),
  sectoren: (row) => ({ ...(row.data as object), slug: row.slug }),
  services: (row) => {
    const d = row.data as Record<string, unknown>;
    return { ...d, slug: row.slug, naam: d.naam || row.titel, volgorde: row.volgorde };
  },
  vacatures: (row) => {
    const d = row.data as Record<string, unknown>;
    return { ...d, slug: row.slug, functietitel: d.functietitel || row.titel };
  },
  teamleden: (row) => ({ ...(row.data as object), slug: row.slug, naam: row.titel }),
  proposities: (row) => ({ ...(row.data as object), slug: row.slug, titel: row.titel }),
};

export const GEMAPTE_TYPES = Object.keys(BOUWERS) as GemapteType[];

export function isGemapteType(t: string): t is GemapteType {
  return t in BOUWERS;
}

/** Sla één rij plat tot de vorm die het runtime-schema beschrijft. */
export function rijNaarRuw(type: GemapteType, row: ContentRow): Record<string, unknown> {
  return BOUWERS[type](row);
}
