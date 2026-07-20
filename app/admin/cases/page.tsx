import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function CasesPage() {
  await requireAdmin();
  const rows = await listContent("cases");
  return <AdminContentList type="cases" crumb="Content" titel="Cases" sub="Klantverhalen op de website." rows={rows} />;
}
