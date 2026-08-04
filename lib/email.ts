import "server-only";

/**
 * Interne notificatiemails via Resend. Bewust dependency-vrij (directe REST-call)
 * en fail-safe: als er geen RESEND_API_KEY is geconfigureerd, of het versturen
 * mislukt, gooit deze functie NOOIT — de inzending zelf mag er nooit op stuklopen.
 *
 * Configuratie (env):
 *   RESEND_API_KEY   Server-only API-key van Resend.
 *   NOTIFY_EMAIL     Ontvanger (default: people@thenewwaveit.com).
 *   MAIL_FROM        Afzender op een geverifieerd domein
 *                    (default: "The New Wave IT <notificaties@thenewwaveit.com>").
 */

interface NotificatieRegel {
  label: string;
  value: string | null | undefined;
}

interface NotificatieArgs {
  subject: string;
  heading: string;
  rows: NotificatieRegel[];
  /** Pad in de admin waar de inzending te vinden is, bv. "/admin/aanvragen". */
  adminPath: string;
}

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendInterneNotificatie(args: NotificatieArgs): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL || "people@thenewwaveit.com";
  const from = process.env.MAIL_FROM || "The New Wave IT <notificaties@thenewwaveit.com>";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://thenewwaveit.com";

  if (!key) {
    // Niet geconfigureerd: overslaan, maar wél zichtbaar in de logs.
    console.warn(`[email] RESEND_API_KEY ontbreekt — notificatie overgeslagen: ${args.subject}`);
    return;
  }

  const adminUrl = `${site.replace(/\/$/, "")}${args.adminPath}`;
  const rowsHtml = args.rows
    .filter((r) => r.value)
    .map(
      (r) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6b5b47;font-size:14px;vertical-align:top;white-space:nowrap;">${escapeHtml(
          r.label,
        )}</td><td style="padding:6px 0;color:#2e251a;font-size:14px;">${escapeHtml(
          String(r.value),
        )}</td></tr>`,
    )
    .join("");

  const html = `<!doctype html><html><body style="margin:0;background:#f4f1ea;padding:24px;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e0d8c9;border-radius:14px;overflow:hidden;">
    <div style="background:#2e251a;padding:20px 28px;border-bottom:3px solid #f15822;">
      <div style="color:#f47c4d;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">The New Wave IT · Admin</div>
      <div style="color:#fff;font-size:20px;font-weight:800;margin-top:4px;">${escapeHtml(args.heading)}</div>
    </div>
    <div style="padding:24px 28px;">
      <table style="border-collapse:collapse;width:100%;">${rowsHtml}</table>
      <a href="${escapeHtml(adminUrl)}" style="display:inline-block;margin-top:24px;background:#f15822;color:#fff;text-decoration:none;font-weight:600;font-size:14px;padding:12px 20px;border-radius:8px;">Open in de admin</a>
    </div>
  </div>
  <div style="max-width:560px;margin:12px auto 0;color:#8b7b64;font-size:12px;text-align:center;">Automatische melding vanaf de website.</div>
  </body></html>`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to, subject: args.subject, html }),
    });
    if (!res.ok) {
      console.error(`[email] Resend gaf ${res.status}: ${await res.text()}`);
    }
  } catch (e) {
    console.error("[email] versturen mislukt:", e);
  }
}
