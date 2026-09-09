import { requireAdmin } from "@/lib/dal";
import { listContent } from "@/lib/cms/content";
import { AdminContentList } from "@/components/admin/content-list";

export default async function PaginasPage() {
  await requireAdmin();
  const rows = await listContent("paginas");
  return (
    <AdminContentList
      type="paginas"
      crumb="Overzicht"
      titel="Pagina's"
      sub="Beheer de vaste pagina's van de website."
      rows={rows}
    />
  );
}
