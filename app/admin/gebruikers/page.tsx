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
      <div className="card melding">
        <h3>{titel}</h3>
        <div className="melding-tekst">{children}</div>
      </div>
    </>
  );
}

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="inline-code">{children}</code>
);

export default async function GebruikersPage() {
  const user = await requireAdmin();

  if (!gebruikersBeschikbaar()) {
    return (
      <Notice titel="Nog één stap nodig">
        <p className="m-0">
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
          <p className="m-0">
            Supabase gaf terug: <Code>{fout}</Code>. Controleer of{" "}
            <Code>SUPABASE_SERVICE_ROLE_KEY</Code> exact de <strong>service_role</strong>-sleutel is
            (níet de <em>anon</em>-sleutel), volledig gekopieerd en zonder aanhalingstekens. Te
            vinden in Supabase onder <em>Project Settings → API → service_role</em>. Herstart de
            server na het wijzigen.
          </p>
        ) : (
          <p className="m-0">
            Foutmelding: <Code>{fout}</Code>
          </p>
        )}
      </Notice>
    );
  }

  return <GebruikersBeheer gebruikers={gebruikers} currentUserId={user.id} />;
}
