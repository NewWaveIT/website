import type { ContentRow } from "@/lib/cms/content";

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export function AdminContentList({
  crumb,
  titel,
  sub,
  rows,
}: {
  crumb: string;
  titel: string;
  sub: string;
  rows: ContentRow[];
}) {
  return (
    <>
      <div className="crumb">{crumb}</div>
      <div className="page-head">
        <div>
          <h1>{titel}</h1>
          <p className="sub">{sub}</p>
        </div>
      </div>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Titel</th>
              <th>Status</th>
              <th style={{ textAlign: "right" }}>Laatst bewerkt</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <div className="t-title">{r.titel}</div>
                  <div className="t-sub">/{r.slug}</div>
                </td>
                <td>
                  <span className={`chip ${r.status === "live" ? "live" : "concept"}`}>
                    <span className="dot" />
                    {r.status === "live" ? "Live" : "Concept"}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  {fmt(r.bijgewerkt_op)}
                  {r.bewerkt_door ? ` · ${r.bewerkt_door}` : ""}
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <div className="empty">
                    Nog geen items. Vul de Supabase-tabel of draai de seed.
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
