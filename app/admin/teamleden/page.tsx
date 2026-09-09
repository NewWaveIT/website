import { requireAdmin } from "@/lib/dal";
import { AdminContentList } from "@/components/admin/content-list";

export default async function TeamledenAdminPage() {
  await requireAdmin();
  return (
    <AdminContentList
      type="teamleden"
      crumb="Organisatie"
      titel="Teamleden"
      sub="De mensen achter The New Wave IT."
    />
  );
}
