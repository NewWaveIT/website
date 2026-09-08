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
      titel="Diensten"
      sub="De negen boekbare diensten, elk met een eigen pagina onder /diensten."
      rows={rows}
    />
  );
}
