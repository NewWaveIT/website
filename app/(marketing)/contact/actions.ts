"use server";

import { createClient } from "@/lib/supabase/server";

export interface ContactState {
  ok: boolean;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(formData: FormData, key: string): string {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: bots vullen dit verborgen veld; mensen niet.
  if (str(formData, "website")) {
    return { ok: true, message: "Bedankt, we nemen snel contact met je op." };
  }

  const naam = str(formData, "naam");
  const email = str(formData, "email");
  const bedrijf = str(formData, "organisatie");
  const rol = str(formData, "rol");
  const sector = str(formData, "sector");
  const toelichting = str(formData, "toelichting");
  const onderwerpen = formData.getAll("onderwerp").filter(Boolean).join(", ");
  const type = str(formData, "type") || "strategiegesprek";

  // Validatie
  if (naam.length < 2) return { ok: false, message: "Vul je naam in." };
  if (!EMAIL_RE.test(email)) return { ok: false, message: "Vul een geldig e-mailadres in." };
  if (naam.length > 200 || email.length > 320 || toelichting.length > 5000)
    return { ok: false, message: "Een van de velden is te lang." };

  const onderwerpLabel = [rol, sector, onderwerpen].filter(Boolean).join(" · ");
  const bericht =
    toelichting ||
    `Aanvraag via het contactformulier. ${onderwerpLabel || "Geen extra toelichting."}`;

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_aanvragen").insert({
      naam,
      email,
      bedrijf: bedrijf || null,
      onderwerp: onderwerpLabel || null,
      bericht,
      type,
    });

    if (error) {
      return {
        ok: false,
        message:
          "Er ging iets mis bij het versturen. Probeer het later opnieuw of mail hello@thenewwaveit.com.",
      };
    }
  } catch {
    return {
      ok: false,
      message:
        "Er ging iets mis bij het versturen. Probeer het later opnieuw of mail hello@thenewwaveit.com.",
    };
  }

  return {
    ok: true,
    message: "Bedankt! We reageren binnen één werkdag met een voorstel.",
  };
}
