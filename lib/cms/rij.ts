import "server-only";
import type { ContentRow } from "@/lib/cms/content";
import type { GevalideerdType } from "@/lib/cms/schemas";

/**
 * Van CMS-rij naar de vorm die de site verwacht.
 *
 * Een rij bewaart de inhoud in `data`, maar een paar velden staan in de kolommen
 * (`slug`, `titel`, `volgorde`). Welk veld waar vandaan komt verschilt per
 * contenttype en zat ooit verspreid over negen `mapRow`-functies. Dit is die
 * kennis op één plek: de enige stap tussen een rij uit Supabase en het
 * runtime-schema in `leesRij`.
 *
 * `artikelen` staat er bewust niet bij: dat type doet echte transformatie
 * (datumnotatie, HTML-detectie, auteur opzoeken) in plaats van een
 * veldvertaling, en kan daardoor structureel niet ongeldig zijn.
 */
export type GemapteType = Exclude<GevalideerdType, "artikelen">;

type Bouwer = (row: ContentRow) => Record<string, unknown>;

/** Wat een keuzeveld in de admin toont als "niet ingevuld". */
const SENTINELS = new Set(["(geen)", "(zelfde als familie)"]);

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
    const uit: Record<string, unknown> = { ...d };
    // De keuzevelden in de admin hebben een expliciete 'leeg'-optie. Die staat
    // als tekst in de data, dus hier normaliseren naar een lege waarde. Let op:
    // de sleutel blíjft staan (met `undefined`), want dat is het verschil tussen
    // "de redacteur koos (geen)" en "de rij kent dit veld niet" — alleen bij het
    // tweede springt de seed bij. Zie `vulAan` in lib/cms/merge.ts.
    for (const veld of ["richting", "hubTier", "fase"]) {
      const v = uit[veld];
      if (typeof v === "string" && SENTINELS.has(v.trim())) uit[veld] = undefined;
    }
    // `fase` staat als tekst in een select maar is in het schema een getal.
    if (typeof uit.fase === "string" && uit.fase.trim()) uit.fase = Number(uit.fase);
    return { ...uit, slug: row.slug, naam: d.naam || row.titel, volgorde: row.volgorde };
  },
  vacatures: (row) => {
    const d = row.data as Record<string, unknown>;
    return { ...d, slug: row.slug, functietitel: d.functietitel || row.titel };
  },
  teamleden: (row) => ({ ...(row.data as object), slug: row.slug, naam: row.titel }),
  proposities: (row) => ({ ...(row.data as object), slug: row.slug, titel: row.titel }),
};

/** Sla één rij plat tot de vorm die het runtime-schema beschrijft. */
export function rijNaarRuw(type: GemapteType, row: ContentRow): Record<string, unknown> {
  return BOUWERS[type](row);
}
