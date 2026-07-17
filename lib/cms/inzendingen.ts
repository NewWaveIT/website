import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Lead, Sollicitatie } from "@/lib/cms/inzendingen-types";

export type { Lead, Sollicitatie } from "@/lib/cms/inzendingen-types";
export { LEAD_STATUSSEN, SOL_STATUSSEN, STATUS_LABEL } from "@/lib/cms/inzendingen-types";

export async function getLeads(): Promise<Lead[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("contact_aanvragen")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Lead[]) ?? [];
  } catch {
    return [];
  }
}

export async function getSollicitaties(): Promise<Sollicitatie[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("sollicitaties")
      .select("*")
      .order("created_at", { ascending: false });
    return (data as Sollicitatie[]) ?? [];
  } catch {
    return [];
  }
}
