import { requireAdmin } from "@/lib/dal";
import { AdminContentList } from "@/components/admin/content-list";

export default async function SectorenAdminPage() {
  await requireAdmin();
  return (
    <AdminContentList
      type="sectoren"
      crumb="Sectoren"
      titel="Sectorpagina's"
      sub="De vijf focussectoren."
    />
  );
}
