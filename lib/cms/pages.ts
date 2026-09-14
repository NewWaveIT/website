// Per-pagina veldschema's voor het contenttype 'paginas'. Anders dan de andere
// typen heeft elke pagina (slug) zijn eigen set velden. De editor en de
// opslag-actie gebruiken deze wanneer het type 'paginas' is.

import type { FieldDef } from "./schema";

export const PAGE_FIELDS = {
  home: [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroTitleEnd", label: "Hero — titel (eind)", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
    { key: "ctaKnop", label: "Slot-CTA — knoptekst", type: "text" },
    { key: "mensenKicker", label: "Mensen — kicker", type: "text" },
    { key: "mensenTitel", label: "Mensen — titel", type: "text" },
    { key: "mensenP1", label: "Mensen — alinea 1", type: "textarea" },
    { key: "mensenP2", label: "Mensen — alinea 2", type: "textarea" },
    { key: "dienstenKicker", label: "Diensten — kicker", type: "text" },
    { key: "dienstenTitel", label: "Diensten — titel", type: "text" },
    { key: "dienstenIntro", label: "Diensten — introtekst", type: "textarea" },
    { key: "sectorenKicker", label: "Sectoren — kicker", type: "text" },
    { key: "sectorenTitel", label: "Sectoren — titel", type: "text" },
    { key: "sectorenIntro", label: "Sectoren — introtekst", type: "textarea" },
    { key: "casesKicker", label: "Klantverhalen — kicker", type: "text" },
    { key: "casesTitel", label: "Klantverhalen — titel", type: "text" },
    { key: "inzichtenKicker", label: "Inzichten — kicker", type: "text" },
    { key: "inzichtenTitel", label: "Inzichten — titel", type: "text" },
  ],
  "over-ons": [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "missieTitel", label: "Missie — titel", type: "text" },
    { key: "missieP1", label: "Missie — alinea 1", type: "textarea" },
    { key: "missieP2", label: "Missie — alinea 2", type: "textarea" },
    { key: "teamTitel", label: "Team — titel", type: "text" },
    { key: "teamP1", label: "Team — alinea 1", type: "textarea" },
    { key: "teamP2", label: "Team — alinea 2", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
    { key: "waardenKicker", label: "Waarden — kicker", type: "text" },
    { key: "waardenTitel", label: "Waarden — titel", type: "text" },
    { key: "waarde1Titel", label: "Waarde 1 — titel", type: "text" },
    { key: "waarde1Tekst", label: "Waarde 1 — tekst", type: "textarea" },
    { key: "waarde2Titel", label: "Waarde 2 — titel", type: "text" },
    { key: "waarde2Tekst", label: "Waarde 2 — tekst", type: "textarea" },
    { key: "waarde3Titel", label: "Waarde 3 — titel", type: "text" },
    { key: "waarde3Tekst", label: "Waarde 3 — tekst", type: "textarea" },
    { key: "waarde4Titel", label: "Waarde 4 — titel", type: "text" },
    { key: "kpi1Getal", label: "Feit 1 — getal", type: "text" },
    { key: "kpi1Label", label: "Feit 1 — label", type: "text" },
    { key: "kpi2Getal", label: "Feit 2 — getal", type: "text" },
    { key: "kpi2Label", label: "Feit 2 — label", type: "text" },
    { key: "kpi3Getal", label: "Feit 3 — getal", type: "text" },
    { key: "kpi3Label", label: "Feit 3 — label", type: "text" },
    { key: "missieFotoAlt", label: "Missie — alt-tekst bij de foto", type: "text" },
    { key: "teamFotoAlt", label: "Team — alt-tekst bij de foto", type: "text" },
    { key: "adresRegel", label: "Voetregel — bezoekadres", type: "text" },
    { key: "waarde4Tekst", label: "Waarde 4 — tekst", type: "textarea" },
  ],
  contact: [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "verwachtTitel", label: "Wat je kunt verwachten — titel", type: "text" },
    { key: "verwacht1Titel", label: "Stap 1 — titel", type: "text" },
    { key: "verwacht1Tekst", label: "Stap 1 — tekst", type: "textarea" },
    { key: "verwacht2Titel", label: "Stap 2 — titel", type: "text" },
    { key: "verwacht2Tekst", label: "Stap 2 — tekst", type: "textarea" },
    { key: "verwacht3Titel", label: "Stap 3 — titel", type: "text" },
    { key: "verwacht3Tekst", label: "Stap 3 — tekst", type: "textarea" },
    { key: "manierenKop", label: "Contactmanieren — verborgen kop (screenreader)", type: "text" },
    { key: "manier1Titel", label: "Bellen — titel", type: "text" },
    { key: "manier1Tekst", label: "Bellen — tekst", type: "textarea" },
    { key: "manier2Titel", label: "Mailen — titel", type: "text" },
    { key: "manier2Tekst", label: "Mailen — tekst", type: "textarea" },
    { key: "manier3Titel", label: "WhatsApp — titel", type: "text" },
    { key: "manier3Tekst", label: "WhatsApp — tekst", type: "textarea" },
    { key: "manier3Knop", label: "WhatsApp — knoptekst", type: "text" },
    { key: "manier4Titel", label: "Gesprek plannen — titel", type: "text" },
    { key: "manier4Tekst", label: "Gesprek plannen — tekst", type: "textarea" },
    { key: "manier4Knop", label: "Gesprek plannen — knoptekst", type: "text" },
    { key: "expertKop", label: "Contactpersoon — kopje boven de naam", type: "text" },
    { key: "adresTitel", label: "Bezoekadres — titel", type: "text" },
    { key: "adresRegel", label: "Bezoekadres — regel", type: "text" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
    { key: "emailAdres", label: "Contactgegevens — e-mailadres", type: "text" },
    {
      key: "telefoonNummer",
      label: "Contactgegevens — telefoonnummer (voor de link)",
      type: "text",
      placeholder: "+31610751254",
      help: "Internationaal en zonder opmaak; hier hangen de bel- en WhatsApp-link aan.",
    },
    {
      key: "telefoonWeergave",
      label: "Contactgegevens — telefoonnummer (zoals getoond)",
      type: "text",
      placeholder: "06–10751254",
    },
  ],
  diensten: [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroTitleEnd", label: "Hero — titel (eind)", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },

    { key: "basisKicker", label: "Basisdienst — kicker", type: "text" },
    { key: "basisTitel", label: "Basisdienst — titel", type: "text" },
    { key: "basisTekst", label: "Basisdienst — tekst", type: "textarea" },
    { key: "basisRol1Label", label: "Basisdienst — rol 1: spoor", type: "text" },
    { key: "basisRol1Naam", label: "Basisdienst — rol 1: rol", type: "text" },
    { key: "basisRol1Tekst", label: "Basisdienst — rol 1: toelichting", type: "text" },
    { key: "basisRol2Label", label: "Basisdienst — rol 2: spoor", type: "text" },
    { key: "basisRol2Naam", label: "Basisdienst — rol 2: rol", type: "text" },
    { key: "basisRol2Tekst", label: "Basisdienst — rol 2: toelichting", type: "text" },
    { key: "basisRol3Label", label: "Basisdienst — rol 3: spoor", type: "text" },
    { key: "basisRol3Naam", label: "Basisdienst — rol 3: rol", type: "text" },
    { key: "basisRol3Tekst", label: "Basisdienst — rol 3: toelichting", type: "text" },
    { key: "basisRol4Label", label: "Basisdienst — rol 4: spoor", type: "text" },
    { key: "basisRol4Naam", label: "Basisdienst — rol 4: rol", type: "text" },
    { key: "basisRol4Tekst", label: "Basisdienst — rol 4: toelichting", type: "text" },
    { key: "basisPersoonRol", label: "Basisdienst — kaart: label boven de naam", type: "text" },
    { key: "basisPersoonTekst", label: "Basisdienst — kaart: tekst bij de foto", type: "textarea" },
    { key: "basisInzetLabel", label: "Basisdienst — kaart: label bij de inzet", type: "text" },
    { key: "basisInzetWaarde", label: "Basisdienst — kaart: inzet", type: "text" },
    { key: "basisPunt1", label: "Basisdienst — kaart: punt 1", type: "text" },
    { key: "basisPunt2", label: "Basisdienst — kaart: punt 2", type: "text" },
    { key: "basisPunt3", label: "Basisdienst — kaart: punt 3", type: "text" },
    { key: "basisPunt4", label: "Basisdienst — kaart: punt 4", type: "text" },
    { key: "basisCta", label: "Basisdienst — knop", type: "text" },
    { key: "basisCtaAlt", label: "Basisdienst — tweede link", type: "text" },

    { key: "instapKicker", label: "Instapdiensten — kicker", type: "text" },
    { key: "instapTitel", label: "Instapdiensten — titel", type: "text" },
    { key: "instapIntro", label: "Instapdiensten — intro", type: "textarea" },

    { key: "verdiepingKicker", label: "Verdieping — kicker", type: "text" },
    { key: "verdiepingTitel", label: "Verdieping — titel", type: "text" },
    { key: "verdiepingIntro", label: "Verdieping — intro", type: "textarea" },
    { key: "verdiepingRichtingTekst", label: "Verdieping — tekst bij 'Richting'", type: "text" },
    {
      key: "verdiepingCapaciteitTekst",
      label: "Verdieping — tekst bij 'Capaciteit'",
      type: "text",
    },

    // De vijf fasen staan niet meer op deze pagina, maar voeden wél de
    // fasenlijn op de richting-hubs (`getFaseItems` leest deze rij).
    { key: "fase1Titel", label: "Fase 1 — titel", type: "text" },
    { key: "fase1Tekst", label: "Fase 1 — tekst", type: "textarea" },
    { key: "fase2Titel", label: "Fase 2 — titel", type: "text" },
    { key: "fase2Tekst", label: "Fase 2 — tekst", type: "textarea" },
    { key: "fase3Titel", label: "Fase 3 — titel", type: "text" },
    { key: "fase3Tekst", label: "Fase 3 — tekst", type: "textarea" },
    { key: "fase4Titel", label: "Fase 4 — titel", type: "text" },
    { key: "fase4Tekst", label: "Fase 4 — tekst", type: "textarea" },
    { key: "fase5Titel", label: "Fase 5 — titel", type: "text" },
    { key: "fase5Tekst", label: "Fase 5 — tekst", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  "diensten-mendix": [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "badgeLabel", label: "Hero — badge-label", type: "text" },
    { key: "heroTitleStart", label: "Hero — titel", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "crossrefTitel", label: "Kruisverwijzing — kicker", type: "text" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  "diensten-ai": [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "badgeLabel", label: "Hero — badge-label", type: "text" },
    { key: "heroTitleStart", label: "Hero — titel", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "crossrefTitel", label: "Kruisverwijzing — kicker", type: "text" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  "diensten-strategie": [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "badgeLabel", label: "Hero — badge-label", type: "text" },
    { key: "heroTitleStart", label: "Hero — titel", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "instapTitel", label: "Lichte instap — titel", type: "text" },
    { key: "instapTekst", label: "Lichte instap — tekst", type: "textarea" },
    { key: "instapKnop", label: "Lichte instap — knoptekst", type: "text" },
    { key: "crossrefTitel", label: "Kruisverwijzing — kicker", type: "text" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  sectoren: [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "werkwijzeKicker", label: "Waarom sectorfocus — kicker", type: "text" },
    { key: "werkwijzeTitel", label: "Waarom sectorfocus — titel", type: "text" },
    { key: "wijze1Titel", label: "Reden 1 — titel", type: "text" },
    { key: "wijze1Tekst", label: "Reden 1 — tekst", type: "textarea" },
    { key: "wijze2Titel", label: "Reden 2 — titel", type: "text" },
    { key: "wijze2Tekst", label: "Reden 2 — tekst", type: "textarea" },
    { key: "wijze3Titel", label: "Reden 3 — titel", type: "text" },
    { key: "wijze3Tekst", label: "Reden 3 — tekst", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  "werken-bij": [
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "groeiKicker", label: "Groei — kicker", type: "text" },
    { key: "groeiTitel", label: "Groei — titel", type: "text" },
    { key: "groeiIntro", label: "Groei — intro", type: "textarea" },
    { key: "groei1Titel", label: "Groei 1 — titel", type: "text" },
    { key: "groei1Tekst", label: "Groei 1 — tekst", type: "textarea" },
    { key: "groei2Titel", label: "Groei 2 — titel", type: "text" },
    { key: "groei2Tekst", label: "Groei 2 — tekst", type: "textarea" },
    { key: "groei3Titel", label: "Groei 3 — titel", type: "text" },
    { key: "groei3Tekst", label: "Groei 3 — tekst", type: "textarea" },
    { key: "tpKicker", label: "Total People — kicker", type: "text" },
    { key: "tpTitel", label: "Total People — titel", type: "text" },
    { key: "tpIntro", label: "Total People — intro", type: "textarea" },
    { key: "tp1Titel", label: "Total People 1 — titel", type: "text" },
    { key: "tp1Tekst", label: "Total People 1 — tekst", type: "textarea" },
    { key: "tp2Titel", label: "Total People 2 — titel", type: "text" },
    { key: "tp2Tekst", label: "Total People 2 — tekst", type: "textarea" },
    { key: "tp3Titel", label: "Total People 3 — titel", type: "text" },
    { key: "tp3Tekst", label: "Total People 3 — tekst", type: "textarea" },
    { key: "cultuurKicker", label: "Cultuur — kicker", type: "text" },
    { key: "cultuurTitel", label: "Cultuur — titel", type: "text" },
    { key: "cultuurP", label: "Cultuur — tekst", type: "textarea" },
    { key: "cultuur1", label: "Cultuur — punt 1", type: "text" },
    { key: "cultuur2", label: "Cultuur — punt 2", type: "text" },
    { key: "cultuur3", label: "Cultuur — punt 3", type: "text" },
    { key: "cultuur4", label: "Cultuur — punt 4", type: "text" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
    { key: "geenMatchVoor", label: "Onder de vacaturelijst — aanloopzin", type: "text" },
    { key: "geenVacatures", label: "Geen vacatures open — tekst", type: "textarea" },
    { key: "openSollLink", label: "Onder de vacaturelijst — linktekst", type: "text" },
    {
      key: "belRegel",
      label: "Onder de vacaturelijst — belzin",
      type: "text",
      help: "{naam} en {telefoon} worden vervangen door de recruitmentcontactpersoon.",
    },
    { key: "openSollKop", label: "Open sollicitatie — kop", type: "text" },
    { key: "openSollIntro", label: "Open sollicitatie — intro", type: "textarea" },
    {
      key: "openSollNoot",
      label: "Open sollicitatie — regel eronder",
      type: "textarea",
      help: "{naam} wordt vervangen door de recruitmentcontactpersoon.",
    },
    { key: "cultuurFotoAlt", label: "Cultuur — alt-tekst bij de foto", type: "text" },
  ],
  "sector-detail": [
    { key: "herkenningKicker", label: "Herkenning — kicker", type: "text" },
    { key: "wieKomtKicker", label: "Wie er komt — kicker", type: "text" },
    { key: "waaromNuKicker", label: "Waarom nu — kicker", type: "text" },
    { key: "oplossingenKicker", label: "Pijn en oplossing — kicker", type: "text" },
    { key: "kolomPijnpunt", label: "Pijn en oplossing — kolom 1", type: "text" },
    { key: "kolomKost", label: "Pijn en oplossing — kolom 2", type: "text" },
    { key: "kolomOplossing", label: "Pijn en oplossing — kolom 3", type: "text" },
    { key: "kolomLaag", label: "Pijn en oplossing — kolom 4", type: "text" },
    { key: "bouwenKicker", label: "Wat we bouwen — kicker", type: "text" },
    { key: "sluitAanOpLabel", label: "Wat we bouwen — label bij de koppeling", type: "text" },
    { key: "aanpakKicker", label: "Hoe we werken — kicker", type: "text" },
    { key: "dienstenKicker", label: "Diensten — kicker", type: "text" },
    { key: "faqKicker", label: "Veelgestelde vragen — kicker", type: "text" },
    { key: "inzichtenKicker", label: "Inzichten — kicker", type: "text" },
    { key: "inzichtenTitel", label: "Inzichten — titel", type: "text" },
    { key: "inzichtenAlle", label: "Inzichten — link naar het overzicht", type: "text" },
    { key: "inzichtenMeer", label: "Inzichten — link per artikel", type: "text" },
    { key: "andereKicker", label: "Andere sectoren — kicker", type: "text" },
    { key: "teamKicker", label: "Het team — kicker", type: "text" },
    { key: "ctaPersoonLabel", label: "Slot-CTA — label boven de contactpersoon", type: "text" },
    { key: "ctaKnop", label: "Slot-CTA — eerste knop", type: "text" },
    { key: "ctaKnopTwee", label: "Slot-CTA — tweede knop", type: "text" },
  ],
  "vacature-detail": [
    { key: "knopSolliciteer", label: "Hero — eerste knop", type: "text" },
    { key: "knopWerkenBij", label: "Hero — tweede knop", type: "text" },
    { key: "recruiterRol", label: "Recruiter — rol", type: "text" },
    { key: "recruiterMail", label: "Recruiter — link naar de mail", type: "text" },
    { key: "labelTeam", label: "Kenmerken — label team", type: "text" },
    { key: "labelNiveau", label: "Kenmerken — label niveau", type: "text" },
    { key: "labelLocatie", label: "Kenmerken — label locatie", type: "text" },
    { key: "labelUren", label: "Kenmerken — label uren", type: "text" },
    { key: "labelSalaris", label: "Kenmerken — label salaris", type: "text" },
    { key: "procedureKicker", label: "Procedure — kicker", type: "text" },
    { key: "procedureTitel", label: "Procedure — titel", type: "text" },
    { key: "andereKicker", label: "Andere vacatures — kicker", type: "text" },
    { key: "andereTitel", label: "Andere vacatures — titel", type: "text" },
  ],
  klantverhalen: [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "heroKicker", label: "Hero — kicker", type: "text" },
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroTitleEnd", label: "Hero — titel (eind)", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "uitgelichtKicker", label: "Uitgelicht — kicker", type: "text" },
    { key: "beloftesKicker", label: "Sectorbeloftes — kicker", type: "text" },
    { key: "beloftesTitel", label: "Sectorbeloftes — titel", type: "text" },
    { key: "beloftesIntro", label: "Sectorbeloftes — intro", type: "textarea" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  "klantverhaal-detail": [
    { key: "uitdagingTitel", label: "Uitdaging — titel", type: "text" },
    { key: "aanpakTitel", label: "Aanpak — titel", type: "text" },
    { key: "subkopSituatie", label: "Aanpak — subkop situatie", type: "text" },
    { key: "subkopAanpak", label: "Aanpak — subkop aanpak", type: "text" },
    { key: "subkopFunctionaliteiten", label: "Aanpak — subkop functionaliteiten", type: "text" },
    { key: "subkopResultaat", label: "Aanpak — subkop resultaat", type: "text" },
    { key: "resultaatTitel", label: "Resultaat — titel", type: "text" },
    { key: "projectTitel", label: "Over dit project — titel", type: "text" },
    { key: "labelSector", label: "Over dit project — label sector", type: "text" },
    { key: "labelDiensten", label: "Over dit project — label diensten", type: "text" },
    { key: "labelDoorlooptijd", label: "Over dit project — label doorlooptijd", type: "text" },
    { key: "labelTeam", label: "Over dit project — label team", type: "text" },
    { key: "projectKnop", label: "Over dit project — knoptekst", type: "text" },
    { key: "meerKicker", label: "Meer klantverhalen — kicker", type: "text" },
    { key: "meerTitel", label: "Meer klantverhalen — titel", type: "text" },
    { key: "meerAlle", label: "Meer klantverhalen — link naar het overzicht", type: "text" },
    { key: "meerLees", label: "Meer klantverhalen — link per verhaal", type: "text" },
    { key: "ctaTitel", label: "Slot-CTA — titel", type: "text" },
  ],
  inzichten: [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "heroKicker", label: "Hero — kicker", type: "text" },
    { key: "heroTitleStart", label: "Hero — titel (begin)", type: "text" },
    { key: "heroAccent", label: "Hero — accentwoord", type: "text" },
    { key: "heroTitleEnd", label: "Hero — titel (eind)", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    { key: "leadTitel", label: "E-mailblok — titel", type: "text" },
    { key: "leadTekst", label: "E-mailblok — tekst", type: "textarea" },
    { key: "artikelLeadTitel", label: "E-mailblok onder een artikel — titel", type: "text" },
    { key: "artikelLeadTekst", label: "E-mailblok onder een artikel — tekst", type: "textarea" },
  ],
  privacy: [
    { key: "metaTitle", label: "Meta-titel", type: "text" },
    { key: "metaDescription", label: "Meta-omschrijving", type: "textarea" },
    { key: "heroTitel", label: "Hero — titel", type: "text" },
    { key: "heroLead", label: "Hero — introtekst", type: "textarea" },
    {
      key: "body",
      label: "Privacyverklaring",
      type: "richtext",
      help: "De volledige tekst. Koppen worden h2, dus begin niet met een h1.",
    },
  ],
} as const satisfies Record<string, readonly FieldDef[]>;

/**
 * Van veldschema naar type. `getPagina("home")` levert precies de sleutels van
 * de home-pagina, dus `t.mensenTitell` is een compileerfout en een veld dat uit
 * PAGE_FIELDS verdwijnt breekt de pagina die het nog leest. Dat werd hiervoor
 * met regexes over de broncode gecontroleerd in tests/unit/cms-pages.spec.ts;
 * drie van die vijf controles kunnen daardoor weg.
 */
export type PaginaSlug = keyof typeof PAGE_FIELDS;

/** Alle sleutels die deze slug kent. */
export type PaginaVeld<S extends PaginaSlug> = (typeof PAGE_FIELDS)[S][number]["key"];

type PerSlug<S extends PaginaSlug> = S extends PaginaSlug ? Record<PaginaVeld<S>, string> : never;

/**
 * Eén slug: alle velden verplicht. Een union van slugs (de richting-hubs vragen
 * `diensten-${richting}` op): alleen wat ze delen is verplicht, de rest
 * optioneel. `instapTitel` bestaat namelijk op diensten-strategie en niet op de
 * andere twee, en dat hoort het type te zeggen in plaats van string te beloven.
 */
export type PaginaTeksten<S extends PaginaSlug> = Record<keyof PerSlug<S>, string> &
  Partial<Record<PaginaVeld<S>, string>>;

/** Bekende pagina's → hun publieke pad (voor revalidatie na opslaan). */
export const PAGE_PATH = {
  home: "/",
  "over-ons": "/over-ons",
  contact: "/contact",
  diensten: "/diensten",
  "diensten-mendix": "/diensten/mendix",
  "diensten-ai": "/diensten/ai",
  "diensten-strategie": "/diensten/strategie",
  sectoren: "/sectoren",
  "sector-detail": "/sectoren",
  "werken-bij": "/werken-bij",
  "vacature-detail": "/werken-bij",
  klantverhalen: "/klantverhalen",
  "klantverhaal-detail": "/klantverhalen",
  inzichten: "/inzichten",
  privacy: "/privacy",
} satisfies Record<PaginaSlug, string>;

/** Standaardteksten per pagina (fallback op de site + startwaarde in de editor). */
export const PAGE_DEFAULTS = {
  home: {
    heroTitleStart: "Business en IT als ",
    heroAccent: "één beweging",
    heroTitleEnd: ".",
    heroLead:
      "Sectorkennis, Mendix en AI in één team, van eerste sessie tot werkende software voor de mensen die ermee werken.",
    ctaTitel: "Samen bouwen aan schaalbare groei?",
    ctaKnop: "Plan een gesprek",
    mensenKicker: "De mens centraal",
    mensenTitel: "Je werkt met mensen, niet met een leverancier.",
    mensenP1:
      "Geen anonieme delivery-machine: bij ons ken je de mensen die jouw vraagstuk oplossen. Gepassioneerde consultants en engineers die naast je team staan, van eerste sessie tot livegang en daarna. Van wekelijkse Wavetime-sessies tot onze jaarlijkse Company week, we investeren structureel in hoe we sámen werken, niet alleen in wat we opleveren.",
    dienstenKicker: "Hoe wij het doen",
    dienstenTitel: "Jouw uitdaging, drie richtingen naar de oplossing.",
    dienstenIntro:
      "Een proces dat vastloopt, een systeem dat niet meebeweegt, een koers die nog moet landen. Mendix, AI en strategie zijn de drie richtingen waarlangs we dat aanpakken. Elke richting begint met een concreet product van één dag met een vaste prijs, zodat je snel weet waar je aan toe bent.",
    sectorenKicker: "Onze sectoren",
    sectorenTitel: "Wij spreken de taal van jouw sector.",
    sectorenIntro:
      "Wij kennen de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past.",
    casesKicker: "Klantverhalen",
    casesTitel: "Business-impact, geen technische anekdote.",
    inzichtenKicker: "Inzichten & thought leadership",
    inzichtenTitel: "Sectorkennis die je helpt voorop te lopen",
    mensenP2:
      "Ons doel? Dat jouw mensen er beter van worden. Technologie is het middel, de mens is de maat.",
  },
  "over-ons": {
    heroTitleStart: "De ondernemende mens zorgt voor ",
    heroAccent: "vooruitgang",
    heroLead:
      "Wij geloven dat succesvolle verandering begint bij mensen. Daarom verzorgen wij alle randvoorwaarden voor onze Wavers, en helpen zij onze partners maximaal digitaal versnellen. Zo staat jouw organisatie klaar voor de dag van overmorgen.",
    missieTitel: "Maximale digitale impact, met de mens als maat.",
    missieP1:
      "We richtten The New Wave IT op vanuit één overtuiging: technologie is het middel, de mens is de maat. Wij zijn geen anonieme delivery-machine. Je werkt met mensen die je vraagstuk écht doorgronden, van de eerste sessie tot livegang en daarna.",
    missieP2:
      "Dat doen we door op elk project de mensen te kiezen van wie de ervaring, skills en ambitie het beste passen bij jouw vraagstuk. Ons doel? Dat elk mens werk doet dat aansluit bij zijn of haar persoonlijke doelen en drijfveren.",
    teamTitel: "Ontmoet de Wavers.",
    teamP1:
      "Geen anonieme delivery-machine: je kent de mensen die jouw vraagstuk oplossen. Senior consultants en engineers die de taal van de boardroom én de werkvloer spreken, betrokken als partner.",
    teamP2:
      "Van strategische sessies tot livegang en beheer: hetzelfde team blijft aan boord. Zo houden we vaart, kwaliteit en verantwoordelijkheid bij elkaar. Wekelijkse Wavetime-sessies en een jaarlijkse Company week: structurele investering in hoe we sámen werken.",
    ctaTitel: "Benieuwd wat onze mensen voor jouw doelen kunnen betekenen?",
    waardenKicker: "Waar wij voor staan",
    waardenTitel: "Vier overtuigingen die je terugziet in ons werk",
    waarde1Titel: "Mens centraal",
    waarde1Tekst:
      "De mens is de centrale factor in het behalen van business doelstellingen, niet de technologie zelf. Beloning is bij ons gelijk en transparant voor iedereen met dezelfde ervaring, ongeacht gender of achtergrond.",
    waarde2Titel: "Pragmatisch",
    waarde2Tekst:
      "We rekenen elke oplossing door op wat jouw vraagstuk daadwerkelijk oplost, en zeggen net zo makkelijk nee tegen een hype die dat niet doet.",
    waarde3Titel: "Autoriteit door bewijs",
    waarde3Tekst:
      "Bewezen frameworks (App Factory, OGSM, 3-Horizonsmodel) en concrete resultaten, geen losse claims.",
    waarde4Titel: "Duurzaam ondernemen",
    waarde4Tekst:
      "Ondernemen en maatschappelijke bijdrage horen bij elkaar. In 2030 is ons businessmodel 100% CO2-neutraal.",
    kpi1Getal: "2023",
    kpi1Label: "Opgericht, kantoor in Utrecht",
    kpi2Getal: "100%",
    kpi2Label: "De mens centraal, op elk project",
    kpi3Getal: "2030",
    kpi3Label: "Doel: CO2-neutraal businessmodel",
    missieFotoAlt: "Wavers in gesprek met een klant",
    teamFotoAlt: "Het team achter The New Wave IT",
    adresRegel: "Ganzenmarkt 6, 3512 GD Utrecht",
  },
  contact: {
    emailAdres: "hello@thenewwaveit.com",
    telefoonNummer: "+31610751254",
    telefoonWeergave: "06–10751254",
    heroTitleStart: "Waar kunnen we je ",
    heroAccent: "mee helpen",
    heroLead:
      "Een gesprek plannen kan, maar een korte vraag stellen mag ook gewoon. Bel, mail, app of kom langs, je zit nergens aan vast.",
    verwachtTitel: "Wat je kunt verwachten",
    verwacht1Titel: "Voorbereiding",
    verwacht1Tekst:
      "We verdiepen ons vooraf in jouw sector en organisatie, zodat het gesprek meteen de diepte in kan.",
    verwacht2Titel: "Het gesprek",
    verwacht2Tekst:
      "20 tot 45 minuten met een practice lead, afhankelijk van je vraag. Over jouw businessvraagstuk, niet over onze diensten.",
    verwacht3Titel: "Concreet vervolg",
    verwacht3Tekst:
      "Binnen drie dagen een eerste analyse met mogelijke routes, geheel vrijblijvend.",
    manierenKop: "Manieren om contact op te nemen",
    manier1Titel: "Bel ons direct",
    manier1Tekst: "Op werkdagen tussen 9 en 17 uur krijg je meteen iemand aan de lijn.",
    manier2Titel: "Stuur een mail",
    manier2Tekst: "Stel je vraag, hoe klein ook. Binnen één werkdag een reactie van een echt mens.",
    manier3Titel: "App met ons",
    manier3Tekst: "Liever appen? Stuur een berichtje via WhatsApp, we reageren snel.",
    manier3Knop: "Start een chat",
    manier4Titel: "Plan een gesprek",
    manier4Tekst:
      "20 tot 45 minuten met een practice lead, afhankelijk van je vraag. Vrijblijvend en zonder verkooppraatje.",
    manier4Knop: "Plan het gesprek",
    expertKop: "Je spreekt met o.a.",
    adresTitel: "Bezoekadres",
    adresRegel: "Ganzenmarkt 6, Utrecht. Koffie staat klaar",
    ctaTitel: "Liever eerst zien wat we voor anderen deden?",
  },
  diensten: {
    heroTitleStart: "Mensen die meebouwen, of ",
    heroAccent: "een dienst met vaste scope",
    heroTitleEnd: ".",
    heroLead:
      "Onze basis is capaciteit: consultants die in jouw team meebouwen aan Mendix en AI. Wil je eerst richting, snelheid of een fundering, dan hebben we daar afgebakende diensten voor, met een vaste scope en een prijs vooraf.",

    basisKicker: "Onze basisdienstverlening · doorlopend",
    basisTitel: "Consultant inhuren",
    basisTekst:
      "Waar de meeste van onze samenwerkingen beginnen en eindigen: een consultant die naast je team komt staan en meebouwt. Aan een Mendix-applicatie, aan AI in je processen, of aan allebei, want in de praktijk loopt dat door elkaar heen. Heb je op dat niveau iemand nodig die de richting bewaakt, dan schuift er een strategisch adviseur aan. Je huurt geen uren in, je haalt iemand binnen die je landschap leert kennen en kennis achterlaat.",
    basisRol1Label: "Mendix",
    basisRol1Naam: "Developer & lead",
    basisRol1Tekst: "Bouwt mee in je bestaande teams of zet er een op.",
    basisRol2Label: "AI",
    basisRol2Naam: "AI-engineer",
    basisRol2Tekst: "Van pilot naar productie, binnen jouw kaders.",
    basisRol3Label: "Business",
    basisRol3Naam: "Analist & product owner",
    basisRol3Tekst: "Vertaalt het proces naar wat er gebouwd moet worden.",
    basisRol4Label: "Strategie",
    basisRol4Naam: "Strategisch adviseur",
    basisRol4Tekst: "Bewaakt richting, portfolio en businesscase.",
    basisPersoonRol: "Jouw aanspreekpunt",
    basisPersoonTekst:
      "Je maakt vooraf kennis met de persoon zelf, niet met een cv uit een bestand.",
    basisInzetLabel: "Inzet",
    basisInzetWaarde: "Vanaf één dag per week",
    basisPunt1: "Detachering of projectbasis, zonder minimumtermijn van een jaar",
    basisPunt2: "Vaste consultants, geen wisselende gezichten",
    basisPunt3: "Kennisoverdracht is onderdeel van de opdracht",
    basisPunt4: "Tarief stemmen we af op rol, seniority en inzet",
    basisCta: "Bespreek je capaciteitsvraag",
    basisCtaAlt: "Bekijk wie er bij ons werken →",

    instapKicker: "Begin hier",
    instapTitel: "Of begin met één dag",
    instapIntro:
      "Wil je liever eerst zien wat het oplevert voordat je mensen inhuurt? Dan starten we met een dag. Aan het eind ligt er iets werkends waar je intern mee verder kunt, zonder vervolgverplichting.",

    verdiepingKicker: "Verder in het traject",
    verdiepingTitel: "Zes diensten voor als je al onderweg bent",
    verdiepingIntro:
      "Niet nodig om nu te kiezen: ze komen meestal pas aan de orde als de eerste app draait of het team groeit. Voor de volledigheid staan ze hier wel.",
    verdiepingRichtingTekst: "Voor als je al bouwt en wilt weten of je de goede kant op schaalt.",
    verdiepingCapaciteitTekst:
      "Als je van één app naar een portfolio wilt en je eigen mensen het moeten dragen.",

    fase1Titel: "De strategische basis",
    fase1Tekst:
      "IT-strategie sluit nog niet aan op de bedrijfsdoelen. Er is ambitie maar geen richting.",
    fase2Titel: "Van visie naar eerste resultaten",
    fase2Tekst:
      "Er moet snel zichtbare waarde komen om draagvlak te krijgen. Het team moet gaan draaien.",
    fase3Titel: "Structureren en professionaliseren",
    fase3Tekst:
      "De eerste resultaten staan. Nu moet het beheersbaar, herhaalbaar en overdraagbaar worden.",
    fase4Titel: "Schalen en innoveren",
    fase4Tekst:
      "Meerdere teams, meerdere business units, een groeiend portfolio aan apps en agents.",
    fase5Titel: "Continu evalueren",
    fase5Tekst: "De vraag van de CIO: wat levert het platform op, en waar zit de volgende winst?",
    ctaTitel: "Niet zeker welke dienst bij jouw vraagstuk past?",
  },
  "diensten-mendix": {
    metaTitle: "Mendix: van App in a Day tot Fusion Team",
    metaDescription:
      "Drie diensten om met Mendix te starten of op te schalen: App in a Day, de Mendix Scale Sessie en de Fusion Team Startsprint.",
    badgeLabel: "Mendix",
    heroTitleStart: "Van eerste app tot schaalbaar platform.",
    heroLead:
      "Drie diensten, van een dag tot een traject: begin met een werkende app, bepaal je richting met een Scale Sessie, of bouw capaciteit op met een Fusion Team.",
    crossrefTitel: "Ook relevant vanuit Mendix",
    ctaTitel: "Welke stap past bij jouw Mendix-landschap?",
  },
  "diensten-ai": {
    metaTitle: "AI: van AI Agent in a Day tot de Opportunity Scan",
    metaDescription:
      "Twee diensten om met AI te starten: de AI Agent in a Day-workshop en de AI Opportunity Scan om de grootste kansen te prioriteren.",
    badgeLabel: "AI",
    heroTitleStart: "Van eerste agent tot geprioriteerde kansen.",
    heroLead:
      "Twee diensten: bouw in één dag je eerste werkende agent, of breng in een halve dag in kaart waar AI bij jullie geld oplevert.",
    crossrefTitel: "Ook relevant vanuit AI",
    ctaTitel: "Welke stap past bij jullie AI-ambitie?",
  },
  "diensten-strategie": {
    metaTitle: "Strategie: van AI-strategie tot IT-strategie op low-code en AI",
    metaDescription:
      "Twee diensten om koers te bepalen: AI-strategie voor de directie en IT-strategie op low-code en AI voor de CIO.",
    badgeLabel: "Strategie",
    heroTitleStart: "Van eerste koers tot uitvoerbare roadmap.",
    heroLead:
      "Twee diensten voor twee vragen: waar verandert AI ons verdienmodel (directie), en waar past low-code in ons landschap (CIO).",
    instapTitel: "Nog aan het oriënteren?",
    instapTekst:
      "Begin met een korte, vrijblijvende kennismaking van twintig minuten. Geen verplichtingen, wel een eerlijk beeld van waar je staat.",
    instapKnop: "Plan een kennismaking (20 min)",
    crossrefTitel: "Ook relevant vanuit Strategie",
    ctaTitel: "Klaar om koers te bepalen?",
  },
  sectoren: {
    heroTitleStart: "Wij spreken de taal van ",
    heroAccent: "jouw sector",
    heroLead:
      "Wij kiezen bewust voor vijf sectoren in plaats van generiek IT-advies: publieke sector, mobiliteit, banken, zorg en manufacturing. In elke sector kennen we de regels, de systemen en de druk waaronder jouw organisatie werkt. Daardoor leveren we sneller iets dat écht past, in plaats van een generieke oplossing die overal een beetje werkt.",
    werkwijzeKicker: "Waarom sectorfocus",
    werkwijzeTitel: "Wat sectorkennis je oplevert",
    wijze1Titel: "Geen inwerktijd",
    wijze1Tekst:
      "We kennen de wetgeving, ketens en kernsystemen van jouw markt. Het eerste gesprek gaat meteen over jouw vraagstuk.",
    wijze2Titel: "Bewezen patronen",
    wijze2Tekst:
      "Oplossingen die zich in jouw sector al bewezen hebben, vertalen we naar jouw organisatie, sneller live, minder risico.",
    wijze3Titel: "Netwerk dat meedenkt",
    wijze3Tekst:
      "Via onze partners en klanten in de sector leer je van organisaties die hetzelfde vraagstuk al oplosten.",
    ctaTitel: "Benieuwd wat dit voor jouw organisatie betekent?",
  },
  "werken-bij": {
    heroTitleStart: "Word een ",
    heroAccent: "Waver",
    heroLead:
      "Het is onze droom dat elk mens werk doet dat aansluit bij persoonlijke doelen en drijfveren. Wij verzorgen de randvoorwaarden: een gelijk speelveld, een open cultuur en alle ruimte om te groeien. Jij zorgt voor de versnelling bij onze partners.",
    ctaTitel: "Eerst een kop koffie? Kom kennismaken.",
    groeiKicker: "Groei & ontwikkeling",
    groeiTitel: "Elke dag samen beter worden",
    groeiIntro:
      "Persoonlijke aandacht en focus op groei zijn de kern. Samen verkennen we meerdere routes naar jouw ambitie en kiezen we de best passende weg.",
    groei1Titel: "Persoonlijk groeipad",
    groei1Tekst:
      "Jouw route bestaat uit activiteiten on-the-job, cursussen en trainingen, gekozen op basis van jouw ambitie, niet een standaardlijstje.",
    groei2Titel: "Open feedbackcultuur",
    groei2Tekst:
      "Regelmatige, open en eerlijke feedback hoort bij onze cultuur. Elk half jaar haal je bovendien 360°-feedback op uit je omgeving.",
    groei3Titel: "Learning week",
    groei3Tekst:
      "Jaarlijks trekken we er met z'n allen een volle week op uit om samen te ontwikkelen: vakinhoudelijk én persoonlijk.",
    tpKicker: "Total People",
    tpTitel: "Presteren, groeien én ontspannen",
    tpIntro:
      "Bij ons staat het Total People-principe centraal: de balans tussen presteren, groeien en ontspannen. Jouw groei is onze groei.",
    tp1Titel: "Presteren",
    tp1Tekst:
      "Uitdagende opdrachten bij partners in de publieke sector, mobiliteit, banken, zorg en manufacturing. Een rol op maat die jij zelf kiest.",
    tp2Titel: "Groeien",
    tp2Tekst:
      "Zeggenschap over de koers: je beslist mee over strategie en investeringen van onze organisatie. Plus een persoonlijk groeipad met open feedback.",
    tp3Titel: "Ontspannen",
    tp3Tekst:
      "Werk dat aansluit bij jouw doelen en drijfveren, met ruimte voor rust. Duurzaam onderweg in een elektrische auto van de zaak.",
    cultuurKicker: "Onze cultuur",
    cultuurTitel: "Ondernemende mensen, gelijk speelveld.",
    cultuurP:
      "Je werkt hier niet vóór ons, je werkt mét ons. Gepassioneerde consultants en engineers die naast klantteams staan en zelf ruimte krijgen om te groeien naar expertrollen.",
    cultuur1: "Persoonlijk groeipad, geen vaste carrièreladder",
    cultuur2: "Wavetime en Company week als vaste cultuurrituelen",
    cultuur3:
      "Werken met bewezen frameworks (App Factory, OGSM, App in a Day) in plaats van losse projecten",
    cultuur4: "Gelijke, transparante beloning bij gelijke ervaring, ongeacht gender of achtergrond",
    geenMatchVoor: "Staat jouw rol er niet tussen?",
    geenVacatures:
      "Op dit moment staan er geen vacatures open. We spreken sowieso graag met Mendix- en AI-consultants die bij ons passen.",
    openSollLink: "Stuur hieronder een open sollicitatie",
    belRegel: "of bel {naam}: {telefoon}.",
    openSollKop: "Open sollicitatie",
    openSollIntro:
      "Geen passende vacature? Laat je gegevens achter, we kijken graag of er een match is.",
    openSollNoot:
      "Na je sollicitatie neemt {naam} binnen twee werkdagen contact op. Een echt mens, geen automatische afwijzing.",
    cultuurFotoAlt: "Wavers tijdens een kennissessie",
  },
  "sector-detail": {
    herkenningKicker: "Herkenning",
    wieKomtKicker: "Wie er komt",
    waaromNuKicker: "Waarom nu",
    oplossingenKicker: "Pijn → oplossing",
    kolomPijnpunt: "Pijnpunt",
    kolomKost: "Wat het kost",
    kolomOplossing: "Onze oplossing",
    kolomLaag: "Laag",
    bouwenKicker: "Wat we bouwen",
    sluitAanOpLabel: "Sluit aan op:",
    aanpakKicker: "Hoe we werken",
    dienstenKicker: "Diensten",
    faqKicker: "Veelgestelde vragen",
    inzichtenKicker: "Inzichten",
    inzichtenTitel: "Kennis uit deze sector",
    inzichtenAlle: "Alle inzichten",
    inzichtenMeer: "Lees meer",
    andereKicker: "Andere sectoren",
    teamKicker: "Het team",
    ctaPersoonLabel: "Wie je spreekt",
    ctaKnop: "Plan een gesprek",
    ctaKnopTwee: "Bekijk onze aanpak",
  },
  "vacature-detail": {
    knopSolliciteer: "Solliciteer direct",
    knopWerkenBij: "Ontdek werken bij",
    recruiterRol: "Recruiter",
    recruiterMail: "Mail",
    labelTeam: "Team",
    labelNiveau: "Niveau",
    labelLocatie: "Locatie",
    labelUren: "Uren",
    labelSalaris: "Salaris",
    procedureKicker: "Zo solliciteer je",
    procedureTitel: "Vier stappen, twee weken",
    andereKicker: "Andere vacatures",
    andereTitel: "Ook op zoek naar…",
  },
  klantverhalen: {
    metaTitle: "Klantverhalen: resultaat dat je kunt navragen",
    metaDescription:
      "Verhalen van organisaties in de publieke sector, mobiliteit, banken, zorg en manufacturing, verteld met de cijfers erbij.",
    heroKicker: "Klantverhalen",
    heroTitleStart: "Resultaat dat je kunt ",
    heroAccent: "navragen",
    heroTitleEnd: ".",
    heroLead:
      "Business-impact, geen technische anekdote. Hier laten we zien wat er daadwerkelijk verandert bij een klant als strategie, Mendix en AI samenkomen: minder handwerk, snellere processen, meetbaar resultaat.",
    uitgelichtKicker: "Uitgelicht",
    beloftesKicker: "Onze sectoren",
    beloftesTitel: "Nog geen klantverhaal in jouw sector? Dit is wat je kunt verwachten.",
    beloftesIntro:
      "We werken pas kort genoeg samen met organisaties als Moove om al hun verhaal te kunnen delen. De rest volgt. Hieronder alvast het type resultaat dat we per sector al aantoonbaar leveren.",
    ctaTitel: "Herken je jouw vraagstuk in deze verhalen?",
  },
  "klantverhaal-detail": {
    uitdagingTitel: "De uitdaging",
    aanpakTitel: "De aanpak",
    subkopSituatie: "Situatie & uitdaging",
    subkopAanpak: "Onze aanpak",
    subkopFunctionaliteiten: "De functionaliteiten",
    subkopResultaat: "Resultaat",
    resultaatTitel: "Het resultaat",
    projectTitel: "Over dit project",
    labelSector: "Sector",
    labelDiensten: "Diensten",
    labelDoorlooptijd: "Doorlooptijd",
    labelTeam: "Team",
    projectKnop: "Vergelijkbaar vraagstuk?",
    meerKicker: "Meer klantverhalen",
    meerTitel: "Resultaten in andere sectoren",
    meerAlle: "Alle verhalen",
    meerLees: "Lees het verhaal",
    ctaTitel: "Herken je dit vraagstuk in jouw organisatie?",
  },
  inzichten: {
    metaTitle: "Inzichten: kennis die je morgen kunt gebruiken",
    metaDescription:
      "Praktische artikelen over Mendix, AI en digitale strategie, geschreven vanuit de vraagstukken van onze vijf sectoren, zonder jargon.",
    heroKicker: "Inzichten",
    heroTitleStart: "Kennis die je ",
    heroAccent: "morgen",
    heroTitleEnd: " kunt gebruiken.",
    heroLead:
      "Sectorkennis die je vooruit denkt. Praktijkervaring uit projecten bij gemeenten, banken, zorginstellingen en mobiliteitsbedrijven, vertaald naar artikelen die je direct kan gebruiken, geen gerecycled nieuws.",
    leadTitel: "Blijf voorop met onze inzichten",
    leadTekst:
      "Eén mail per maand met onze scherpste inzichten over technologie in jouw sector. Geen sales, uitschrijven kan altijd.",
    artikelLeadTitel: "Dit soort inzichten, één keer per maand",
    artikelLeadTekst:
      "Laat je e-mail achter en ontvang onze scherpste inzichten over technologie in jouw sector. Geen sales, uitschrijven kan altijd.",
  },
  privacy: {
    metaTitle: "Privacybeleid",
    metaDescription:
      "Hoe The New Wave IT B.V. persoonsgegevens verzamelt, gebruikt, deelt en beschermt in overeenstemming met de AVG.",
    heroTitel: "Privacy Policy",
    heroLead:
      "Hoe wij persoonsgegevens verzamelen, gebruiken, delen en beschermen in relatie tot onze website, in overeenstemming met de AVG.",
    body: `<p>Dit is de Privacy Policy van The New Wave IT B.V. (hierna te noemen “The New Wave IT”, “wij,” “ons” of “onze”), statutair gevestigd op Havixhorst 100, Alphen aan den Rijn en ingeschreven bij de Kamer van Koophandel onder nummer 90830490. Ons kantoor bezoek je op Ganzenmarkt 6, Utrecht. Deze Privacy Policy legt uit hoe wij gegevens verzamelen, gebruiken, delen en beschermen in relatie tot onze website <a href="https://www.thenewwaveit.com">http://www.thenewwaveit.com</a> (de “Website”). Wij verzamelen deze gegevens wanneer je onze Website bezoekt met je computer, tablet, telefoon of smartwatch (“Computer”). Wij verwerken persoonsgegevens op een manier welke in overeenstemming is met de Algemene Verordening Gegevensbescherming, inclusief uitvoeringswet van deze verordening, of de voorafgaande wetgeving van de Wet Bescherming Persoonsgegevens en eventuele toekomstige wijzigingen (de “AVG”), de telecommunicatiewet en de andere op dit moment geldende privacywetgeving.</p>
<p>Door onze Website te gebruiken begrijp je en ga je akkoord met het verzamelen en gebruiken van informatie in overeenstemming met deze Privacy Policy. Onze Privacy Policy is van toepassing op alle bezoekers, gebruikers en alle anderen die de toegang hebben tot de Website (“Gebruikers”).</p>
<h2>Wat voor gegevens verzamelen wij?</h2>
<p>Wij verzamelen persoonsgegevens die je ons verstrekt. Een persoonsgegeven betreft informatie over een geïdentificeerde of identificeerbare natuurlijke persoon. Denk daarbij aan de volgende gegevens:</p>
<ul><li>Communicatie tussen The New Wave IT en jou (wij mogen je dienst-gerelateerde e-mails sturen).</li></ul>
<h2>Log file informatie</h2>
<p>Wij verzamelen alleen informatie die je browser stuurt als je onze Website bezoekt wanneer dit noodzakelijk is voor het goed functioneren van de Website. Onder het goed functioneren van de Website verstaan wij met name het beschermen van de Website tegen handelingen die de veiligheid van de Website en van je Computer in gevaar kunnen brengen. Dit logbestand kan informatie bevatten zoals je IP-adres, browser-type, browser-versie, de pagina’s van onze Website die je bezoekt, de tijd en datum van je bezoek, de tijd die je op deze pagina’s doorbrengt en andere statistieken.</p>
<h2>Analytische diensten</h2>
<p>Wij maken gebruik van analytische diensten van derden. Deze helpen ons om ons verkeer en trends van de Website te meten. De tools verzamelen informatie die je Computer verstuurt: onze Website, de webpagina’s die je bezoekt, add-ons en andere informatie die ons helpt de Website te verbeteren. Deze tools gebruiken ‘cookies’. Dat zijn eenvoudige tekstbestanden op je harde schijf of in het geheugen van je Computer. Ze kunnen je Computer of de bestanden die erop staan niet beschadigen, en verzamelen anoniem informatie over je log-informatie en log-gedrag. Wij gebruiken deze informatie samen met informatie van andere Gebruikers. Daardoor kunnen wij je niet als individu herkennen. Wij gebruiken voor onze analytische diensten Google Analytics. Google Analytics plaatst een permanent cookie in je webbrowser om je te herkennen, en deelt je gegevens met Google. Wij delen alleen gegevens met Google die wij op basis van de AVG mogen delen met Google. Je voorkomt die herkenning volledig door de cookies in je browser uit te schakelen.</p>
<h2>Doeleinden verwerking gegevens</h2>
<p>Door onze diensten te gebruiken laat je bepaalde gegevens bij ons achter, bijvoorbeeld door het aanmaken van een account. Het kan dan gaan om gegevens zoals naam, e-mailadres, woonplaats, telefoonnummer en betaalgegevens. The New Wave IT verzamelt en verwerkt deze gegevens om onze diensten toegankelijk te maken. Wij verzamelen ook informatie over je Computer (zoals IP-adres, browsertype en besturingssysteem), zodat wij onze diensten kunnen verbeteren. Wij geven de persoonsgegevens niet aan derden, tenzij de wet- en regelgeving ons daartoe verplicht.</p>
<h2>Rechtsgrond verwerking gegevens</h2>
<p>Er zijn meerdere grondslagen op basis waarvan The New Wave IT persoonsgegevens kan verwerken. Dit zijn: de uitvoering van een overeenkomst, het gerechtvaardigd belang, op grond van een wettelijke verplichting of op grond van jouw toestemming. We verwerken je persoonsgegevens alleen voor zover dat nodig is om het doel te behalen waarvoor we ze verzamelen.</p>
<h2>Hoe gebruiken wij deze informatie?</h2>
<p>Alle informatie die wij verzamelen gebruiken wij om onze Website te ondersteunen en verbeteren.</p>
<h2>Hoe delen wij deze informatie?</h2>
<p>Wij verhuren of verkopen je (persoons)gegevens niet aan derden.</p>
<h2>Zeggenschapswijziging</h2>
<p>Wanneer The New Wave IT of een deel daarvan wordt verkocht of overgedragen, of activa van ons bij een andere organisatie terechtkomen (bijvoorbeeld als gevolg van een fusie, overname, faillissement, ontbinding of liquidatie), dan kunnen gegevens die via de Website zijn verzameld onder de verkochte of overgedragen zaken vallen. De koper of verkrijger zal de afspraken in deze Privacy Policy moeten opvolgen.</p>
<h2>Wettelijk verzoek en voorkoming schade</h2>
<p>Op grond van een wettelijk verzoek mogen wij toegang krijgen tot je informatie en die bewaren en/of delen in antwoord op zo’n verzoek (zoals een huiszoekingsbevel, gerechtelijk bevel of een dagvaarding). Wij mogen je informatie ook bewaren en/of delen wanneer wij denken dat dat nodig is om fraude of andere illegale activiteiten op te sporen, te voorkomen en aan te kaarten, en om ons, jou en anderen te beschermen. Informatie die wij over je ontvangen mogen wij openen, bewerken en langer bewaren wanneer dat nodig is vanwege een juridisch verzoek of verplichting, een onderzoek naar onze voorwaarden of beleid, of om anderszins schade te voorkomen.</p>
<h2>Beveiliging</h2>
<p>The New Wave IT heeft passende technische en organisatorische maatregelen genomen om je gegevens te beveiligen tegen verlies of tegen enige vorm van onrechtmatige verwerking. Die maatregelen beveiligen de informatie die via de Website binnenkomt. Toch kan The New Wave IT niet garanderen dat niemand de informatie op de Website opent, onthult, verandert of vernietigt. Je beheert zelf de e-mails tussen jou en The New Wave IT. Wij zijn niet verantwoordelijk voor de functionaliteit, privacy of veiligheidsmaatregelen van enige andere organisatie.</p>
<h2>Internationale overdracht</h2>
<p>Je informatie kan terechtkomen op computers of servers buiten Nederland en/of de EU, waar andere wetten over gegevensbescherming gelden. Wij spannen ons in om je persoonsgegevens ook buiten de EU juridisch juist en zorgvuldig te laten verwerken.</p>
<h2>Bewaartermijn</h2>
<p>In overeenstemming met de AVG en de overige relevante wetgeving, bewaart The New Wave IT persoonsgegevens niet langer dan noodzakelijk is voor de verwezenlijking van de doeleinden waarvoor wij ze verzamelen of verwerken, tenzij een wettelijke bepaling ons tot langer bewaren verplicht. Wil je weten hoelang wij jouw persoonsgegevens precies bewaren, neem dan contact op via <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a>.</p>
<h2>Recht op inzage, correcties, recht op bezwaar en recht op dataportabiliteit</h2>
<p>Wil je je persoonsgegevens inzien, wijzigen of verwijderen, of wil je ze geheel of gedeeltelijk laten overdragen aan jezelf of aan een derde? Neem dan contact op met The New Wave IT via <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a> of een brief sturen aan:</p>
<address>The New Wave IT B.V.<br>Havixhorst 100<br>2402 MT, Alphen aan den Rijn</address>
<h2>Applicaties, websites en diensten van derden</h2>
<p>Wij zijn niet verantwoordelijk voor de praktijken van applicaties, websites of services van derden die gelinkt zijn naar of van onze Website, waaronder de informatie of inhoud die bijgaand is. Onze Privacy Policy geldt niet zodra je via een link van onze Website naar een andere applicatie, website of service gaat. Wat je daar doet valt onder de regels en het beleid van die derde, ook als de link op onze Website stond.</p>
<h2>Privacy van kinderen</h2>
<p>Onze Website vraagt niet specifiek en bewust om gegevens van personen jonger dan 16 jaar (“Kinderen”). Deze leeftijd kan variëren in elke Lidstaat tussen de leeftijd van 13 en 16 jaar. Komen wij erachter dat wij persoonsgegevens van Kinderen hebben verzameld zonder toestemming van hun ouder of voogd, dan verwijderen wij die gegevens van onze servers. Vermoed je dat je kind zonder jouw toestemming persoonsgegevens aan ons heeft verstrekt, neem dan contact op via <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a>.</p>
<h2>Wijzigingen</h2>
<p>The New Wave IT kan deze Privacy Policy van tijd tot tijd aanpassen. Raadpleeg hem daarom regelmatig. Een aanpassing treedt in werking op het moment dat wij hem op deze pagina publiceren.</p>
<h2>Contact</h2>
<p>Heb je vragen over deze Privacy Policy? Neem dan contact op met The New Wave IT via <a href="mailto:hello@thenewwaveit.com">hello@thenewwaveit.com</a>.</p>`,
  },
} satisfies { [S in PaginaSlug]: Record<PaginaVeld<S>, string> };

/**
 * De admin kent de slug pas op runtime (uit de URL), dus daar kan het niet
 * getypeerd. Eén plek met die verbreding in plaats van een cast op elke
 * aanroep.
 */
export function paginaVelden(slug: string): readonly FieldDef[] | undefined {
  return (PAGE_FIELDS as Record<string, readonly FieldDef[] | undefined>)[slug];
}

export function paginaStandaard(slug: string): Record<string, string> | undefined {
  return (PAGE_DEFAULTS as Record<string, Record<string, string> | undefined>)[slug];
}

export function paginaPad(slug: string): string | undefined {
  return (PAGE_PATH as Record<string, string | undefined>)[slug];
}
