import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Lead, Sollicitatie } from "@/lib/cms/inzendingen-types";

export type { Lead, Sollicitatie } from "@/lib/cms/inzendingen-types";
export { LEAD_STATUSSEN, SOL_STATUSSEN, STATUS_LABEL } from "@/lib/cms/inzendingen-types";

/**
 * Waarom een kolomlijst en een limiet, en niet `select("*")`.
 *
 * Beide borden tekenen elke rij als kaartje en houden de hele lijst in
 * clientstate. `*` haalt daar ook kolommen bij op die het bord nooit toont —
 * en zodra iemand een kolom aan de tabel toevoegt, staat die er ongevraagd
 * bij. De limiet is de tweede helft: zonder plafond groeit de eerste render
 * van /admin/aanvragen mee met elk contactformulier dat ooit is ingevuld.
 * Duizend is ruim boven wat een bord leesbaar houdt; wie verder terug moet,
 * moet gaan zoeken, niet scrollen.
 */
const MAX_RIJEN = 1000;

const LEAD_KOLOMMEN =
  "id, created_at, naam, email, bedrijf, onderwerp, bericht, type, status, toegewezen_aan, interne_notitie";

const SOLLICITATIE_KOLOMMEN =
  "id, created_at, vacature_slug, naam, email, telefoon, motivatie, motivatie_url, link_url, cv_url, status, interne_notitie";

export async function getLeads(): Promise<Lead[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("contact_aanvragen")
      .select(LEAD_KOLOMMEN)
      .order("created_at", { ascending: false })
      .limit(MAX_RIJEN);
    return (data as unknown as Lead[]) ?? [];
  } catch {
    return [];
  }
}

export async function getSollicitaties(): Promise<Sollicitatie[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("sollicitaties")
      .select(SOLLICITATIE_KOLOMMEN)
      .order("created_at", { ascending: false })
      .limit(MAX_RIJEN);
    return (data as unknown as Sollicitatie[]) ?? [];
  } catch {
    return [];
  }
}
