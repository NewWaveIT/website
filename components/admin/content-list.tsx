import Link from "next/link";
import { Plus } from "lucide-react";
import type { ContentRow, ContentType } from "@/lib/cms/content";

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export function AdminContentList({
  type,
  crumb,
  titel,
  sub,
  rows,
}: {
  type: ContentType;
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
        <Link href={`/admin/content/${type}/new`} className="btn btn-primary">
          <Plus /> Nieuw
        </Link>
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
              <tr key={r.id} className="clickable">
                <td>
                  <Link href={`/admin/content/${type}/${r.id}`} className="t-title">
                    {r.titel}
                  </Link>
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
                  <div className="empty">Nog geen items. Klik op ‘Nieuw’ om er een aan te maken.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
