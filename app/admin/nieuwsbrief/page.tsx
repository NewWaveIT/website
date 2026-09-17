import { requireAdmin } from "@/lib/dal";
import { getInzichtenLeads } from "@/lib/cms/inzendingen";
import { NieuwsbriefLijst } from "@/components/admin/nieuwsbrief-lijst";

export default async function NieuwsbriefPage() {
  await requireAdmin();
  const leads = await getInzichtenLeads();
  return (
    <>
      <div className="crumb">Opvolging</div>
      <div className="page-head">
        <div>
          <h1>Nieuwsbrief</h1>
          <p className="sub">Aanmeldingen via de inzichten-pagina&apos;s.</p>
        </div>
      </div>
      <NieuwsbriefLijst leads={leads} />
    </>
  );
}
