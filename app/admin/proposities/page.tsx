import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function PropositiesAdminPage() {
  await requireAdmin();
  const rows = await listContent("proposities");
  return (
    <AdminContentList
      type="proposities"
      crumb="Sectoren"
      titel="Proposities"
      sub="De proposities (probleem-eerst) die als PMC op de sectorpagina's verschijnen."
      rows={rows}
    />
  );
}
