import Link from "next/link";
import { requireAdmin } from "@/lib/dal";
import { getLeads, getSollicitaties, STATUS_LABEL } from "@/lib/cms/inzendingen";
import { SeedButton } from "@/components/admin/seed-button";

function Chip({ status }: { status: string }) {
  const cls = status === "nieuw" ? "nieuw" : status === "afgerond" ? "klaar" : "bezig";
  return (
    <span className={`chip ${cls}`}>
      <span className="dot" />
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

export default async function AdminDashboard() {
  const user = await requireAdmin();
  const [leads, sols] = await Promise.all([getLeads(), getSollicitaties()]);

  const naam = (user.user_metadata?.naam as string) || user.email?.split("@")[0] || "";
  const nieuweAanvragen = leads.filter((l) => l.status === "nieuw").length;
  const openAanvragen = leads.filter((l) => l.status !== "afgerond").length;
  const inBehandeling = leads.filter((l) => l.status === "in_behandeling").length;
  const nieuweSols = sols.filter((s) => s.status === "nieuw").length;
  const openSols = sols.filter((s) => s.status !== "afgerond").length;

  return (
    <>
      <div className="crumb">Overzicht</div>
      <div className="page-head">
        <div>
          <h1>Goedendag{naam ? `, ${naam}` : ""}</h1>
          <p className="sub">Dit staat er open sinds je laatste bezoek.</p>
        </div>
        <SeedButton />
      </div>

      <div className="kpis">
        <div className="card kpi">
          <div className="lbl">Nieuwe aanvragen</div>
          <div className="val">{nieuweAanvragen}</div>
          <div className="delta">nog niet opgepakt</div>
        </div>
        <div className="card kpi">
          <div className="lbl">Open aanvragen</div>
          <div className="val">{openAanvragen}</div>
          <div className="delta">in behandeling: {inBehandeling}</div>
        </div>
        <div className="card kpi">
          <div className="lbl">Nieuwe sollicitaties</div>
          <div className="val">{nieuweSols}</div>
          <div className="delta">open in totaal: {openSols}</div>
        </div>
        <div className="card kpi">
          <div className="lbl">Totaal inzendingen</div>
          <div className="val">{leads.length + sols.length}</div>
          <div className="delta">aanvragen + sollicitaties</div>
        </div>
      </div>

      <div className="dash2">
        <div className="card">
          <div className="chead">
            <h3>Laatste aanvragen</h3>
            <Link href="/admin/aanvragen">Alle aanvragen →</Link>
          </div>
          <table>
            <tbody>
              {leads.slice(0, 5).map((l) => (
                <tr key={l.id}>
                  <td>
                    <div className="t-title">{l.naam}</div>
                    <div className="t-sub">{l.bedrijf ?? l.email}</div>
                  </td>
                  <td>
                    <Chip status={l.status} />
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td>
                    <div className="empty">Nog geen aanvragen.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="chead">
            <h3>Sollicitaties in beweging</h3>
            <Link href="/admin/sollicitaties">Pipeline →</Link>
          </div>
          <table>
            <tbody>
              {sols
                .filter((s) => s.status !== "afgerond")
                .slice(0, 5)
                .map((s) => (
                  <tr key={s.id}>
                    <td>
                      <div className="t-title">{s.naam}</div>
                      <div className="t-sub">{s.vacature_slug}</div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <Chip status={s.status} />
                    </td>
                  </tr>
                ))}
              {sols.length === 0 && (
                <tr>
                  <td>
                    <div className="empty">Nog geen sollicitaties.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
