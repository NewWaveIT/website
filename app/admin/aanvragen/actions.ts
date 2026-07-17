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
  const { error } = await supabase.from("contact_aanvragen").update(patch).eq("id", id);
  if (error) return { ok: false };
  revalidatePath("/admin/aanvragen");
  revalidatePath("/admin");
  return { ok: true };
}
