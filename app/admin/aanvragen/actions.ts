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
