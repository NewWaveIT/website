import { requireAdmin } from "@/lib/dal";
import { gebruikersBeschikbaar, listGebruikers, type Gebruiker } from "@/lib/cms/gebruikers";
import { GebruikersBeheer } from "@/components/admin/gebruikers-beheer";

export default async function GebruikersPage() {
  const user = await requireAdmin();

  if (!gebruikersBeschikbaar()) {
    return (
      <>
        <div className="crumb">Beheer</div>
        <div className="page-head">
          <div>
            <h1>Gebruikers</h1>
            <p className="sub">Beheer wie toegang heeft tot het CMS.</p>
          </div>
        </div>
        <div className="card" style={{ padding: "var(--space-6)", maxWidth: 640 }}>
          <h3 style={{ fontSize: "var(--text-base)", fontWeight: "var(--fw-bold)", marginBottom: "var(--space-3)" }}>
            Nog één stap nodig
          </h3>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.7, margin: 0 }}>
            Gebruikersbeheer gebruikt de Supabase Auth Admin API. Stel daarvoor de server-omgevingsvariabele{" "}
            <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", background: "var(--ink-50)", padding: "2px 6px", borderRadius: "var(--radius-sm)" }}>
              SUPABASE_SERVICE_ROLE_KEY
            </code>{" "}
            in — lokaal in <code style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)" }}>.env.local</code> en in Vercel bij de
            projectinstellingen. Herstart daarna de server. De sleutel vind je in Supabase onder{" "}
            <em>Project Settings → API → service_role</em>.
          </p>
        </div>
      </>
    );
  }

  let gebruikers: Gebruiker[] = [];
  let fout: string | null = null;
  try {
    gebruikers = await listGebruikers();
  } catch (e) {
    fout = e instanceof Error ? e.message : "Kon gebruikers niet laden.";
  }

  return (
    <>
      <div className="crumb">Beheer</div>
      {fout ? (
        <>
          <div className="page-head">
            <div>
              <h1>Gebruikers</h1>
            </div>
          </div>
          <div className="err">{fout}</div>
        </>
      ) : (
        <GebruikersBeheer gebruikers={gebruikers} currentUserId={user.id} />
      )}
    </>
  );
}
