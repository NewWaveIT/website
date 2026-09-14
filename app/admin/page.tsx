import Link from "next/link";
import { FileEdit, Inbox, Plus, UserCheck } from "lucide-react";
import { requireAdmin } from "@/lib/dal";
import { getLeads, getSollicitaties } from "@/lib/cms/inzendingen";
import { getConcepten, getStatusTellingen } from "@/lib/cms/dashboard";
import { ADMIN_PADEN, bewerkPad } from "@/lib/cms/admin-paden";
import { AUDIT_STAART, AUDIT_WERKWOORD, listAudit } from "@/lib/cms/audit";
import type { ContentType } from "@/lib/cms/content";
import { updateLead } from "@/app/admin/aanvragen/actions";
import { updateSollicitatie } from "@/app/admin/sollicitaties/actions";
import { publiceerContent } from "@/app/admin/content/actions";
import { DashboardActie } from "@/components/admin/dashboard-actie";

/** Datum als "Vandaag 08:41" / "Gisteren" / "8 sep", altijd in NL-tijd. */
function wanneer(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  const nu = new Date();
  const dag = (x: Date) =>
    x.toLocaleDateString("nl-NL", { timeZone: "Europe/Amsterdam", dateStyle: "short" });
  const tijd = d.toLocaleTimeString("nl-NL", {
    timeZone: "Europe/Amsterdam",
    hour: "2-digit",
    minute: "2-digit",
  });
  if (dag(d) === dag(nu)) return `Vandaag ${tijd}`;
  const gisteren = new Date(nu.getTime() - 86_400_000);
  if (dag(d) === dag(gisteren)) return "Gisteren";
  return d.toLocaleDateString("nl-NL", {
    timeZone: "Europe/Amsterdam",
    day: "numeric",
    month: "short",
  });
}

/** De contenttypen op de balk "Wat staat er op de site", in de volgorde van de zijbalk. */
const OVERZICHT: ContentType[] = [
  "paginas",
  "diensten",
  "services",
  "sectoren",
  "proposities",
  "cases",
  "artikelen",
  "teamleden",
  "vacatures",
];

/**
 * Wat er staat als de database de dashboardfuncties niet kent. Beter dan negen
 * regels "0 live": dat leest als een lege site.
 */
const ONBEKEND =
  "De aantallen zijn nu niet op te halen. Draai supabase/scripts/20260914-admin-dashboard.sql in de SQL Editor als dit blijft staan.";

/** Waar een snelknop een nieuw item aanmaakt. */
const SNELKNOPPEN: ContentType[] = ["cases", "artikelen", "vacatures"];

