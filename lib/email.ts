import "server-only";

/**
 * Transactionele mail in huisstijl (tabelgebaseerd, 600px, inline gestyled).
 * Templates komen uit het Claude Design-project (ui_kits/website/mailtemplates.html).
 * Alle verzendfuncties zijn fail-safe: ze gooien nooit en slaan over zonder
 * RESEND_API_KEY — een inzending mag er nooit op stuklopen.
 *
 * Env:
 *   RESEND_API_KEY    Server-only API-key van Resend.
 *   NOTIFY_EMAIL      Interne ontvanger (default people@thenewwaveit.com).
 *   MAIL_FROM         Afzender interne notificaties (default notificaties@…).
 *   MAIL_FROM_PUBLIC  Afzender bevestigingen naar bezoekers (default hello@…).
 *   NEXT_PUBLIC_SITE_URL  Basis-URL voor logo + links (default www.thenewwaveit.com).
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.thenewwaveit.com").replace(
  /\/$/,
  "",
);
const LOGO = `${SITE}/assets/logos/logo-horizontal-white.png`;
const FROM_ADMIN = process.env.MAIL_FROM || "The New Wave IT <notificaties@thenewwaveit.com>";
const FROM_PUBLIC = process.env.MAIL_FROM_PUBLIC || "The New Wave IT <hello@thenewwaveit.com>";
const NOTIFY = process.env.NOTIFY_EMAIL || "people@thenewwaveit.com";
const TEL = "+31683170976";
const TEL_DISPLAY = "+31 6 83 17 09 76";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Escape + regels naar <br> voor vrije-tekstblokken (motivatie, bericht). */
function tekst(s: string): string {
  return escapeHtml(s).replace(/\n/g, "<br>");
}

