import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function InzichtenAdminPage() {
  await requireAdmin();
  const rows = await listContent("artikelen");
  return <AdminContentList type="artikelen" crumb="Content" titel="Inzichten" sub="Artikelen en kennisdeling." rows={rows} />;
}
