import { requireAdmin } from "@/lib/dal";
import { AdminContentList } from "@/components/admin/content-list";

export default async function VacaturesAdminPage() {
  await requireAdmin();
  return (
    <AdminContentList
      type="vacatures"
      crumb="Organisatie"
      titel="Vacatures"
      sub="Openstaande rollen en hun sollicitaties."
    />
  );
}
