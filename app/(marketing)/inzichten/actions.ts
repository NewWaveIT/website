"use server";

import { createClient } from "@/lib/supabase/server";

export interface LeadState {
  ok: boolean;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

/**
 * E-mailcapture op de inzichten-pagina's. Landt als lead in het bestaande
 * aanvragen-systeem (contact_aanvragen, type 'inzichten').
 */
export async function subscribeLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: bots vullen dit verborgen veld; mensen niet.
  if (str(formData, "website")) {
    return { ok: true, message: "Bedankt! Je hoort van ons." };
  }

  const email = str(formData, "email");
  const naam = str(formData, "naam");
  if (!EMAIL_RE.test(email)) return { ok: false, message: "Vul een geldig e-mailadres in." };
  if (email.length > 320 || naam.length > 200) return { ok: false, message: "Invoer is te lang." };

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_aanvragen").insert({
      naam: naam || email,
      email,
      onderwerp: "Inzichten",
      bericht: "Aanmelding via de inzichten-pagina (content volgen / nieuwsbrief).",
      type: "inzichten",
    });
    if (error) {
      return {
        ok: false,
        message: "Er ging iets mis. Probeer het later opnieuw of mail hello@thenewwaveit.com.",
      };
    }
  } catch {
    return {
      ok: false,
      message: "Er ging iets mis. Probeer het later opnieuw of mail hello@thenewwaveit.com.",
    };
  }

  return { ok: true, message: "Gelukt! Je ontvangt binnenkort onze scherpste inzichten." };
}
