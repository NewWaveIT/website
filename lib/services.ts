/**
 * De negen boekbare diensten uit de dienstencatalogus (augustus 2026), verdeeld
 * over drie families (doen/richting/capaciteit) en gekoppeld aan de richtingen
 * Mendix/AI/Strategie en het 5-fasenmodel. Dit is de lib-fallback; de CMS
 * (cms_services) wint wanneer aanwezig. Zie ook lib/diensten-detail.ts voor de
 * drie diensten die daarnaast een eigen, uitgebreide landingspagina hebben.
 */

import type {
  KPI,
  Vraagstuk,
  AanpakRow,
  WaaromItem,
  CaseVerwijzing,
  Feit,
  Meeneem,
  DagSlot,
  Vervolg,
  FaqItem,
} from "@/lib/content-blokken";
import type { ServiceFamilie, ServiceRichting, ServicePrijs } from "@/lib/dienstenstructuur";

// Doorgeven zodat serverbestanden aan één import genoeg hebben; client-
// componenten importeren rechtstreeks uit lib/dienstenstructuur.
export type { ServiceFamilie, ServiceRichting, ServicePrijs } from "@/lib/dienstenstructuur";
export { SERVICE_FAMILIES, RICHTINGEN } from "@/lib/dienstenstructuur";
import { APP_IN_A_DAY } from "@/lib/seeds/services/app-in-a-day";
import { AI_AGENT_IN_A_DAY } from "@/lib/seeds/services/ai-agent-in-a-day";
import { AI_OPPORTUNITY_SCAN } from "@/lib/seeds/services/ai-opportunity-scan";
import { AI_STRATEGIE } from "@/lib/seeds/services/ai-strategie";
import { IT_STRATEGIE } from "@/lib/seeds/services/it-strategie";
import { MENDIX_SCALE_SESSIE } from "@/lib/seeds/services/mendix-scale-sessie";
import { CONSULTANT_INHUREN } from "@/lib/seeds/services/consultant-inhuren";
import { FOUNDATION_STARTERKIT } from "@/lib/seeds/services/foundation-starterkit";
import { FUSION_TEAM_STARTSPRINT } from "@/lib/seeds/services/fusion-team-startsprint";
import { TRAINING_ENABLEMENT } from "@/lib/seeds/services/training-enablement";

export interface Service extends CaseVerwijzing {
  slug: string;
  naam: string;
  /** Groepering op het /diensten-overzicht. */
  familie: ServiceFamilie;
  /** "Thuis"-richting; leeg = geen eigen hub (inhuur, Training & Enablement). */
  richting?: ServiceRichting;
  /** Kolom op de richting-hub; standaard gelijk aan familie. */
  hubTier?: ServiceFamilie;
  /** Toont een kruisverwijzing-regel onderaan de hub(s) van deze richting(en). */
  ookRelevantVoor?: ServiceRichting[];
  /** Plek op de 5-fasenlijn; fase 4 en 5 hebben (nog) geen eigen dienst. */
  fase?: 1 | 2 | 3;
  /** Cursieve pitchregel op de kaart. */
  pitch: string;
  /** Langere marketingtekst ("tekstvoorstel voor de website"). */
  beschrijving: string;
  doelgroep: string;
  duur: string;
  groepsgrootte?: string;
  prijzen: ServicePrijs[];
  /** Drie bullets: wat de klant meeneemt. */
  resultaten: string[];
  volgendeStap: string;
  ctaLabel: string;
  ctaType: "datum" | "kennismaking";
  volgorde: number;

  /**
   * Diepte-inhoud voor de eigen pagina onder /diensten/<slug>. Elke dienst heeft
   * zo'n pagina, maar niet elke dienst heeft (al) deze secties — daarom is alles
   * optioneel en verbergt een lege sectie zichzelf.
   */
  vraagstukken?: Vraagstuk[];
  aanpak?: AanpakRow[];
  waarom?: WaaromItem[];
  outcomes?: KPI[];

  /* --- Detailpagina (ontwerp september 2026) ---------------------
     Eén sjabloon voor alle negen diensten; elk blok verbergt zijn
     sectie als het leeg is. Zonder deze velden valt de pagina terug
     op de sobere variant met alleen naam, pitch en beschrijving. */

  /** Kop in de hero. Leeg = `naam`. */
  kop?: string;
  /** Alinea onder de kop. Leeg = `pitch`. */
  lead?: string;
  /** Drie kolommen onder de hero-tekst, bv. Duur · Deelnemers · Locatie. */
  feiten?: Feit[];
  /** Kleine regel onder de prijs in de boekkaart. */
  prijsToelichting?: string;
  /** Bullets in de boekkaart. Leeg = `resultaten`. */
  boekPunten?: string[];
  /** Alinea onder "Herken je dit?". */
  herkenIntro?: string;
  /** Drie citaten waarin de lezer zichzelf herkent. */
  herken?: string[];
  meeneemtTitel?: string;
  meeneemt?: Meeneem[];
  meeneemtFoto?: string;
  /** Label boven het programma: "De dag zelf", "De weken", … */
  dagLabel?: string;
  dagTitel?: string;
  dagIntro?: string;
  dagSlots?: DagSlot[];
  voorbereidingIntro?: string;
  wijZorgen?: string[];
  jijZorgt?: string[];
  daarnaIntro?: string;
  /** Vervolgdiensten mét reden. Vervangt `volgendeStapSlugs` op deze pagina. */
  vervolg?: Vervolg[];
  faqTitel?: string;
  faq?: FaqItem[];
  /** Kop van de afsluitende CTA-band. */
  ctaTitel?: string;
}

export const SERVICES: Service[] = [
  APP_IN_A_DAY,
  AI_AGENT_IN_A_DAY,
  AI_OPPORTUNITY_SCAN,
  AI_STRATEGIE,
  IT_STRATEGIE,
  MENDIX_SCALE_SESSIE,
  CONSULTANT_INHUREN,
  FOUNDATION_STARTERKIT,
  FUSION_TEAM_STARTSPRINT,
  TRAINING_ENABLEMENT,
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);
