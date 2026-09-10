/**
 * De vorm van het dienstenaanbod: drie families (tegelijk de drie niveaus van
 * de ladder) en drie richtingen. Geen content — dit verandert alleen als het
 * aanbod fundamenteel anders wordt, en het staat daarom niet in het CMS.
 *
 * Apart van `lib/services.ts` omdat clientcomponenten deze constanten nodig
 * hebben (het contactformulier groepeert de keuzelijst op familie, de matrix
 * rendert de kolomkoppen). Zou het in hetzelfde bestand staan, dan sleept elke
 * waarde-import de negen dienstbeschrijvingen mee de browser in — dat gebeurde
 * ook: een chunk van 24 KB met de seed-teksten, terwijl de bezoeker de
 * CMS-versie hoort te zien.
 */

export type ServiceFamilie = "doen" | "richting" | "capaciteit";
export type ServiceRichting = "mendix" | "ai" | "strategie";

export interface ServicePrijs {
  label: string;
  /** Toelichting op de prijs, bv. "dagdeel" of "exclusief licenties". */
  variant?: string;
}

/**
 * De drie families zijn tegelijk de drie niveaus van de ladder: je begint altijd
 * bij het instapniveau (één dag, vaste prijs) en schaalt op wanneer dat werkt.
 */
export const SERVICE_FAMILIES: {
  key: ServiceFamilie;
  niveau: number;
  label: string;
  kicker: string;
}[] = [
  { key: "doen", niveau: 1, label: "Instap", kicker: "Doen in één dag" },
  { key: "richting", niveau: 2, label: "Richting", kicker: "Richting bepalen" },
  { key: "capaciteit", niveau: 3, label: "Capaciteit", kicker: "Capaciteit opbouwen" },
];

/**
 * De basisdienst staat naast de catalogus, niet erin: capaciteit is doorlopend
 * en heeft geen vaste scope of prijs, terwijl de negen catalogusdiensten dat
 * juist wel hebben. Overzichten filteren hem er daarom uit; `/diensten` geeft
 * hem een eigen sectie bovenaan.
 */
export const BASIS_SLUG = "consultant-inhuren";

/** De drie richtingen als kolommen van de keuzematrix, in vaste volgorde. */
export const RICHTINGEN: { key: ServiceRichting; naam: string; href: string }[] = [
  { key: "mendix", naam: "Mendix", href: "/diensten/mendix" },
  { key: "ai", naam: "AI", href: "/diensten/ai" },
  { key: "strategie", naam: "Strategie", href: "/diensten/strategie" },
];
