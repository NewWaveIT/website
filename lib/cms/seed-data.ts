import "server-only";
import { ARTIKELEN } from "@/lib/inzichten";
import { KLANTVERHALEN } from "@/lib/klantverhalen";
import { VACATURES } from "@/lib/vacatures";
import { DIENSTEN } from "@/lib/diensten-detail";
import { SECTOREN } from "@/lib/sectoren-detail";
import { PAGE_DEFAULTS } from "@/lib/cms/pages";
import { TEAMLEDEN } from "@/lib/team";
import { PROPOSITIES } from "@/lib/proposities";
import type { ContentType } from "@/lib/cms/content";

export interface SeedRow {
  slug: string;
  titel: string;
  status: string;
  data: Record<string, unknown>;
  volgorde: number;
}

const PAGE_TITEL: Record<string, string> = {
  home: "Homepage",
  "over-ons": "Over ons",
  contact: "Contact",
  diensten: "Diensten (overzicht)",
  sectoren: "Sectoren (overzicht)",
  "werken-bij": "Werken bij",
};

/** Bouwt per contenttype de rijen uit de huidige (lib-)content. */
export function buildSeed(): Record<ContentType, SeedRow[]> {
  return {
    paginas: Object.entries(PAGE_DEFAULTS).map(([slug, data], i) => ({
      slug,
      titel: PAGE_TITEL[slug] ?? slug,
      status: "live",
      data: { ...data },
      volgorde: i,
    })),

    artikelen: ARTIKELEN.map((a, i) => {
      const disciplines = ["Mendix", "AI", "Strategie"];
      const sectoren = ["Publieke sector", "Mobiliteit", "Banken", "Zorg", "Manufacturing"];
      return {
        slug: a.slug,
        titel: a.titel,
        status: "live",
        volgorde: i,
        data: {
          discipline: disciplines.includes(a.cat) ? a.cat : "Algemeen",
          sector: sectoren.includes(a.cat) ? a.cat : "Algemeen",
          samenvatting: a.intro,
          cover: a.image,
          leestijd: a.leestijd,
          auteur: a.auteur,
          datum: a.datum,
          inhoud: a.body.join("\n\n"),
        },
      };
    }),

    cases: KLANTVERHALEN.map((k, i) => {
      const { slug, ...data } = k;
      return { slug, titel: k.cardTitel, status: "live", volgorde: i, data };
    }),

    vacatures: VACATURES.map((v, i) => {
      const { slug, ...data } = v;
      return { slug, titel: v.functietitel, status: "live", volgorde: i, data };
    }),

    diensten: Object.values(DIENSTEN).map((d, i) => {
      const { slug, ...data } = d;
      return { slug, titel: d.naam, status: "live", volgorde: i, data };
    }),

    sectoren: Object.values(SECTOREN).map((s, i) => {
      const { slug, ...data } = s;
      return { slug, titel: s.naam, status: "live", volgorde: i, data };
    }),

    teamleden: TEAMLEDEN.map((t, i) => ({
      slug: t.slug,
      titel: t.naam,
      status: "live",
      volgorde: i,
      data: { rol: t.rol, foto: t.foto, bio: t.bio },
    })),

    proposities: PROPOSITIES.map((p, i) => ({
      slug: p.slug,
      titel: p.titel,
      status: "live",
      volgorde: i,
      data: {
        nummer: p.nummer,
        belofte: p.belofte,
        wat: p.wat,
        hoe: p.hoe,
        onderscheid: p.onderscheid,
        solutions: p.solutions,
      },
    })),
  };
}
