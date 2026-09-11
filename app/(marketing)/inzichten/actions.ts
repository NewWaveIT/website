"use server";

import { inzendingClient } from "@/lib/supabase/inzendingen";
import { magDoor } from "@/lib/rate-limit";

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

  if (!(await magDoor("inzichten-lead", 5, 600))) {
    return { ok: false, message: "Te veel pogingen. Probeer het over een paar minuten opnieuw." };
  }

  // Het formulier vraagt alleen om een e-mailadres; een naamveld zou de drempel
  // verhogen voor wat een aanmelding van één regel hoort te zijn. De action las
  // hier ooit ook `naam`, maar niets stuurde dat ooit mee.
  const email = str(formData, "email");
  if (!EMAIL_RE.test(email)) return { ok: false, message: "Vul een geldig e-mailadres in." };
  if (email.length > 320) return { ok: false, message: "Invoer is te lang." };

  try {
    const supabase = inzendingClient();
    const { error } = await supabase.from("contact_aanvragen").insert({
      naam: email,
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
