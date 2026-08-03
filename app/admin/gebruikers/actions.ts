"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/dal";
import { createAdminClient } from "@/lib/supabase/admin";

export type GebruikerState = { error?: string; ok?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Nieuwe gebruiker aanmaken (met beginwachtwoord; account wordt direct bevestigd). */
export async function createGebruiker(
  _prev: GebruikerState,
  formData: FormData,
): Promise<GebruikerState> {
  await requireAdmin();

  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const naam = String(formData.get("naam") ?? "").trim();
  const wachtwoord = String(formData.get("wachtwoord") ?? "");

  if (!naam) return { error: "Naam is verplicht." };
  if (!EMAIL_RE.test(email)) return { error: "Vul een geldig e-mailadres in." };
  if (wachtwoord.length < 8) return { error: "Wachtwoord moet minimaal 8 tekens zijn." };

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.createUser({
    email,
    password: wachtwoord,
    email_confirm: true,
    user_metadata: { naam },
  });
  if (error) {
    const bestaat = error.message.toLowerCase().includes("already");
    return { error: bestaat ? "Er bestaat al een gebruiker met dit e-mailadres." : error.message };
  }

  revalidatePath("/admin/gebruikers");
  return { ok: `Gebruiker ${naam} aangemaakt.` };
}

/** Naam bijwerken en optioneel het wachtwoord opnieuw instellen. */
export async function updateGebruiker(
  _prev: GebruikerState,
  formData: FormData,
): Promise<GebruikerState> {
  await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const naam = String(formData.get("naam") ?? "").trim();
  const wachtwoord = String(formData.get("wachtwoord") ?? "");
  if (!id) return { error: "Onbekende gebruiker." };
  if (!naam) return { error: "Naam is verplicht." };
  if (wachtwoord && wachtwoord.length < 8)
    return { error: "Wachtwoord moet minimaal 8 tekens zijn." };

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.updateUserById(id, {
    user_metadata: { naam },
    ...(wachtwoord ? { password: wachtwoord } : {}),
  });
  if (error) return { error: error.message };

  revalidatePath("/admin/gebruikers");
  return { ok: "Gebruiker bijgewerkt." };
}

/** (De)activeren: geblokkeerde gebruikers kunnen niet meer inloggen, maar blijven bestaan. */
export async function setActief(formData: FormData): Promise<void> {
  const user = await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const actief = String(formData.get("actief") ?? "") === "true";
  if (!id) return;
  // Voorkom dat je jezelf buitensluit.
  if (id === user.id) return;

  const admin = createAdminClient();
  await admin.auth.admin.updateUserById(id, {
    // 'none' heft de blokkade op; een lange duur deactiveert het account.
    ban_duration: actief ? "none" : "876000h",
  } as Parameters<typeof admin.auth.admin.updateUserById>[1]);

  revalidatePath("/admin/gebruikers");
}
