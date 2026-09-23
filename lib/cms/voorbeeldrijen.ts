import type { ContentRow } from "@/lib/cms/content";
import type { Lead } from "@/lib/cms/inzendingen-types";

/**
 * Verzonnen rijen voor de ontwerpweergave op /ontwerp.
 *
 * Waarom dit bestaat: de admin zit achter Supabase-auth en CI komt daar niet
 * in, en lokaal staat er geen werkende sleutel. De WCAG-gate draaide daarom
 * tegen een met de hand geschreven kopie van de admin-markup -- 407 regels die
 * niets tegenhield zodra een component veranderde. Nu rendert /ontwerp de
 * échte componenten met deze rijen, dus de gate meet wat er werkelijk staat en
 * kan er geen kopie meer wegdrijven.
 *
 * Alles hier is duidelijk nep: geen bestaande klant, geen echte naam, geen echt
 * adres. Deze pagina is niet openbaar, maar een voorbeeldscherm dat per ongeluk
 * op een echte aanvraag lijkt is precies hoe je in een demo iemands gegevens
 * laat zien.
 */

const NU = "2026-09-20T10:15:00.000Z";

export const VOORBEELD_RIJEN: ContentRow[] = [
  {
    id: "v1",
    slug: "home",
    titel: "Home",
    status: "live",
    volgorde: 0,
    bijgewerkt_op: NU,
    bewerkt_door: "Voorbeeld",
    data: {},
  },
  {
    id: "v2",
    slug: "over-ons",
    titel: "Over ons",
    status: "concept",
    volgorde: 1,
    bijgewerkt_op: "2026-09-18T08:00:00.000Z",
    bewerkt_door: "Voorbeeld",
    data: {},
  },
  {
    id: "v3",
    slug: "voorbeeldpagina-met-een-lange-titel-die-moet-afbreken",
    titel: "Voorbeeldpagina met een opvallend lange titel die ergens moet afbreken",
    status: "live",
    volgorde: 2,
    bijgewerkt_op: "2026-09-02T14:30:00.000Z",
    bewerkt_door: null,
    data: {},
  },
];

/** Eén rij om de editor mee te vullen; leeg laten geeft het "nieuw"-scherm. */
export const VOORBEELD_RIJ: ContentRow = {
  ...VOORBEELD_RIJEN[0]!,
  data: {
    metaTitle: "Voorbeeldtitel voor de zoekresultaten",
    metaDescription: "Een omschrijving van ongeveer de lengte die Google toont.",
    heroTitleStart: "Een voorbeeldkop, ",
    heroAccent: "met accent",
    heroTitleEnd: ".",
    heroLead: "Een korte inleiding onder de kop, zodat het tekstvlak niet leeg oogt.",
  },
};

export const VOORBEELD_TELLERS: Record<string, number> = {
  paginas: 12,
  diensten: 3,
  services: 10,
  sectoren: 5,
  cases: 1,
  artikelen: 4,
  teamleden: 8,
  vacatures: 2,
  aanvragen: 1,
  sollicitaties: 3,
  nieuwsbrief: 0,
};

export const VOORBEELD_LEADS: Lead[] = [
  {
    id: "l1",
    created_at: NU,
    naam: "Voorbeeld Aanvrager",
    email: "voorbeeld@example.com",
    bedrijf: "Voorbeeld BV",
    onderwerp: "Mendix-scan",
    bericht: "Graag een gesprek over een Mendix-scan.",
    type: "contact",
    status: "nieuw",
    toegewezen_aan: null,
    interne_notitie: null,
  },
  {
    id: "l2",
    created_at: "2026-09-19T09:00:00.000Z",
    naam: "Tweede Voorbeeld",
    email: "tweede@example.com",
    bedrijf: null,
    onderwerp: "Vraag over AI",
    bericht:
      "Een wat langer bericht, zodat te zien is hoe een kaartje met meer tekst zich houdt in de kolom.",
    type: "contact",
    status: "in_behandeling",
    toegewezen_aan: "Voorbeeld",
    interne_notitie: "Teruggebeld, wacht op offerte.",
  },
];

/**
 * Staat de ontwerpweergave aan?
 *
 * In ontwikkeling altijd, want daar wordt hij gebruikt. Daarbuiten alleen met
 * een expliciete vlag, die CI zet en Vercel niet: op productie is /ontwerp dus
 * een 404. De vlag is geen beveiliging -- er staat niets gevoeligs op -- maar
 * een gesloten deur waar niemand doorheen hoeft.
 */
export function voorbeeldToegestaan(): boolean {
  return process.env.NODE_ENV === "development" || process.env.ADMIN_VOORBEELD === "1";
}

/* ---- De vier andere admintabellen ---------------------------------------
 * Ook hier: alles verzonnen. Zie de toelichting bovenaan dit bestand.
 */

export const VOORBEELD_AUDIT = [
  {
    id: "a1",
    tijdstip: NU,
    gebruiker_email: "voorbeeld@example.com",
    gebruiker_naam: "Voorbeeld",
    actie: "bijgewerkt" as const,
    content_type: "paginas",
    slug: "home",
    titel: "Home",
  },
  {
    id: "a2",
    tijdstip: "2026-09-19T16:40:00.000Z",
    gebruiker_email: "tweede@example.com",
    gebruiker_naam: "Tweede Voorbeeld",
    actie: "verwijderd" as const,
    content_type: "sollicitaties",
    slug: "8f1c2d3e",
    titel: null,
  },
  {
    id: "a3",
    tijdstip: "2026-09-18T11:05:00.000Z",
    gebruiker_email: "voorbeeld@example.com",
    gebruiker_naam: "Voorbeeld",
    actie: "aangemaakt" as const,
    content_type: "artikelen",
    slug: "een-voorbeeldartikel",
    titel: "Een voorbeeldartikel met een wat langere titel",
  },
];

export const VOORBEELD_GEBRUIKERS = [
  {
    id: "g1",
    email: "voorbeeld@example.com",
    naam: "Voorbeeld Beheerder",
    laatsteLogin: NU,
    aangemaakt: "2026-01-10T09:00:00.000Z",
    actief: true,
  },
  {
    id: "g2",
    email: "tweede@example.com",
    naam: "Tweede Voorbeeld",
    laatsteLogin: null,
    aangemaakt: "2026-06-01T09:00:00.000Z",
    actief: false,
  },
];

export const VOORBEELD_NIEUWSBRIEF = [
  { id: "n1", created_at: NU, email: "aanmelding@example.com" },
  { id: "n2", created_at: "2026-09-15T12:00:00.000Z", email: "een.heel.lang.adres@example.com" },
];

export const VOORBEELD_BEVINDINGEN = [
  {
    categorie: "ontbrekend" as const,
    soort: "paginas",
    slug: "inzichten",
    veld: "artikelAuteurCta",
    cms: "—",
    seed: "Stel je vraag",
  },
  {
    categorie: "afwijkend" as const,
    soort: "teamleden",
    slug: "voorbeeld-teamlid",
    veld: "linkedin",
    cms: "https://www.linkedin.com/in/voorbeeld/",
    seed: "https://www.linkedin.com/company/the-new-wave-it",
  },
];
