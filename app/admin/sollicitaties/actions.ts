"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/dal";

export async function updateSollicitatie(
  id: string,
  patch: { status?: string; interne_notitie?: string | null },
): Promise<{ ok: boolean }> {
  const user = await getCurrentUser();
  if (!user) return { ok: false };
  const supabase = await createClient();
  const { error } = await supabase.from("sollicitaties").update(patch).eq("id", id);
  if (error) return { ok: false };
  revalidatePath("/admin/sollicitaties");
  revalidatePath("/admin");
  return { ok: true };
}

/** Tijdelijke (5 min) signed URL voor een cv in de privébucket 'sollicitaties'. */
export async function getCvUrl(path: string): Promise<{ url?: string; error?: string }> {
  const user = await getCurrentUser();
  if (!user) return { error: "Niet ingelogd." };
  if (!path) return { error: "Geen cv beschikbaar." };
  const supabase = await createClient();
  const { data, error } = await supabase.storage.from("sollicitaties").createSignedUrl(path, 300);
  if (error || !data?.signedUrl) return { error: "Kon het cv niet openen." };
  return { url: data.signedUrl };
}
