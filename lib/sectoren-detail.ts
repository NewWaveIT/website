/**
 * Content voor de sectordetailpagina's (/sectoren/[slug]).
 *
 * Geport uit ui_kits/website/sector-*.html (Claude Design, "The New Wave IT |
 * Huisstijl"). De pagina bestaat uit twaalf secties in vaste volgorde: hero,
 * herkenning, mensen, waarom nu, pijn → oplossing, wat we bouwen, hoe we
 * werken, diensten, FAQ, inzichten, team en CTA.
 *
 * Elke sectie verbergt zichzelf als zijn velden leeg zijn. Dat is geen
 * bijkomstigheid: een sector die nog niet volledig is ingevuld hoort geen lege
 * koppen te tonen.
 *
 * Drie secties halen hun inhoud niet hier maar uit het CMS, zodat er één
 * waarheid blijft: de inzichten (via `getArtikelenVoorSector`), de andere
 * sectoren (via `getSectoren`) en de mensen. Van teamleden staat hier alleen
 * een slug plus de sectorspecifieke regel; naam, rol en foto komen uit
 * cms_teamleden.
 */

import type { FaqItem } from "@/lib/content-blokken";
import { MOBILITEIT } from "@/lib/seeds/sectoren/mobiliteit";
import { PUBLIEKE_SECTOR } from "@/lib/seeds/sectoren/publieke-sector";
import { ZORG } from "@/lib/seeds/sectoren/zorg";
import { MANUFACTURING } from "@/lib/seeds/sectoren/manufacturing";
import { BANKEN } from "@/lib/seeds/sectoren/banken";

/** Lucide-iconen die in de sectorbadge en de use-cases voorkomen. */
export type SectorIcon =
  | "building-2"
  | "truck"
  | "banknote"
  | "heart-pulse"
  | "factory"
  | "calendar-check"
  | "route"
  | "scan-barcode"
  | "battery-charging"
  | "package-search"
  | "clipboard-check"
  | "file-check"
  | "users"
  | "shield-check"
  | "workflow"
  | "gauge"
  | "boxes"
  | "brain-circuit"
  | "monitor-smartphone"
  | "clipboard-list"
  | "sparkles"
  | "user-round"
  | "calendar-days"
  | "bed"
  | "calendar-clock"
  | "tablet-smartphone"
  | "badge-check"
  | "wrench"
  | "landmark";

/** In welke laag een oplossing zit; bepaalt de kleur van het label. */
export type OplossingLaag =
  "strategie" | "operatie" | "toekomst" | "platform" | "operating" | "delivery";

/** Eén rij in "Pijn → oplossing": wat er misgaat, wat het kost, wat wij doen. */
export interface Oplossing {
  pijn: string;
  kost: string;
  oplossing: string;
  laag: OplossingLaag;
}

/** Een applicatie die we in deze sector vaak bouwen. */
export interface UseCase {
  icon: SectorIcon;
  titel: string;
  tekst: string;
  /** Naar welk pijnpunt hij terugverwijst ("Sluit aan op: …"). */
  sluitAanOp: string;
}

export interface DienstLink {
  label: string;
  href: string;
}

// FaqItem staat in content-blokken.ts: dienstpagina's gebruiken hem ook.
export type { FaqItem };

/** Een teamlid op de sectorpagina: wie het is staat in het CMS, waarom hij hier
 *  staat is sectorspecifiek. */
export interface TeamRegel {
  /** Slug uit cms_teamleden. Bestaat hij niet, dan valt de regel weg. */
  teamlid: string;
  tekst: string;
}

export interface SectorDetail {
  slug: string;
  naam: string;
  icon: SectorIcon;
  /** Thema voor de hero-animatie (lib/sector-hero-svg.ts). */
  heroTheme: string;
  metaTitle: string;
  metaDescription: string;

  // 0 · Overzichten
  /**
   * De drie korte teksten die de homepage, /sectoren en /klantverhalen tonen.
   * Ze staan hier omdat een sector één bron hoort te hebben: daarvoor stond
   * dezelfde pitch in vier versies op vier plekken, en liep een wijziging in de
   * admin niet door naar de overzichten.
   */
  /** Het probleem in de woorden van de klant, tussen aanhalingstekens. */
  hook: string;
  /** Wat wij doen, in één zin. De tweede zin van `intro`, los bruikbaar. */
  pitch: string;
  /** Het labeltje onder de kaart, twee tot drie woorden. */
  kpiLabel: string;

  // 1 · Hero
  h1: string;
  intro: string;
  /** CSS object-position, om het onderwerp in beeld te houden. */

  // 2 · Herkenning
  herkenningTitel: string;
  herkenning: string[];

  // 2b · De mensen
  mensenTitel: string;
  mensenTekst: string;
  mensenFoto: string;
  mensenFotoPositie?: string;
  mensenTags: string[];

  // 3 · Waarom nu
  waaromTitel: string;
  waaromAlineas: string[];
  waaromFoto: string;
  waaromFotoPositie?: string;
  quote?: string;
  /** Slug uit cms_teamleden; leeg of onbekend ⇒ geen quote-blok. */
  quoteTeamlid?: string;

  // 4 · Pijn → oplossing
  oplossingenTitel: string;
  oplossingenIntro: string;
  oplossingen: Oplossing[];

  // 5 · Wat we bouwen
  bouwenTitel: string;
  useCases: UseCase[];

  // 6 · Hoe we werken
  aanpakTitel: string;
  aanpakFoto: string;
  aanpakFotoPositie?: string;
  stappen: string[];
  belofte: string;

  // 7 · Diensten
  dienstenTitel: string;
  dienstLinks: DienstLink[];

  // 8 · FAQ
  faqTitel: string;
  faq: FaqItem[];

  // 9b · Team
  teamTitel: string;
  team: TeamRegel[];

  // 10 · CTA
  ctaTitel: string;
  ctaTekst: string;
  ctaTeamlid?: string;
  ctaTeamlidTekst?: string;
}

export const SECTOREN: Record<string, SectorDetail> = {
  mobiliteit: MOBILITEIT,
  "publieke-sector": PUBLIEKE_SECTOR,
  zorg: ZORG,
  manufacturing: MANUFACTURING,
  banken: BANKEN,
};

export const SECTOR_SLUGS = Object.keys(SECTOREN);

/**
 * De volgorde waarin de sectoren in de overzichten staan. Los van `SECTOREN`,
 * want dat is een record en de sleutelvolgorde daarvan is geen ontwerpkeuze.
 */
export const SECTOR_VOLGORDE = [
  "publieke-sector",
  "mobiliteit",
  "banken",
  "zorg",
  "manufacturing",
] as const;
