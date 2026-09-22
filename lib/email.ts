import "server-only";
import { SITE_URL } from "@/lib/site";

/**
 * Transactionele mail in huisstijl (tabelgebaseerd, 600px, inline gestyled).
 * Templates komen uit het Claude Design-project (ui_kits/website/email-templates.html).
 * Alle verzendfuncties zijn fail-safe: ze gooien nooit en slaan over zonder
 * RESEND_API_KEY — een inzending mag er nooit op stuklopen.
 *
 * Env:
 *   RESEND_API_KEY          Server-only API-key van Resend.
 *   NOTIFY_EMAIL            Interne ontvanger voor sollicitaties (default people@thenewwaveit.com).
 *   NOTIFY_EMAIL_AANVRAGEN  Interne ontvanger voor contactaanvragen (default orders@thenewwaveit.com).
 *   MAIL_FROM               Afzender interne notificaties (default notificaties@…).
 *   MAIL_FROM_PUBLIC        Afzender bevestigingen naar bezoekers (default orders@…).
 *   NEXT_PUBLIC_SITE_URL    Basis-URL voor logo + links (default www.thenewwaveit.com).
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
import { CONTACT_TERUGVAL } from "@/lib/contactgegevens";
const SITE = SITE_URL;
// Espresso-logo: de bevestigingsmails hebben een lichte achtergrond, geen
// donkere header meer — een wit logo zou daar onzichtbaar zijn.
const LOGO = `${SITE}/assets/logos/logo-horizontal-espresso.png`;
const FROM_ADMIN = process.env.MAIL_FROM || "The New Wave IT <notificaties@thenewwaveit.com>";
const FROM_PUBLIC = process.env.MAIL_FROM_PUBLIC || `The New Wave IT <${CONTACT_TERUGVAL.email}>`;
// Twee aparte postbussen: sollicitaties horen bij recruitment, aanvragen bij
// de rest van de business — vandaar niet één gedeelde NOTIFY-constante.
const NOTIFY_SOLLICITATIES = process.env.NOTIFY_EMAIL || "people@thenewwaveit.com";
const NOTIFY_AANVRAGEN = process.env.NOTIFY_EMAIL_AANVRAGEN || "orders@thenewwaveit.com";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Escape + regels naar <br> voor vrije-tekstblokken (toelichting, motivatie). */
function tekst(s: string): string {
  return escapeHtml(s).replace(/\n/g, "<br>");
}

