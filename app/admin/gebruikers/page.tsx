import { requireAdmin } from "@/lib/dal";
import { gebruikersBeschikbaar, listGebruikers, type Gebruiker } from "@/lib/cms/gebruikers";
import { GebruikersBeheer } from "@/components/admin/gebruikers-beheer";

function Notice({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <>
      <div className="crumb">Beheer</div>
      <div className="page-head">
        <div>
          <h1>Gebruikers</h1>
          <p className="sub">Beheer wie toegang heeft tot het CMS.</p>
        </div>
      </div>
      <div className="card" style={{ padding: "var(--space-6)", maxWidth: 660 }}>
        <h3
          style={{
            fontSize: "var(--text-base)",
            fontWeight: "var(--fw-bold)",
            marginBottom: "var(--space-3)",
          }}
        >
          {titel}
        </h3>
        <div style={{ fontSize: "var(--text-sm)", color: "var(--text-body)", lineHeight: 1.7 }}>
          {children}
        </div>
      </div>
    </>
  );
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code
    style={{
      fontFamily: "var(--font-mono)",
      fontSize: "var(--text-xs)",
      background: "var(--ink-50)",
      padding: "2px 6px",
      borderRadius: "var(--radius-sm)",
    }}
  >
    {children}
  </code>
);

export default async function GebruikersPage() {
  const user = await requireAdmin();

  if (!gebruikersBeschikbaar()) {
    return (
      <Notice titel="Nog één stap nodig">
        <p style={{ margin: 0 }}>
          Gebruikersbeheer gebruikt de Supabase Auth Admin API. Stel daarvoor de
          server-omgevingsvariabele <Code>SUPABASE_SERVICE_ROLE_KEY</Code> in. Lokaal in{" "}
          <Code>.env.local</Code> en in Vercel bij de projectinstellingen. Herstart daarna de
          server. De sleutel vind je in Supabase onder{" "}
          <em>Project Settings → API → service_role</em>.
        </p>
      </Notice>
    );
  }

  let gebruikers: Gebruiker[] = [];
  let fout: string | null = null;
  try {
    gebruikers = await listGebruikers();
  } catch (e) {
    fout = e instanceof Error ? e.message : "Kon gebruikers niet laden.";
  }

  if (fout) {
    const sleutelProbleem = /api key|invalid|jwt|unauthor|not allowed|permission|401|403/i.test(
      fout,
    );
    return (
      <Notice
        titel={
          sleutelProbleem ? "De service_role-sleutel lijkt ongeldig" : "Kon gebruikers niet laden"
        }
      >
        {sleutelProbleem ? (
          <p style={{ margin: 0 }}>
            Supabase gaf terug: <Code>{fout}</Code>. Controleer of{" "}
            <Code>SUPABASE_SERVICE_ROLE_KEY</Code> exact de <strong>service_role</strong>-sleutel is
            (níet de <em>anon</em>-sleutel), volledig gekopieerd en zonder aanhalingstekens. Te
            vinden in Supabase onder <em>Project Settings → API → service_role</em>. Herstart de
            server na het wijzigen.
          </p>
        ) : (
          <p style={{ margin: 0 }}>
            Foutmelding: <Code>{fout}</Code>
          </p>
        )}
      </Notice>
    );
  }

  return <GebruikersBeheer gebruikers={gebruikers} currentUserId={user.id} />;
}
