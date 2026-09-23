import Link from "next/link";
import { type AuditActie, type AuditRow } from "@/lib/cms/audit";
import { ADMIN_PADEN } from "@/lib/cms/admin-paden";
import { CONTENT_TABLE, type ContentType } from "@/lib/cms/content";

/**
 * De activiteitentabel.
 *
 * Los van de pagina zodat /ontwerp hem met verzonnen regels kan tonen; zonder
 * dat is dit scherm alleen te bekijken met een database erachter, en dan zie je
 * bijvoorbeeld niet dat hij op een telefoon in vier kolommen bleef staan.
 */
const isType = (s: string): s is ContentType => s in CONTENT_TABLE;

const ACTIE_CLASS: Record<AuditActie, string> = {
  aangemaakt: "live",
  bijgewerkt: "concept",
  verwijderd: "nieuw",
  gesynchroniseerd: "concept",
};

function fmt(iso: string): string {
  try {
    return new Date(iso).toLocaleString("nl-NL", {
      timeZone: "Europe/Amsterdam",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function ActiviteitTabel({ rows }: { rows: AuditRow[] }) {
  return (
    <div className="card">
      <table className="tabel-stapel">
        <thead>
          <tr>
            <th>Wanneer</th>
            <th>Gebruiker</th>
            <th>Actie</th>
            <th>Item</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const pad = isType(r.content_type) ? ADMIN_PADEN[r.content_type] : undefined;
            return (
              <tr key={r.id}>
                <td className="t-nowrap" data-kop="Wanneer">
                  {fmt(r.tijdstip)}
                </td>
                <td>
                  <div className="t-title">{r.gebruiker_naam ?? "—"}</div>
                  {r.gebruiker_email && <div className="t-sub">{r.gebruiker_email}</div>}
                </td>
                <td>
                  <span className={`chip ${ACTIE_CLASS[r.actie] ?? "concept"}`}>
                    <span className="dot" />
                    {r.actie}
                  </span>
                </td>
                <td>
                  <div className="t-title">
                    {pad ? (
                      <Link href={pad.lijst} className="acty-link">
                        {r.titel ?? r.slug ?? "—"}
                      </Link>
                    ) : (
                      (r.titel ?? r.slug ?? "—")
                    )}
                  </div>
                  <div className="t-sub">
                    {pad?.label ?? r.content_type}
                    {r.slug ? ` · /${r.slug}` : ""}
                  </div>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={4}>
                <div className="empty">
                  Nog geen activiteit, of de audit-tabel is nog niet aangemaakt. Voer de migratie{" "}
                  <code className="inline-code">20260729120000_audit.sql</code> uit in Supabase.
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
