import { requireAdmin } from "@/lib/dal";
import { getSollicitaties } from "@/lib/cms/inzendingen";
import { SollicitatiesBoard } from "@/components/admin/sollicitaties-board";

export default async function SollicitatiesPage() {
  await requireAdmin();
  const sols = await getSollicitaties();
  return (
    <>
      <div className="crumb">Opvolging</div>
      <div className="page-head">
        <div>
          <h1>Sollicitaties</h1>
          <p className="sub">Kandidaten per fase, over alle vacatures.</p>
        </div>
      </div>
      <SollicitatiesBoard sols={sols} />
    </>
  );
}
