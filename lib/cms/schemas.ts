import "server-only";
import { z } from "zod";
import type { ContentType } from "@/lib/cms/content";

/**
 * Runtime-vorm van elk contenttype: de bron van waarheid over wat een geldige
 * CMS-rij is.
 *
 * Waarom server-only: `lib/services.ts` en een paar andere contentbestanden
 * worden ook door clientcomponenten geïmporteerd (het contactformulier leest
 * bijvoorbeeld de dienstenlijst). Zou zod daar binnenkomen, dan belandt hij in
 * de browserbundel. De client-veilige bestanden houden daarom hun literal en
 * hun `interface`; dit bestand beschrijft dezelfde vorm voor de server. De
 * unittest `tests/unit/cms-schemas.spec.ts` bewaakt dat ze niet uit elkaar
 * lopen door elke seed hier doorheen te halen.
 *
 * `paginas` staat er bewust niet bij: dat type heeft per slug een eigen
 * veldset (`PAGE_FIELDS`) in plaats van één vorm.
 */

const tekst = z.string();
const optTekst = z.string().optional();
const lijst = z.array(z.string());

const kpi = z.object({ n: tekst, l: tekst });
const stap = z.object({ label: tekst, titel: tekst, tekst: optTekst });
const resultaatKaart = z.object({ titel: tekst, tekst: tekst });

const cases = z.object({
  slug: tekst,
  sector: tekst,
  metric: tekst,
  cardTitel: tekst,
  org: tekst,
  image: tekst,
  tag: tekst,
  h1: tekst,
  intro: tekst,
  impact: z.array(kpi),
  challenge: tekst,
  pull: tekst,
  ketenTitel: optTekst,
  ketenStappen: z.array(stap).optional(),
  ketenSynthese: optTekst,
  secties: z
    .array(
      z.object({
        titel: tekst,
        situatie: tekst,
        aanpak: tekst,
        stappen: z.array(stap).optional(),
        functionaliteiten: lijst.optional(),
        resultaten: z.array(resultaatKaart),
      }),
    )
    .optional(),
  resultaat: tekst,
  eindresultaten: z.array(resultaatKaart).optional(),
  aside: z.object({ sector: tekst, diensten: tekst, doorlooptijd: tekst, team: tekst }),
  quote: tekst,
  quoteNaam: tekst,
  quoteRol: tekst,
});

const vraagstuk = z.object({ q: tekst, titel: tekst, p: tekst });
const aanpakRij = z.object({
  kicker: tekst,
  titel: tekst,
  p: tekst,
  punten: lijst,
  img: tekst,
});

const diensten = z.object({
  slug: tekst,
  naam: tekst,
  badgeIcon: z.enum(["boxes", "brain-circuit", "route"]),
  badgeLabel: tekst,
  h1: tekst,
  intro: tekst,
  ctaSecondary: tekst,
  kpis: z.array(kpi),
  vraagstukken: z.array(vraagstuk),
  pijlersIntro: tekst,
  pijlers: z.array(
    z.object({
      num: tekst,
      titel: tekst,
      p: tekst,
      items: z.array(z.object({ summary: tekst, p: tekst })),
    }),
  ),
  aanpak: z.array(aanpakRij),
  waarom: z.array(z.object({ titel: tekst, p: tekst })),
  expertsHead: tekst,
  experts: z.array(z.object({ img: tekst, role: tekst, naam: tekst, tel: tekst })),
  partners: lijst,
  outcomes: z.array(kpi),
  caseTitle: optTekst,
  caseSector: optTekst,
  caseQuote: optTekst,
  caseNaam: optTekst,
  caseRol: optTekst,
  caseImage: optTekst,
  caseHref: optTekst,
  waarborg: optTekst,
  heroTheme: optTekst,
  serviceSlug: optTekst,
  insightsTitle: tekst,
  insights: z.array(z.object({ cat: tekst, meta: tekst, titel: tekst })),
  ctaTitle: tekst,
});

const sectoren = z.object({
  slug: tekst,
  naam: tekst,
  icon: z.enum(["building-2", "train-front", "banknote", "heart-pulse", "factory"]),
  h1: tekst,
  intro: tekst,
  kpis: z.array(kpi),
  challengesIntro: tekst,
  challenges: z.array(vraagstuk),
  solutions: z.array(aanpakRij),
  outcomes: z.array(kpi),
  caseTitle: optTekst,
  caseSector: optTekst,
  caseQuote: optTekst,
  caseNaam: optTekst,
  caseRol: optTekst,
  caseImage: optTekst,
  caseHref: optTekst,
  waarborg: optTekst,
  insightsTitle: tekst,
  insights: z.array(z.object({ meta: tekst, titel: tekst })),
  ctaTitle: tekst,
  proposities: lijst.optional(),
});

const richting = z.enum(["mendix", "ai", "strategie"]);
const familie = z.enum(["doen", "richting", "capaciteit"]);

const services = z.object({
  slug: tekst,
  naam: tekst,
  familie,
  richting: richting.optional(),
  hubTier: familie.optional(),
  ookRelevantVoor: z.array(richting).optional(),
  fase: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
  pitch: tekst,
  beschrijving: tekst,
  doelgroep: tekst,
  duur: tekst,
  groepsgrootte: optTekst,
  prijzen: z.array(z.object({ label: tekst, variant: optTekst })),
  resultaten: lijst,
  volgendeStap: tekst,
  volgendeStapSlugs: lijst.optional(),
  ctaLabel: tekst,
  ctaType: z.enum(["datum", "kennismaking"]),
  detailSlug: optTekst,
  volgorde: z.number(),
});

const artikelen = z.object({
  slug: tekst,
  cat: tekst,
  datum: tekst,
  leestijd: tekst,
  titel: tekst,
  auteur: tekst,
  image: tekst,
  intro: tekst,
  body: lijst,
  inhoudHtml: optTekst,
  auteurFoto: optTekst,
  discipline: optTekst,
  sector: optTekst,
});

const vacatures = z.object({
  slug: tekst,
  functietitel: tekst,
  discipline: tekst,
  locatie: tekst,
  tags: lijst,
  intro: tekst,
  secties: z.array(z.object({ titel: tekst, items: lijst })),
  facts: z.object({
    team: tekst,
    niveau: tekst,
    locatie: tekst,
    uren: tekst,
    salaris: tekst,
  }),
  employmentType: tekst,
  gepubliceerdOp: tekst,
});

const teamleden = z.object({
  slug: tekst,
  naam: tekst,
  rol: tekst,
  foto: optTekst,
  bio: tekst,
  contactrol: optTekst,
  telefoon: optTekst,
  email: optTekst,
  linkedin: optTekst,
});

const proposities = z.object({
  slug: tekst,
  nummer: z.number(),
  titel: tekst,
  belofte: tekst,
  wat: lijst,
  hoe: lijst,
  onderscheid: lijst,
  solutions: lijst,
});

export const CONTENT_SCHEMAS = {
  cases,
  diensten,
  sectoren,
  services,
  artikelen,
  vacatures,
  teamleden,
  proposities,
} satisfies Partial<Record<ContentType, z.ZodObject<z.ZodRawShape>>>;

export type GevalideerdType = keyof typeof CONTENT_SCHEMAS;

export const GEVALIDEERDE_TYPES = Object.keys(CONTENT_SCHEMAS) as GevalideerdType[];
