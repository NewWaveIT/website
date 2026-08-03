import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function VacaturesAdminPage() {
  await requireAdmin();
  const rows = await listContent("vacatures");
  return (
    <AdminContentList
      type="vacatures"
      crumb="Content"
      titel="Vacatures"
      sub="Openstaande rollen en hun sollicitaties."
      rows={rows}
    />
  );
}
