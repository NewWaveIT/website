import { requireAdmin } from "@/lib/dal";
import { getLeads } from "@/lib/cms/inzendingen";
import { AanvragenBoard } from "@/components/admin/aanvragen-board";

export default async function AanvragenPage() {
  await requireAdmin();
  const leads = await getLeads();
  return (
    <>
      <div className="crumb">Opvolging</div>
      <div className="page-head">
        <div>
          <h1>Aanvragen</h1>
          <p className="sub">Alles wat via het contactformulier en de site binnenkomt.</p>
        </div>
      </div>
      <AanvragenBoard leads={leads} />
    </>
  );
}
