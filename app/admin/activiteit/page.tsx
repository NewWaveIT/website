import { requireAdmin } from "@/lib/dal";
import { listAudit } from "@/lib/cms/audit";
import { ActiviteitTabel } from "@/components/admin/activiteit-tabel";

export default async function ActiviteitPage() {
  await requireAdmin();
  const rows = await listAudit(150);

  return (
    <>
      <div className="crumb">Beheer</div>
      <div className="page-head">
        <div>
          <h1>Activiteit</h1>
          <p className="sub">Wie heeft wat wanneer aangepast in het CMS.</p>
        </div>
      </div>

      <ActiviteitTabel rows={rows} />
    </>
  );
}
