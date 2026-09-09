"use server";

import { inzendingClient } from "@/lib/supabase/inzendingen";
import { sendAanvraagNotificatie, sendAanvraagBevestiging } from "@/lib/email";
import { magDoor } from "@/lib/rate-limit";
import { getServices } from "@/lib/services-data";
import {
  CONTACT_TYPES,
  SERVICE_VRAGEN,
  VRAGEN_PER_SERVICE,
  type VraagKey,
} from "@/lib/services-vragen";

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
  const dienst = str(formData, "dienst");
  const groepsgrootte = str(formData, "groepsgrootte");

  // Validatie — verzamel álle fouten tegelijk, zodat de bezoeker in één keer
  // ziet wat er nog mist of niet klopt (i.p.v. veld voor veld).
  const errors: Record<string, string> = {};
  if (naam.length < 2) errors.naam = "Vul je naam in.";
  else if (naam.length > 200) errors.naam = "Naam is te lang (max. 200 tekens).";
  if (!EMAIL_RE.test(email)) errors.email = "Vul een geldig e-mailadres in.";
  else if (email.length > 320) errors.email = "E-mailadres is te lang.";
  if (toelichting.length > 5000) errors.toelichting = "Toelichting is te lang (max. 5000 tekens).";
  if (groepsgrootte.length > 100) errors.groepsgrootte = "Dat is wel erg lang voor een aantal.";
  // Deze velden komen uit chips/selects en horen kort te zijn; zonder cap kan één
  // request megabytes de tabel in schrijven.
  if (bedrijf.length > 200) errors.organisatie = "Organisatie is te lang (max. 200 tekens).";
  if (rol.length > 200) errors.rol = "Rol is te lang (max. 200 tekens).";
  if (sector.length > 200) errors.sector = "Ongeldige sector.";
  if (onderwerpen.length > 400) errors.onderwerp = "Te veel onderwerpen gekozen.";

  const services = await getServices();
  let serviceNaam = "";
  if (dienst && dienst !== "weet-ik-niet") {
    const gekozen = services.find((s) => s.slug === dienst);
    if (!gekozen) errors.dienst = "Kies een geldige dienst.";
    else serviceNaam = gekozen.naam;
  }

  // Conditionele vervolgvragen per dienst — allemaal optioneel, zodat een
  // halfingevuld formulier nooit een aanvraag blokkeert.
  const vraagKeys = VRAGEN_PER_SERVICE[dienst] ?? [];
  const antwoorden: { label: string; waarde: string }[] = [];
  for (const key of vraagKeys) {
    const v = SERVICE_VRAGEN[key as VraagKey];
    const waarde = str(formData, v.name);
    if (!waarde) continue;
    if (v.maxLengte && waarde.length > v.maxLengte) {
      errors[v.name] = `Dat is te lang (max. ${v.maxLengte} tekens).`;
      continue;
    }
    if (v.type === "radio" && v.opties && !v.opties.includes(waarde)) {
      errors[v.name] = "Kies een van de opties.";
      continue;
    }
    antwoorden.push({ label: v.label, waarde });
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, message: "Controleer de gemarkeerde velden.", errors };
  }

  // Een gekozen dienst maakt het een dienstaanvraag, ook als de bezoeker op de
  // algemene contactpagina begon. Een specifiekere ingang (kennismaking,
  // sectorrapport) blijft wel staan.
  const ruwType = str(formData, "type");
  const gekozenType = CONTACT_TYPES.includes(ruwType) ? ruwType : "";
  const type =
    dienst && (!gekozenType || gekozenType === "gesprek")
      ? "dienstaanvraag"
      : gekozenType || "gesprek";
  const onderwerpLabel = [serviceNaam, rol, groepsgrootte, sector, onderwerpen]
    .filter(Boolean)
    .join(" · ");
  const antwoordenBlok = antwoorden.map((a) => `${a.label}: ${a.waarde}`).join("\n");
  const bericht =
    [toelichting, antwoordenBlok].filter(Boolean).join("\n\n") ||
    `Aanvraag via het contactformulier. ${onderwerpLabel || "Geen extra toelichting."}`;

  try {
    const supabase = inzendingClient();
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
