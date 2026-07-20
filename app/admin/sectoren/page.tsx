import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function SectorenAdminPage() {
  await requireAdmin();
  const rows = await listContent("sectoren");
  return <AdminContentList type="sectoren" crumb="Content" titel="Sectoren" sub="De vijf focussectoren." rows={rows} />;
}