export default async function AdminDashboard() {
  const user = await requireAdmin();
  const [leads, sols, tellingenOfNiets, conceptenOfNiets, audit] = await Promise.all([
    getLeads(),
    getSollicitaties(),
    getStatusTellingen(),
    getConcepten(6),
    listAudit(5),
  ]);

  // De twee dashboardfuncties in de database geven `null` als ze er niet zijn.
  // Dan weten we het niet, en dat is iets anders dan nul — zonder dit
  // onderscheid meldde het dashboard doodleuk dat er geen enkele pagina live
  // stond terwijl de site gewoon draaide.
  const tellingenOnbekend = tellingenOfNiets === null;
  const tellingen = tellingenOfNiets ?? {};
  const concepten = conceptenOfNiets ?? [];

  const naam = (user.user_metadata?.naam as string) || user.email?.split("@")[0] || "";
  const nieuweLeads = leads.filter((l) => l.status === "nieuw");
  const nieuweSols = sols.filter((s) => s.status === "nieuw");
  const inBehandeling = leads.filter((l) => l.status === "in_behandeling");
  const openSols = sols.filter((s) => s.status !== "afgerond");
  const liveVacatures = tellingen.vacatures?.live ?? 0;
  const wachtrij = nieuweLeads.length + nieuweSols.length;
  const conceptTotaal = OVERZICHT.reduce((n, t) => n + (tellingen[t]?.concept ?? 0), 0);

  const samenvatting = tellingenOnbekend
    ? "De contentaantallen zijn nu niet op te halen."
    : wachtrij === 0 && conceptTotaal === 0
      ? "Alles is opgepakt. Geen openstaande acties."
      : [
          wachtrij > 0 && `${wachtrij} ${wachtrij === 1 ? "item vraagt" : "items vragen"} om actie`,
          conceptTotaal > 0 &&
            `${conceptTotaal} ${conceptTotaal === 1 ? "concept wacht" : "concepten wachten"} op publicatie`,
        ]
          .filter(Boolean)
          .join(" · ");

  return (
    <>
      <div className="crumb">Overzicht</div>
      <div className="page-head">
        <div>
          <h1>Goedendag{naam ? `, ${naam}` : ""}</h1>
          <p className="sub">{samenvatting}</p>
        </div>
        <div className="quick">
          {SNELKNOPPEN.map((t) => (
            <Link key={t} href={bewerkPad(t, "new")}>
              <Plus /> {ADMIN_PADEN[t].label}
            </Link>
          ))}
        </div>
      </div>

      <div className="kpis">
        <Link className="card kpi" href="/admin/aanvragen">
          <div className="lbl">Nieuwe aanvragen</div>
          <div className="val">{nieuweLeads.length}</div>
          <div className="delta">nog niet opgepakt</div>
        </Link>
        <Link className="card kpi" href="/admin/aanvragen">
          <div className="lbl">In behandeling</div>
          <div className="val">{inBehandeling.length}</div>
          <div className="delta">
            {inBehandeling.filter((l) => !l.toegewezen_aan).length} zonder eigenaar
          </div>
        </Link>
        <Link className="card kpi" href="/admin/sollicitaties">
          <div className="lbl">Sollicitaties open</div>
          <div className="val">{openSols.length}</div>
          <div className="delta">
            op {liveVacatures} live {liveVacatures === 1 ? "vacature" : "vacatures"}
          </div>
        </Link>
        <Link
          className="card kpi"
          href={concepten[0] ? ADMIN_PADEN[concepten[0].soort].lijst : "/admin/paginas"}
        >
          <div className="lbl">Concepten</div>
          <div className="val">{conceptTotaal}</div>
          <div className="delta">wachten op publicatie</div>
        </Link>
      </div>

      <div className="dash2">
        <div className="dash-col">
          <div className="card">
            <div className="chead">
              <h3>Vraagt om jouw actie</h3>
              <Link href="/admin/aanvragen">Alle aanvragen →</Link>
            </div>
            {wachtrij === 0 ? (
              <div className="empty">
                Niets openstaand. Alle aanvragen en sollicitaties zijn opgepakt.
              </div>
            ) : (
              <>
                {nieuweLeads.map((l) => (
                  <Link className="act" key={l.id} href={`/admin/aanvragen?open=${l.id}`}>
                    <span className="ic" data-kind="lead">
                      <Inbox />
                    </span>
                    <span className="bd">
                      <span className="t">
                        {l.naam}
                        {l.bedrijf ? ` · ${l.bedrijf}` : ""}
                      </span>
                      <span className="s">{l.bericht}</span>
                    </span>
                    <span className="age">{wanneer(l.created_at)}</span>
                    <DashboardActie
                      label="Oppakken"
                      bezigLabel="Bezig…"
                      onActie={async () => {
                        "use server";
                        return updateLead(l.id, { status: "in_behandeling" });
                      }}
                    />
                  </Link>
                ))}
                {nieuweSols.map((s) => (
                  <Link className="act" key={s.id} href={`/admin/sollicitaties?open=${s.id}`}>
                    <span className="ic" data-kind="sol">
                      <UserCheck />
                    </span>
                    <span className="bd">
                      <span className="t">{s.naam}</span>
                      <span className="s">{s.vacature_slug}</span>
                    </span>
                    <span className="age">{wanneer(s.created_at)}</span>
                    <DashboardActie
                      label="Naar screening"
                      bezigLabel="Bezig…"
                      onActie={async () => {
                        "use server";
                        return updateSollicitatie(s.id, { status: "screening" });
                      }}
                    />
                  </Link>
                ))}
              </>
            )}
          </div>

          <div className="card">
            <div className="chead">
              <h3>Klaar om te publiceren</h3>
              {!tellingenOnbekend && (
                <span className="age">
                  {conceptTotaal} {conceptTotaal === 1 ? "concept" : "concepten"}
                </span>
              )}
            </div>
            {tellingenOnbekend ? (
              <div className="empty">{ONBEKEND}</div>
            ) : concepten.length === 0 ? (
              <div className="empty">Geen concepten. Alles staat live.</div>
            ) : (
              concepten.map((c) => (
                <Link className="act" key={`${c.soort}-${c.id}`} href={bewerkPad(c.soort, c.id)}>
                  <span className="ic" data-kind="concept">
                    <FileEdit />
                  </span>
                  <span className="bd">
                    <span className="t">{c.titel}</span>
                    <span className="s">
                      {ADMIN_PADEN[c.soort].label} · bewerkt {wanneer(c.bijgewerktOp)}
                      {c.bewerktDoor ? ` · ${c.bewerktDoor}` : ""}
                    </span>
                  </span>
                  <DashboardActie
                    label="Publiceer"
                    bezigLabel="Bezig…"
                    onActie={async () => {
                      "use server";
                      return publiceerContent(c.soort, c.id);
                    }}
                  />
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="dash-col">
          <div className="card">
            <div className="chead">
              <h3>Wat staat er op de site</h3>
            </div>
            {tellingenOnbekend && <div className="empty">{ONBEKEND}</div>}
            <div className="clist">
              {!tellingenOnbekend &&
                OVERZICHT.map((t) => {
                  const { live = 0, concept = 0 } = tellingen[t] ?? {};
                  const totaal = live + concept;
                  return (
                    <Link className="crow" key={t} href={ADMIN_PADEN[t].lijst}>
                      <span className="cnm">{ADMIN_PADEN[t].meervoud}</span>
                      <span className="cct">
                        {live} live{concept ? ` · ${concept} concept` : ""}
                      </span>
                      <span className="track" aria-hidden="true">
                        <i style={{ width: totaal ? `${(live / totaal) * 100}%` : 0 }} />
                        <i
                          className="draft"
                          style={{ width: totaal ? `${(concept / totaal) * 100}%` : 0 }}
                        />
                      </span>
                    </Link>
                  );
                })}
            </div>
            {!tellingenOnbekend && (
              <div className="legend">
                <span>
                  <b /> Live
                </span>
                <span>
                  <b className="draft" /> Concept
                </span>
              </div>
            )}
          </div>

          <div className="card">
            <div className="chead">
              <h3>Recente activiteit</h3>
              <Link href="/admin/activiteit">Alles →</Link>
            </div>
            {audit.length === 0 ? (
              <div className="empty">Nog geen activiteit.</div>
            ) : (
              <div className="tl">
                {audit.map((a) => (
                  <div className="ev" key={a.id}>
                    <span className="when">{wanneer(a.tijdstip)}</span>
                    {a.gebruiker_naam ?? "Iemand"} {AUDIT_WERKWOORD[a.actie]}{" "}
                    <strong>{a.titel ?? a.slug ?? a.content_type}</strong>
                    {AUDIT_STAART[a.actie] ? ` ${AUDIT_STAART[a.actie]}` : ""}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
