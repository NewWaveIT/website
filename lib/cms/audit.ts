import "server-only";

import { createClient } from "@/lib/supabase/server";

export type AuditActie = "aangemaakt" | "bijgewerkt" | "verwijderd" | "gesynchroniseerd";

export interface AuditRow {
  id: string;
  tijdstip: string;
  gebruiker_email: string | null;
  gebruiker_naam: string | null;
  actie: AuditActie;
  content_type: string;
  slug: string | null;
  titel: string | null;
}

export interface AuditEntry {
  gebruiker_email: string | null;
  gebruiker_naam: string | null;
  actie: AuditActie;
  content_type: string;
  slug: string | null;
  titel: string | null;
}

/** Schrijft één activiteitregel. Best-effort: blokkeert nooit het opslaan. */
export async function logAudit(entry: AuditEntry): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.from("cms_audit").insert(entry);
  } catch {
    // audit is aanvullend; fouten (bv. tabel bestaat nog niet) negeren.
  }
}

/** Laatste activiteit, nieuwste eerst. Faalt stil (leeg) zonder tabel/Supabase. */
export async function listAudit(limit = 100): Promise<AuditRow[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("cms_audit")
      .select("*")
      .order("tijdstip", { ascending: false })
      .limit(limit);
    return (data as AuditRow[]) ?? [];
  } catch {
    return [];
  }
}
