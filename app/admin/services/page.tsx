import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function ServicesAdminPage() {
  await requireAdmin();
  const rows = await listContent("services");
  return (
    <AdminContentList
      type="services"
      crumb="Content"
      titel="Services"
      sub="De negen boekbare diensten uit de dienstencatalogus."
      rows={rows}
    />
  );
}
