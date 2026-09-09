import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function CasesPage() {
  await requireAdmin();
  const rows = await listContent("cases");
  return (
    <AdminContentList
      type="cases"
      crumb="Verhalen"
      titel="Klantverhalen"
      sub="De klantverhalen op de website."
      rows={rows}
      facets={[{ key: "sector", label: "sectoren" }]}
    />
  );
}
