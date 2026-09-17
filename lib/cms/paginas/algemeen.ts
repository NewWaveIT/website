import type { FieldDef } from "../schema";

/** De velden die de editor voor deze pagina toont. */
export const VELDEN = [
  { key: "footerBlurb", label: "Voettekst — omschrijving", type: "textarea" },
  { key: "footerKopSectoren", label: "Voettekst — kop kolom 1", type: "text" },
  { key: "footerKopBedrijf", label: "Voettekst — kop kolom 2", type: "text" },
  { key: "footerKopContact", label: "Voettekst — kop kolom 3", type: "text" },
  { key: "footerPrivacy", label: "Voettekst — link privacybeleid", type: "text" },
  { key: "footerVoorwaarden", label: "Voettekst — link algemene voorwaarden", type: "text" },
  { key: "cookieTekst", label: "Cookiemelding — tekst", type: "textarea" },
  { key: "cookieLink", label: "Cookiemelding — linktekst", type: "text" },
  { key: "cookieWeiger", label: "Cookiemelding — knop weigeren", type: "text" },
  { key: "cookieAccepteer", label: "Cookiemelding — knop accepteren", type: "text" },
  { key: "inzichtenLeeg", label: "Inzichten — tekst als er niets staat", type: "textarea" },
  { key: "inzichtenMeer", label: "Inzichten — linktekst per artikel", type: "text" },
  { key: "caseLees", label: "Klantverhaal-carrousel — linktekst", type: "text" },
  { key: "leadHint", label: "Aanmeldformulier — hint in het e-mailveld", type: "text" },
  { key: "leadKnop", label: "Aanmeldformulier — knoptekst", type: "text" },
  { key: "leadKnopBezig", label: "Aanmeldformulier — knop tijdens versturen", type: "text" },
  { key: "heroKnop", label: "Homepage-hero — eerste knop", type: "text" },
  { key: "heroKnopTwee", label: "Homepage-hero — tweede knop", type: "text" },
  { key: "artikelDoor", label: "Artikel — woord voor de auteur", type: "text" },
] as const satisfies readonly FieldDef[];

/** Standaardtekst per veld: de startwaarde in de editor en de terugval op de site. */
export const TEKSTEN = {
  footerBlurb:
    "De business-specialist in publieke sector, mobiliteit, banken, zorg en manufacturing. Technologie als middel, jouw resultaat als doel.",
  footerKopSectoren: "Sectoren",
  footerKopBedrijf: "Bedrijf",
  footerKopContact: "Contact",
  footerPrivacy: "Privacybeleid",
  footerVoorwaarden: "Algemene voorwaarden",
  cookieTekst:
    "We gebruiken alleen functionele cookies. Met jouw toestemming plaatsen we ook analytische cookies om de site te verbeteren. Zie ons",
  cookieLink: "privacybeleid",
  cookieWeiger: "Alleen functioneel",
  cookieAccepteer: "Accepteren",
  inzichtenLeeg: "Er staan nog geen inzichten online. Kom binnenkort terug.",
  inzichtenMeer: "Lees meer",
  caseLees: "Lees het verhaal",
  leadHint: "naam@organisatie.nl",
  leadKnop: "Aanmelden",
  leadKnopBezig: "Versturen…",
  heroKnop: "Plan een gesprek",
  heroKnopTwee: "Klantverhalen",
  artikelDoor: "door",
} satisfies Record<(typeof VELDEN)[number]["key"], string>;