function datumTijdNu(): string {
  return new Date().toLocaleString("nl-NL", {
    timeZone: "Europe/Amsterdam",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Gedeelde, fail-safe verzendhelper. */
async function verstuur(payload: {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(`[email] RESEND_API_KEY ontbreekt, mail overgeslagen: ${payload.subject}`);
    return;
  }
  const body: Record<string, unknown> = {
    from: payload.from,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
  };
  if (payload.replyTo) body.reply_to = payload.replyTo;
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) console.error(`[email] Resend gaf ${res.status}: ${await res.text()}`);
  } catch (e) {
    console.error("[email] versturen mislukt:", e);
  }
}

/** Preheader (verborgen inbox-preview) + het 600px-kader rond elke mail. */
function omhulsel(preheader: string, inner: string): string {
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"></head><body style="margin:0;padding:0;background:#ECE6DB;">
<span style="display:none;font-size:1px;color:#ECE6DB;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:#ECE6DB;"><tr><td align="center" style="padding:24px 12px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;border-collapse:collapse;background:#FFFFFF;border:1px solid #E0D8C9;">
${inner}
</table></td></tr></table></body></html>`;
}

/** Logo + dunne oranje regel: alleen de twee bevestigingen naar de afzender. */
function logoRij(): string {
  return `<tr><td style="padding:28px 32px 0 32px;">
    <img src="${LOGO}" alt="The New Wave IT" width="180" style="display:block;width:180px;height:auto;border:0;">
  </td></tr>
  <tr><td style="padding:22px 32px 0 32px;">
    <div style="height:3px;background:#F15822;font-size:0;line-height:0;">&nbsp;</div>
  </td></tr>`;
}

/** Titel (met optionele kicker erboven) voor een bevestiging. `kickerHtml` is al veilig. */
function titelBlok(kickerHtml: string | null, titel: string): string {
  const kicker = kickerHtml
    ? `<div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8B7B64;padding-bottom:10px;">${kickerHtml}</div>`
    : "";
  return `<tr><td style="padding:26px 32px 0 32px;font-family:Arial,Helvetica,sans-serif;">
    ${kicker}
    <div style="font-size:22px;line-height:29px;font-weight:bold;color:#2E251A;letter-spacing:-0.3px;">${escapeHtml(titel)}</div>
  </td></tr>`;
}

/** Lopende tekst in een bevestiging. `html` is al veilig (escapeHtml is al toegepast). */
function paragraaf(html: string, topPad = 14): string {
  return `<tr><td style="padding:${topPad}px 32px 0 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:24px;color:#4E4030;">${html}</td></tr>`;
}

/** Geaccentueerd blok met oranje linkerbalk (toelichting / samenvatting). */
function accentBox(kicker: string, contentHtml: string, pad = "24px 32px 0 32px"): string {
  return `<tr><td style="padding:${pad};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:#F4F1EA;border-left:3px solid #F15822;">
      <tr><td style="padding:18px 20px;font-family:Arial,Helvetica,sans-serif;">
        <div style="font-family:'Courier New',monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#8B7B64;padding-bottom:10px;">${escapeHtml(kicker)}</div>
        <div style="font-size:14px;line-height:22px;color:#4E4030;">${contentHtml}</div>
      </td></tr>
    </table>
  </td></tr>`;
}

/** Simpele voettekst in de bevestigingen — geen donker blok meer, één regel. */
function footerAfzender(): string {
  return `<tr><td style="padding:26px 32px 28px 32px;">
    <div style="border-top:1px solid #E0D8C9;padding-top:16px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:20px;color:#8B7B64;">
      The New Wave IT · Ganzenmarkt 6, Utrecht · <a href="${SITE}" style="color:#8B7B64;text-decoration:underline;">thenewwaveit.com</a>
    </div>
  </td></tr>`;
}

/** Donkere kopbalk van een interne melding. Geen logo: dit gaat naar het eigen team. */
function donkereBalk(titelHtml: string): string {
  return `<tr><td style="padding:18px 24px;background:#2E251A;font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#ECE6DB;">
    ${titelHtml}
  </td></tr>`;
}

/** Naam + optioneel subregel, direct onder de donkere balk. */
function naamBlok(naam: string, subtitelHtml: string): string {
  return `<tr><td style="padding:26px 24px 0 24px;font-family:Arial,Helvetica,sans-serif;">
    <div style="font-size:21px;line-height:28px;font-weight:bold;color:#2E251A;letter-spacing:-0.3px;">${escapeHtml(naam)}</div>
    ${subtitelHtml ? `<div style="font-size:14px;line-height:22px;color:#6B5B47;padding-top:2px;">${subtitelHtml}</div>` : ""}
  </td></tr>`;
}

/** Label/waarde-tabel in een interne melding. `waarde` mag al opgemaakt HTML zijn. */
function gegevensTabel(rijen: { label: string; waarde: string; laatste?: boolean }[]): string {
  const rows = rijen
    .map((r) => {
      const rand = `border-top:1px solid #E0D8C9;${r.laatste ? "border-bottom:1px solid #E0D8C9;" : ""}`;
      return `<tr>
        <td width="130" style="padding:8px 0;${rand}color:#8B7B64;vertical-align:top;">${escapeHtml(r.label)}</td>
        <td style="padding:8px 0;${rand}color:#4E4030;">${r.waarde}</td>
      </tr>`;
    })
    .join("");
  return `<tr><td style="padding:20px 24px 0 24px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:22px;">
      ${rows}
    </table>
  </td></tr>`;
}

/** Twee knoppen naast elkaar: de hoofdactie (CMS) en een snelle reactie (mailto). */
function knoppenRij(
  primaireHref: string,
  primaireLabel: string,
  secundaireHref: string,
  secundaireLabel: string,
): string {
  return `<tr><td style="padding:24px 24px 30px 24px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
      <tr>
        <td style="background:#F15822;">
          <a href="${primaireHref}" style="display:inline-block;padding:13px 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#FFFFFF;text-decoration:none;">${escapeHtml(primaireLabel)}</a>
        </td>
        <td style="padding-left:12px;">
          <a href="${secundaireHref}" style="display:inline-block;padding:12px 22px;border:1px solid #C9BCA6;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:#2E251A;text-decoration:none;">${escapeHtml(secundaireLabel)}</a>
        </td>
      </tr>
    </table>
  </td></tr>`;
}

// ── 1. Contactformulier · bevestiging aan de afzender ─────────────────────────
export async function sendAanvraagBevestiging(a: {
  to: string;
  voornaam: string;
  dienst: string;
  toelichting: string;
  replyTo?: string;
}): Promise<void> {
  const inner = `
${logoRij()}
${titelBlok(null, "We hebben je bericht ontvangen")}
${paragraaf(
  `Hallo ${escapeHtml(a.voornaam)},<br><br>Bedankt voor je interesse in The New Wave IT. We lezen je aanvraag en nemen <strong style="color:#2E251A;">binnen één werkdag</strong> contact met je op om een gesprek te plannen.`,
)}
${accentBox(
  "Jouw aanvraag",
  `<strong style="color:#2E251A;">${escapeHtml(a.dienst || "Algemeen contact")}</strong><br>${tekst(a.toelichting || "Geen extra toelichting.")}`,
)}
${paragraaf(`Met vriendelijke groet,<br><strong style="color:#2E251A;">Team The New Wave IT</strong>`, 26)}
${footerAfzender()}`;
  await verstuur({
    from: FROM_PUBLIC,
    to: a.to,
    replyTo: a.replyTo || NOTIFY_AANVRAGEN,
    subject: "We hebben je bericht ontvangen",
    html: omhulsel("We hebben je bericht ontvangen. Binnen één werkdag hoor je van ons.", inner),
  });
}

// ── 2. Contactformulier · interne melding ─────────────────────────────────────
export async function sendAanvraagNotificatie(a: {
  naam: string;
  organisatie: string;
  email: string;
  rol: string;
  dienst: string;
  sector: string;
  vraagstuk: string;
  toelichting: string;
  cmsUrl: string;
}): Promise<void> {
  const rijen = [
    {
      label: "E-mail",
      waarde: `<a href="mailto:${escapeHtml(a.email)}" style="color:#F15822;text-decoration:none;">${escapeHtml(a.email)}</a>`,
    },
    ...(a.rol ? [{ label: "Rol", waarde: escapeHtml(a.rol) }] : []),
    ...(a.dienst ? [{ label: "Dienst", waarde: escapeHtml(a.dienst) }] : []),
    ...(a.sector ? [{ label: "Sector", waarde: escapeHtml(a.sector) }] : []),
    ...(a.vraagstuk ? [{ label: "Vraagstuk", waarde: escapeHtml(a.vraagstuk) }] : []),
    { label: "Ontvangen", waarde: escapeHtml(datumTijdNu()), laatste: true },
  ];
  const inner = `
${donkereBalk(`Nieuwe aanvraag &nbsp;·&nbsp; <span style="color:#F15822;">Contactformulier</span>`)}
${naamBlok(a.naam, a.organisatie ? escapeHtml(a.organisatie) : "")}
${gegevensTabel(rijen)}
${a.toelichting ? accentBox("Toelichting", tekst(a.toelichting), "22px 24px 0 24px") : ""}
${knoppenRij(a.cmsUrl, "Oppakken in CMS", `mailto:${a.email}`, "Direct antwoorden")}`;
  await verstuur({
    from: FROM_ADMIN,
    to: NOTIFY_AANVRAGEN,
    replyTo: a.email,
    subject: `Nieuwe aanvraag van ${a.organisatie || a.naam} via Contactformulier`,
    html: omhulsel(
      `Nieuwe aanvraag van ${a.naam}${a.organisatie ? ` (${a.organisatie})` : ""}. Pak op binnen één werkdag.`,
      inner,
    ),
  });
}

// ── 3. Sollicitatie · bevestiging aan de sollicitant ──────────────────────────
export async function sendSollicitatieBevestiging(a: {
  to: string;
  voornaam: string;
  vacature: string;
  recruiterNaam: string;
  recruiterEmail: string;
}): Promise<void> {
  const inner = `
${logoRij()}
${titelBlok(`Sollicitatie · ${escapeHtml(a.vacature)}`, "We hebben je sollicitatie ontvangen")}
${paragraaf(
  `Hallo ${escapeHtml(a.voornaam)},<br><br>Bedankt voor je sollicitatie op <strong style="color:#2E251A;">${escapeHtml(a.vacature)}</strong>. We hebben je cv en motivatiebrief ontvangen en lezen ze zelf.`,
)}
${paragraaf(
  `Je hoort <strong style="color:#2E251A;">binnen drie werkdagen</strong> van ons. Heb je een vraag? Mail <a href="mailto:${escapeHtml(a.recruiterEmail)}" style="color:#F15822;text-decoration:none;font-weight:bold;">${escapeHtml(a.recruiterNaam)}</a>.<br><br>Met vriendelijke groet,<br><strong style="color:#2E251A;">Team The New Wave IT</strong>`,
  24,
)}
${footerAfzender()}`;
  await verstuur({
    from: FROM_PUBLIC,
    to: a.to,
    replyTo: a.recruiterEmail,
    subject: `We hebben je sollicitatie voor ${a.vacature} ontvangen`,
    html: omhulsel(
      `We hebben je sollicitatie op ${a.vacature} goed ontvangen. Binnen drie werkdagen hoor je van ons.`,
      inner,
    ),
  });
}

// ── 4. Sollicitatie · interne melding ──────────────────────────────────────────
export async function sendSollicitatieNotificatie(a: {
  naam: string;
  email: string;
  telefoon: string;
  vacature: string;
  linkedinUrl: string;
  bron: string;
  cmsUrl: string;
}): Promise<void> {
  const rijen = [
    {
      label: "E-mail",
      waarde: `<a href="mailto:${escapeHtml(a.email)}" style="color:#F15822;text-decoration:none;">${escapeHtml(a.email)}</a>`,
    },
    ...(a.telefoon ? [{ label: "Telefoon", waarde: escapeHtml(a.telefoon) }] : []),
    { label: "Via", waarde: `${escapeHtml(a.bron)} · ${escapeHtml(datumTijdNu())}` },
    ...(a.linkedinUrl
      ? [
          {
            label: "LinkedIn",
            waarde: `<a href="${escapeHtml(a.linkedinUrl)}" style="color:#F15822;text-decoration:none;">${escapeHtml(a.linkedinUrl)}</a>`,
          },
        ]
      : []),
    {
      label: "Bijlagen",
      waarde: "Cv en motivatiebrief, te openen via de knop hieronder",
      laatste: true,
    },
  ];
  const inner = `
${donkereBalk(`Nieuwe sollicitatie &nbsp;·&nbsp; <span style="color:#F15822;">${escapeHtml(a.vacature)}</span>`)}
${naamBlok(a.naam, "")}
${gegevensTabel(rijen)}
${knoppenRij(a.cmsUrl, "Naar screening", `mailto:${a.email}`, "Kandidaat mailen")}`;
  await verstuur({
    from: FROM_ADMIN,
    to: NOTIFY_SOLLICITATIES,
    replyTo: a.email,
    subject: `Nieuwe sollicitatie van ${a.naam} voor ${a.vacature}`,
    html: omhulsel(`Nieuwe sollicitatie van ${a.naam} op de vacature ${a.vacature}.`, inner),
  });
}

// ── 5. Inzichten-nieuwsbrief · bevestiging aan de aanmelder ───────────────────
export async function sendInzichtenBevestiging(a: { to: string }): Promise<void> {
  const inner = `
${logoRij()}
${titelBlok(null, "Je staat op de lijst")}
${paragraaf(
  `Bedankt voor je aanmelding. Eén keer per maand sturen we onze scherpste inzichten over technologie in jouw sector. Geen sales, uitschrijven kan altijd.`,
)}
${paragraaf(`Met vriendelijke groet,<br><strong style="color:#2E251A;">Team The New Wave IT</strong>`, 24)}
${footerAfzender()}`;
  await verstuur({
    from: FROM_PUBLIC,
    to: a.to,
    subject: "Je staat op de lijst",
    html: omhulsel("Je ontvangt voortaan onze inzichten, één keer per maand.", inner),
  });
}

// ── 6. Inzichten-nieuwsbrief · interne melding ─────────────────────────────────
export async function sendInzichtenNotificatie(a: {
  email: string;
  cmsUrl: string;
}): Promise<void> {
  const rijen = [
    {
      label: "E-mail",
      waarde: `<a href="mailto:${escapeHtml(a.email)}" style="color:#F15822;text-decoration:none;">${escapeHtml(a.email)}</a>`,
    },
    { label: "Ontvangen", waarde: escapeHtml(datumTijdNu()), laatste: true },
  ];
  const inner = `
${donkereBalk(`Nieuwe aanmelding &nbsp;·&nbsp; <span style="color:#F15822;">Nieuwsbrief</span>`)}
${gegevensTabel(rijen)}
${knoppenRij(a.cmsUrl, "Bekijk in CMS", `mailto:${a.email}`, "Mail deze aanmelder")}`;
  await verstuur({
    from: FROM_ADMIN,
    to: NOTIFY_AANVRAGEN,
    replyTo: a.email,
    subject: `Nieuwe nieuwsbrief-aanmelding: ${a.email}`,
    html: omhulsel(`Nieuwe aanmelding voor de inzichten-nieuwsbrief: ${a.email}.`, inner),
  });
}
