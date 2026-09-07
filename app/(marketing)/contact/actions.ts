"use server";

import { createClient } from "@/lib/supabase/server";
import { sendAanvraagNotificatie, sendAanvraagBevestiging } from "@/lib/email";
import { magDoor } from "@/lib/rate-limit";

export interface ContactState {
  ok: boolean;
  message: string;
  /** Per-veld foutmeldingen (key = veldnaam), zodat het formulier ze bij het juiste veld toont. */
  errors?: Record<string, string>;
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

  if (!(await magDoor("contact", 5, 600))) {
    return {
      ok: false,
      message: "Te veel pogingen. Probeer het over een paar minuten opnieuw.",
    };
  }

  const naam = str(formData, "naam");
  const email = str(formData, "email");
  const bedrijf = str(formData, "organisatie");
  const rol = str(formData, "rol");
  const sector = str(formData, "sector");
  const toelichting = str(formData, "toelichting");
  const onderwerpen = formData.getAll("onderwerp").filter(Boolean).join(", ");
  const type = str(formData, "type") || "strategiegesprek";

  // Validatie — verzamel álle fouten tegelijk, zodat de bezoeker in één keer
  // ziet wat er nog mist of niet klopt (i.p.v. veld voor veld).
  const errors: Record<string, string> = {};
  if (naam.length < 2) errors.naam = "Vul je naam in.";
  else if (naam.length > 200) errors.naam = "Naam is te lang (max. 200 tekens).";
  if (!EMAIL_RE.test(email)) errors.email = "Vul een geldig e-mailadres in.";
  else if (email.length > 320) errors.email = "E-mailadres is te lang.";
  if (toelichting.length > 5000) errors.toelichting = "Toelichting is te lang (max. 5000 tekens).";
  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Controleer de gemarkeerde velden.", errors };
  }

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

  // Interne notificatie + bevestiging aan de aanvrager (beide fail-safe).
  await sendAanvraagNotificatie({
    naam,
    organisatie: bedrijf,
    email,
    telefoon: "",
    onderwerp: onderwerpLabel,
    bericht,
  });

  await sendAanvraagBevestiging({
    to: email,
    voornaam: naam.split(" ")[0] || naam,
    onderwerp: onderwerpLabel,
    bericht,
  });

  return {
    ok: true,
    message: "Bedankt! We reageren binnen één werkdag met een voorstel.",
  };
}
