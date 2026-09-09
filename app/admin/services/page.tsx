import { requireAdmin } from "@/lib/dal";
import { AdminContentList } from "@/components/admin/content-list";

export default async function ServicesAdminPage() {
  await requireAdmin();
  return (
    <AdminContentList
      type="services"
      crumb="Aanbod"
      titel="Diensten"
      sub="De negen boekbare diensten, elk met een eigen pagina onder /diensten."
    />
  );
}
