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
