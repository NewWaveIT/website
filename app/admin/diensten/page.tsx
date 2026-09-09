import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function DienstenAdminPage() {
  await requireAdmin();
  const rows = await listContent("diensten");
  return (
    <AdminContentList
      type="diensten"
      crumb="Aanbod"
      titel="Richtingen"
      sub="Mendix, AI en Strategie — de hub-pagina's waaronder de diensten hangen."
      rows={rows}
    />
  );
}
