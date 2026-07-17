/** Client-veilige types + constanten voor inzendingen (geen server-only). */

export interface Lead {
  id: string;
  created_at: string;
  naam: string;
  email: string;
  bedrijf: string | null;
  onderwerp: string | null;
  bericht: string;
  type: string;
  status: string; // nieuw | in_behandeling | afgerond
  toegewezen_aan: string | null;
  interne_notitie: string | null;
}

export interface Sollicitatie {
  id: string;
  created_at: string;
  vacature_slug: string;
  naam: string;
  email: string;
  telefoon: string | null;
  motivatie: string | null;
  cv_url: string | null;
  status: string; // nieuw | screening | gesprek | afgerond
  interne_notitie: string | null;
}

export const LEAD_STATUSSEN = ["nieuw", "in_behandeling", "afgerond"] as const;
export const SOL_STATUSSEN = ["nieuw", "screening", "gesprek", "afgerond"] as const;

export const STATUS_LABEL: Record<string, string> = {
  nieuw: "Nieuw",
  in_behandeling: "In behandeling",
  screening: "Screening",
  gesprek: "Gesprek",
  afgerond: "Afgerond",
};
