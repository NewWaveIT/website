import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function TeamledenAdminPage() {
  await requireAdmin();
  const rows = await listContent("teamleden");
  return (
    <AdminContentList
      type="teamleden"
      crumb="Organisatie"
      titel="Teamleden"
      sub="De mensen achter The New Wave IT."
      rows={rows}
    />
  );
}
