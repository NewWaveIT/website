import { requireAdmin } from "@/lib/dal";
import { AdminContentList } from "@/components/admin/content-list";

export default async function InzichtenAdminPage() {
  await requireAdmin();
  return (
    <AdminContentList
      type="artikelen"
      crumb="Verhalen"
      titel="Inzichten"
      sub="Artikelen en kennisdeling."
    />
  );
}
