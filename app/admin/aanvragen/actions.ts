"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/dal";

export async function updateLead(
  id: string,
  patch: { status?: string; toegewezen_aan?: string | null; interne_notitie?: string | null },
): Promise<{ ok: boolean }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false };
  const supabase = await createClient();
  // `.select()` erbij: zonder passende RLS-policy raakt een update 0 rijen zónder
  // fout. Alleen op `error` vertrouwen zou zo'n stille mislukking als succes melden.
  const { data, error } = await supabase
    .from("contact_aanvragen")
    .update(patch)
    .eq("id", id)
    .select("id");
  if (error || !data?.length) return { ok: false };
  revalidatePath("/admin/aanvragen");
  revalidatePath("/admin");
  return { ok: true };
}

/**
 * Verwijdert een aanvraag definitief.
 *
 * `.select()` om dezelfde reden als bij de update hierboven: zonder passende
 * RLS-policy raakt een delete 0 rijen zónder fout, en dan zou de admin een
 * bevestiging zien voor iets dat niet gebeurd is. De policy zelf staat in
 * supabase/migrations/20260914140000_verwijder-inzendingen.sql.
 */
export async function deleteLead(id: string): Promise<{ ok: boolean; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "Niet ingelogd." };
  if (!id) return { ok: false, error: "Geen aanvraag opgegeven." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_aanvragen")
    .delete()
    .eq("id", id)
    .select("id");
  if (error) return { ok: false, error: error.message };
  if (!data?.length) return { ok: false, error: "Niet gevonden of geen rechten." };

  revalidatePath("/admin/aanvragen");
  revalidatePath("/admin/nieuwsbrief");
  revalidatePath("/admin");
  return { ok: true };
}
