/**
 * Vacatures voor /werken-bij en /vacatures/[slug].
 *
 * Vul hier niets in met verzonnen arbeidsvoorwaarden of salarisbedragen: wat een
 * vacature belooft is een toezegging aan een sollicitant. De teksten horen uit
 * de vacature-PDF's op thenewwaveit.com/join-us/ te komen. De open sollicitatie
 * is geen vacature maar het formulier onderaan /werken-bij.
 */

export interface VacatureSectie {
  titel: string;
  items: string[];
}

export interface Vacature {
  slug: string;
  functietitel: string;
  discipline: string; // korte label voor de lijst, bv. "Mendix · Senior"
  locatie: string;
  tags: string[];
  /** De hele vacature als opgemaakte HTML uit de editor; de eerste alinea is de intro. */
  inhoud?: string;
  /** Afgeleid van `inhoud` bij het lezen: de tekst onder de header, ontsmet. */
  inhoudHtml?: string;
  /** Intro in de header. Bij `inhoud` afgeleid van de eerste alinea; anders het oude losse veld. */
  intro: string;
  /** Oud model (vóór `inhoud`): alleen nog voor rijen die er nog zo uitzien. */
  secties: VacatureSectie[];
  /** Optioneel kaartje naast de tekst; lege regels worden niet getoond. */
  facts: { team: string; niveau: string; locatie: string; uren: string; salaris: string };
  employmentType: string;
  gepubliceerdOp: string;
}

/**
 * Geen openstaande vacatures bij livegang (9 september 2026).
 *
 * De seed is bewust leeg: hij is de fallback voor een lege tabel, dus zou een
 * vacature hier de rijen in het CMS overstemmen die op concept staan. RLS laat
 * de publieke client alleen `status='live'` zien, waardoor "alles op concept"
 * en "tabel leeg" er voor de site identiek uitzien — met een gevulde seed zou
 * een op concept gezette vacature dus gewoon blijven staan.
 *
 * De teksten van de twee Mendix-vacatures staan als concept in `cms_vacatures`
 * (zie supabase/scripts/20260909-vacatures-op-concept.sql). Een vacature
 * terugzetten is één statuswissel naar 'live' in /admin/vacatures; de seed hoeft
 * daar niet voor terug.
 */
export const VACATURES: Vacature[] = [];