function datumNu(): string {
  return new Date().toLocaleDateString("nl-NL", {
    timeZone: "Europe/Amsterdam",
    day: "numeric",
    month: "long",
    year: "numeric",
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
    console.warn(`[email] RESEND_API_KEY ontbreekt — mail overgeslagen: ${payload.subject}`);
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

/** Preheader (verborgen inbox-preview) + 600px-omhulsel rond de inner-rijen. */
function omhulsel(preheader: string, inner: string): string {
  return `<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"></head><body style="margin:0;padding:0;background:#ECE6DB;">
<span style="display:none;font-size:1px;color:#ECE6DB;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;background:#ECE6DB;"><tr><td align="center" style="padding:32px 16px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;border-collapse:collapse;background:#FFFDF9;">
${inner}
</table></td></tr></table></body></html>`;
}

/** De golfbalk onder de header. */
const GOLFBALK = `<tr><td style="font-size:0;line-height:0;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
    <tr>
      <td height="4" width="42%" style="height:4px;background:#F15822;font-size:0;line-height:0;">&nbsp;</td>
      <td height="4" width="16%" style="height:4px;background:#D9812F;font-size:0;line-height:0;">&nbsp;</td>
      <td height="4" width="42%" style="height:4px;background:#8B7B64;font-size:0;line-height:0;">&nbsp;</td>
    </tr>
  </table>
</td></tr>`;

const LOGO_ROW = `<tr><td style="padding-bottom:20px;"><img src="${LOGO}" alt="The New Wave IT" width="164" style="display:block;width:164px;height:auto;border:0;outline:none;text-decoration:none;"></td></tr>`;

/** Donkere header voor de admin-notificaties (kicker + titel + metaregel). */
function adminHeader(titel: string, meta: string): string {
  return `<tr><td style="background:#2E251A;padding:30px 36px 26px 36px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
    ${LOGO_ROW}
    <tr><td style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:2.4px;text-transform:uppercase;color:#F15822;padding-bottom:10px;mso-line-height-rule:exactly;line-height:14px;">Admin &nbsp;·&nbsp; Notificatie</td></tr>
    <tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:27px;font-weight:bold;color:#FFFDF9;letter-spacing:-0.4px;mso-line-height-rule:exactly;line-height:32px;">${escapeHtml(titel)}</td></tr>
    <tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#AC9D85;padding-top:8px;mso-line-height-rule:exactly;line-height:20px;">${escapeHtml(meta)}</td></tr>
  </table>
</td></tr>`;
}

/** Donkere header voor de bevestigingen (groot, tweeregelig). */
function bevestigingHeader(titelHtml: string): string {
  return `<tr><td style="background:#2E251A;padding:34px 36px 30px 36px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
    <tr><td style="padding-bottom:24px;"><img src="${LOGO}" alt="The New Wave IT" width="164" style="display:block;width:164px;height:auto;border:0;outline:none;text-decoration:none;"></td></tr>
    <tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:30px;font-weight:bold;color:#FFFDF9;letter-spacing:-0.5px;mso-line-height-rule:exactly;line-height:36px;">${titelHtml}</td></tr>
  </table>
</td></tr>`;
}

/** Label/waarde-rij in het gegevensblok. */
function rij(label: string, valueHtml: string, sterk = false): string {
  const kleur = sterk ? "#2E251A" : "#4E4030";
  const gewicht = sterk ? "font-weight:bold;" : "";
  return `<tr>
    <td width="120" style="width:120px;padding:0 0 14px 0;vertical-align:top;font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#8B7B64;mso-line-height-rule:exactly;line-height:20px;">${escapeHtml(label)}</td>
    <td style="padding:0 0 14px 0;vertical-align:top;font-size:15px;color:${kleur};${gewicht}mso-line-height-rule:exactly;line-height:22px;">${valueHtml}</td>
  </tr>`;
}

/** Geaccentueerd blok met oranje linkerbalk (motivatie / vraag). */
function accentBlok(label: string, inhoudHtml: string): string {
  return `<tr><td style="padding:8px 36px 0 36px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;background:#F4F1EA;">
      <tr>
        <td width="4" style="width:4px;background:#F15822;font-size:0;line-height:0;">&nbsp;</td>
        <td style="padding:20px 24px;font-family:Arial,Helvetica,sans-serif;">
          <div style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#8B7B64;padding-bottom:8px;">${escapeHtml(label)}</div>
          <div style="font-size:15px;color:#4E4030;mso-line-height-rule:exactly;line-height:24px;">${inhoudHtml}</div>
        </td>
      </tr>
    </table>
  </td></tr>`;
}

/** Oranje call-to-action-knop. */
function knop(href: string, label: string, padding = "28px 36px 36px 36px"): string {
  return `<tr><td style="padding:${padding};">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
      <tr><td bgcolor="#F15822" style="background:#F15822;border-radius:4px;"><a href="${href}" style="display:block;padding:15px 30px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#FFFFFF;text-decoration:none;letter-spacing:0.2px;">${label}</a></td></tr>
    </table>
  </td></tr>`;
}

const FOOTER_ADMIN = `<tr><td style="background:#2E251A;padding:22px 36px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
    <tr><td style="font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#AC9D85;mso-line-height-rule:exactly;line-height:16px;">Automatische melding vanaf thenewwaveit.com</td></tr>
  </table>
</td></tr>`;

function footerPubliek(redenHtml: string): string {
  return `<tr><td style="background:#2E251A;padding:26px 36px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
      <tr><td style="font-family:'Courier New',Courier,monospace;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#F15822;padding-bottom:10px;mso-line-height-rule:exactly;line-height:16px;">De nieuwe golf in IT-consultancy</td></tr>
      <tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#AC9D85;mso-line-height-rule:exactly;line-height:20px;">
        The New Wave IT &nbsp;·&nbsp; <a href="${SITE}" style="color:#AC9D85;text-decoration:underline;">thenewwaveit.com</a><br>
        ${redenHtml} — <a href="${SITE}/privacy" style="color:#AC9D85;text-decoration:underline;">privacyverklaring</a>.
      </td></tr>
    </table>
  </td></tr>`;
}

/** Stappen 01/02/03 ("Hoe het verder gaat"). */
function stappen(label: string, items: string[]): string {
  const rows = items
    .map((it, i) => {
      const last = i === items.length - 1;
      const pad = last ? "0" : "0 0 14px 0";
      return `<tr>
        <td width="34" style="width:34px;vertical-align:top;padding:${pad};font-family:'Courier New',Courier,monospace;font-size:13px;font-weight:bold;color:#F15822;mso-line-height-rule:exactly;line-height:24px;">0${i + 1}</td>
        <td style="padding:${pad};font-size:15px;color:#4E4030;mso-line-height-rule:exactly;line-height:24px;">${escapeHtml(it)}</td>
      </tr>`;
    })
    .join("");
  return `<tr><td style="padding:32px 36px 0 36px;font-family:Arial,Helvetica,sans-serif;">
    <div style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#8B7B64;padding-bottom:14px;">${escapeHtml(label)}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">${rows}</table>
  </td></tr>`;
}

// ── 1. Interne notificatie · nieuwe sollicitatie ──────────────────────────────
export async function sendSollicitatieNotificatie(a: {
  naam: string;
  email: string;
  telefoon: string;
  vacature: string;
  cvStatus: string;
  motivatie: string;
}): Promise<void> {
  const datum = datumNu();
  const inner = `
${adminHeader("Nieuwe sollicitatie", `${a.vacature} · binnengekomen ${datum}`)}
${GOLFBALK}
<tr><td style="padding:34px 36px 8px 36px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;">
    ${rij("Naam", escapeHtml(a.naam), true)}
    ${rij("E-mail", `<a href="mailto:${escapeHtml(a.email)}" style="color:#4E4030;text-decoration:underline;">${escapeHtml(a.email)}</a>`)}
    ${a.telefoon ? rij("Telefoon", `<a href="tel:${escapeHtml(a.telefoon)}" style="color:#4E4030;text-decoration:none;">${escapeHtml(a.telefoon)}</a>`) : ""}
    ${rij("CV", escapeHtml(a.cvStatus))}
  </table>
</td></tr>
${accentBlok("Motivatie", tekst(a.motivatie))}
${knop(`${SITE}/admin/sollicitaties`, "Open in de admin &nbsp;&rarr;")}
${FOOTER_ADMIN}`;
  await verstuur({
    from: FROM_ADMIN,
    to: NOTIFY,
    subject: `Nieuwe sollicitatie · ${a.vacature} — ${a.naam}`,
    html: omhulsel(
      `Nieuwe sollicitatie van ${a.naam} op de vacature ${a.vacature} — bekijk het dossier in de admin.`,
      inner,
    ),
  });
}

// ── 2. Bevestiging aan de sollicitant ─────────────────────────────────────────
export async function sendSollicitatieBevestiging(a: {
  to: string;
  voornaam: string;
  vacature: string;
  cvStatus: string;
  replyTo?: string;
}): Promise<void> {
  const datum = datumNu();
  const inner = `
${bevestigingHeader("Je sollicitatie<br>is binnen")}
${GOLFBALK}
<tr><td style="padding:36px 36px 4px 36px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#4E4030;mso-line-height-rule:exactly;line-height:27px;">
  Hoi ${escapeHtml(a.voornaam)},
  <div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div>
  Bedankt voor je sollicitatie op <strong style="color:#2E251A;">${escapeHtml(a.vacature)}</strong>. We hebben alles goed ontvangen.
  <div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div>
  We nemen 'm zorgvuldig door en je hoort <strong style="color:#2E251A;">binnen vijf werkdagen</strong> van ons — ook als het deze keer geen match is.
</td></tr>
<tr><td style="padding:28px 36px 0 36px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;background:#F4F1EA;">
    <tr>
      <td width="4" style="width:4px;background:#F15822;font-size:0;line-height:0;">&nbsp;</td>
      <td style="padding:22px 24px;font-family:Arial,Helvetica,sans-serif;">
        <div style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#8B7B64;padding-bottom:12px;">Wat we ontvingen</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
          <tr><td width="110" style="width:110px;padding:0 0 8px 0;font-size:14px;color:#8B7B64;line-height:20px;">Vacature</td><td style="padding:0 0 8px 0;font-size:14px;color:#2E251A;font-weight:bold;line-height:20px;">${escapeHtml(a.vacature)}</td></tr>
          <tr><td width="110" style="width:110px;padding:0 0 8px 0;font-size:14px;color:#8B7B64;line-height:20px;">Ingediend op</td><td style="padding:0 0 8px 0;font-size:14px;color:#4E4030;line-height:20px;">${escapeHtml(datum)}</td></tr>
          <tr><td width="110" style="width:110px;padding:0;font-size:14px;color:#8B7B64;line-height:20px;">Bijlage</td><td style="padding:0;font-size:14px;color:#4E4030;line-height:20px;">${escapeHtml(a.cvStatus)}</td></tr>
        </table>
      </td>
    </tr>
  </table>
</td></tr>
${stappen("Hoe het verder gaat", [
  "We lezen je sollicitatie en koppelen binnen vijf werkdagen terug.",
  "Klikt het? Dan plannen we een kennismaking van een half uur — bij ons of digitaal.",
  "Daarna een verdiepend gesprek met het team waar je terechtkomt.",
])}
${knop(`${SITE}/over-ons`, "Maak vast kennis met het team", "32px 36px 0 36px")}
<tr><td style="padding:30px 36px 36px 36px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#4E4030;mso-line-height-rule:exactly;line-height:24px;">
  Vragen in de tussentijd? Antwoord gerust op deze mail of bel <a href="tel:${TEL}" style="color:#F15822;text-decoration:none;font-weight:bold;">${TEL_DISPLAY}</a>.
  <div style="height:18px;line-height:18px;font-size:0;">&nbsp;</div>
  Tot snel,<br><strong style="color:#2E251A;">Team The New Wave IT</strong>
</td></tr>
${footerPubliek("Je ontvangt deze mail omdat je hebt gesolliciteerd via onze website. Je gegevens bewaren we maximaal vier weken na afronding van de procedure")}`;
  await verstuur({
    from: FROM_PUBLIC,
    to: a.to,
    replyTo: a.replyTo || NOTIFY,
    subject: `We hebben je sollicitatie ontvangen · ${a.vacature}`,
    html: omhulsel(
      `We hebben je sollicitatie op ${a.vacature} goed ontvangen. Binnen vijf werkdagen hoor je van ons.`,
      inner,
    ),
  });
}

// ── 3. Interne notificatie · nieuwe aanvraag ──────────────────────────────────
export async function sendAanvraagNotificatie(a: {
  naam: string;
  organisatie: string;
  email: string;
  telefoon: string;
  onderwerp: string;
  bericht: string;
}): Promise<void> {
  const datum = datumNu();
  const meta = `${a.organisatie || a.naam} · binnengekomen ${datum}`;
  const inner = `
${adminHeader("Nieuwe aanvraag", meta)}
${GOLFBALK}
<tr><td style="padding:34px 36px 8px 36px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;font-family:Arial,Helvetica,sans-serif;">
    ${rij("Naam", escapeHtml(a.naam), true)}
    ${a.organisatie ? rij("Organisatie", escapeHtml(a.organisatie)) : ""}
    ${rij("E-mail", `<a href="mailto:${escapeHtml(a.email)}" style="color:#4E4030;text-decoration:underline;">${escapeHtml(a.email)}</a>`)}
    ${a.telefoon ? rij("Telefoon", `<a href="tel:${escapeHtml(a.telefoon)}" style="color:#4E4030;text-decoration:none;">${escapeHtml(a.telefoon)}</a>`) : ""}
    ${a.onderwerp ? rij("Onderwerp", escapeHtml(a.onderwerp)) : ""}
  </table>
</td></tr>
${accentBlok("Vraag", tekst(a.bericht))}
${knop(`${SITE}/admin/aanvragen`, "Open in de admin &nbsp;&rarr;")}
${FOOTER_ADMIN}`;
  await verstuur({
    from: FROM_ADMIN,
    to: NOTIFY,
    subject: `Nieuwe aanvraag · ${a.organisatie || a.naam}${a.onderwerp ? ` — ${a.onderwerp}` : ""}`,
    html: omhulsel(
      `Nieuwe aanvraag van ${a.organisatie || a.naam}${a.onderwerp ? ` over ${a.onderwerp}` : ""} — pak op binnen één werkdag.`,
      inner,
    ),
  });
}

// ── 4. Bevestiging aan de aanvrager ───────────────────────────────────────────
export async function sendAanvraagBevestiging(a: {
  to: string;
  voornaam: string;
  onderwerp: string;
  bericht: string;
  replyTo?: string;
}): Promise<void> {
  const datum = datumNu();
  const onderwerp = a.onderwerp || "je aanvraag";
  const inner = `
${bevestigingHeader("Je aanvraag<br>is binnen")}
${GOLFBALK}
<tr><td style="padding:36px 36px 4px 36px;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#4E4030;mso-line-height-rule:exactly;line-height:27px;">
  Hoi ${escapeHtml(a.voornaam)},
  <div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div>
  Bedankt voor je bericht. We hebben je aanvraag over <strong style="color:#2E251A;">${escapeHtml(onderwerp)}</strong> ontvangen en leggen 'm bij de juiste collega neer.
  <div style="height:16px;line-height:16px;font-size:0;">&nbsp;</div>
  Je hoort <strong style="color:#2E251A;">binnen één werkdag</strong> van ons.
</td></tr>
<tr><td style="padding:28px 36px 0 36px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="width:100%;border-collapse:collapse;background:#F4F1EA;">
    <tr>
      <td width="4" style="width:4px;background:#F15822;font-size:0;line-height:0;">&nbsp;</td>
      <td style="padding:22px 24px;font-family:Arial,Helvetica,sans-serif;">
        <div style="font-family:'Courier New',Courier,monospace;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#8B7B64;padding-bottom:12px;">Je aanvraag</div>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-collapse:collapse;">
          <tr><td width="110" style="width:110px;padding:0 0 8px 0;vertical-align:top;font-size:14px;color:#8B7B64;line-height:20px;">Onderwerp</td><td style="padding:0 0 8px 0;font-size:14px;color:#2E251A;font-weight:bold;line-height:20px;">${escapeHtml(onderwerp)}</td></tr>
          <tr><td width="110" style="width:110px;padding:0 0 8px 0;vertical-align:top;font-size:14px;color:#8B7B64;line-height:20px;">Ingediend op</td><td style="padding:0 0 8px 0;font-size:14px;color:#4E4030;line-height:20px;">${escapeHtml(datum)}</td></tr>
          <tr><td width="110" style="width:110px;padding:0;vertical-align:top;font-size:14px;color:#8B7B64;line-height:20px;">Je bericht</td><td style="padding:0;font-size:14px;color:#4E4030;line-height:20px;">${tekst(a.bericht)}</td></tr>
        </table>
      </td>
    </tr>
  </table>
</td></tr>
${stappen("Hoe het verder gaat", [
  "Een consultant met de juiste ervaring pakt je vraag op — binnen één werkdag.",
  "In een kort gesprek scherpen we samen de vraag en de scope aan.",
  "Je krijgt een concreet voorstel met aanpak, team en doorlooptijd.",
])}
${knop(`${SITE}/klantverhalen`, "Bekijk hoe we dit voor anderen deden", "32px 36px 0 36px")}
<tr><td style="padding:30px 36px 36px 36px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#4E4030;mso-line-height-rule:exactly;line-height:24px;">
  Kan het niet wachten? Bel <a href="tel:${TEL}" style="color:#F15822;text-decoration:none;font-weight:bold;">${TEL_DISPLAY}</a>.
  <div style="height:18px;line-height:18px;font-size:0;">&nbsp;</div>
  Tot snel,<br><strong style="color:#2E251A;">Team The New Wave IT</strong>
</td></tr>
${footerPubliek("Je ontvangt deze mail omdat je een aanvraag hebt gedaan via onze website")}`;
  await verstuur({
    from: FROM_PUBLIC,
    to: a.to,
    replyTo: a.replyTo || NOTIFY,
    subject: "We hebben je aanvraag ontvangen · The New Wave IT",
    html: omhulsel(
      "Je aanvraag is binnen. Binnen één werkdag neemt een van ons persoonlijk contact met je op.",
      inner,
    ),
  });
}
