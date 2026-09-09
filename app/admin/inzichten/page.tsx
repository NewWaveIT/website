import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function InzichtenAdminPage() {
  await requireAdmin();
  const rows = await listContent("artikelen");
  return (
    <AdminContentList
      type="artikelen"
      crumb="Verhalen"
      titel="Inzichten"
      sub="Artikelen en kennisdeling."
      rows={rows}
      facets={[
        { key: "discipline", label: "disciplines" },
        { key: "sector", label: "sectoren" },
      ]}
    />
  );
}
