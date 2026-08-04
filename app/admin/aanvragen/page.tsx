import { requireAdmin } from "@/lib/dal";
import { getLeads } from "@/lib/cms/inzendingen";
import { listGebruikers, gebruikersBeschikbaar } from "@/lib/cms/gebruikers";
import { AanvragenBoard } from "@/components/admin/aanvragen-board";

export default async function AanvragenPage() {
  await requireAdmin();
  const leads = await getLeads();
  // Eigenaar-opties uit de echte gebruikers (indien beschikbaar), zodat de lijst
  // meebeweegt met het team i.p.v. hardgecodeerde namen.
  let eigenaren: string[] = [];
  if (gebruikersBeschikbaar()) {
    try {
      eigenaren = (await listGebruikers()).filter((g) => g.actief).map((g) => g.naam);
    } catch {
      eigenaren = [];
    }
  }
  return (
    <>
      <div className="crumb">Opvolging</div>
      <div className="page-head">
        <div>
          <h1>Aanvragen</h1>
          <p className="sub">Alles wat via het contactformulier en de site binnenkomt.</p>
        </div>
      </div>
      <AanvragenBoard leads={leads} eigenaren={eigenaren} />
    </>
  );
}
