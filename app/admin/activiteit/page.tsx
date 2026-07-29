import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { listAudit, type AuditActie } from "@/lib/cms/audit";

const TYPE_LABEL: Record<string, string> = {
  paginas: "Pagina",
  cases: "Case",
  diensten: "Dienst",
  sectoren: "Sector",
  artikelen: "Inzicht",
  vacatures: "Vacature",
  teamleden: "Teamlid",
};

const ADMIN_PATH: Record<string, string> = {
  paginas: "/admin/paginas",
  cases: "/admin/cases",
  diensten: "/admin/diensten",
  sectoren: "/admin/sectoren",
  artikelen: "/admin/inzichten",
  vacatures: "/admin/vacatures",
  teamleden: "/admin/teamleden",
};

const ACTIE_CLASS: Record<AuditActie, string> = {
  aangemaakt: "live",
  bijgewerkt: "concept",
  verwijderd: "nieuw",
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

export default async function ActiviteitPage() {
  await requireAdmin();
  const rows = await listAudit(150);

  return (
    <>
      <div className="crumb">Beheer</div>
      <div className="page-head">
        <div>
          <h1>Activiteit</h1>
          <p className="sub">Wie heeft wat wanneer aangepast in het CMS.</p>
        </div>
      </div>

      <div className="card">
        <table>
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
              const adminPath = ADMIN_PATH[r.content_type];
              return (
                <tr key={r.id}>
                  <td style={{ whiteSpace: "nowrap" }}>{fmt(r.tijdstip)}</td>
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
                      {adminPath ? (
                        <Link href={adminPath} className="acty-link">
                          {r.titel ?? r.slug ?? "—"}
                        </Link>
                      ) : (
                        (r.titel ?? r.slug ?? "—")
                      )}
                    </div>
                    <div className="t-sub">
                      {TYPE_LABEL[r.content_type] ?? r.content_type}
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
                    Nog geen activiteit — of de audit-tabel is nog niet aangemaakt. Voer de migratie{" "}
                    <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>
                      20260729120000_audit.sql
                    </code>{" "}
                    uit in Supabase.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
