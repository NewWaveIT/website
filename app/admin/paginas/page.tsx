import { requireAdmin } from "@/lib/dal";
import { AdminContentList } from "@/components/admin/content-list";

export default async function PaginasPage() {
  await requireAdmin();
  return (
    <AdminContentList
      type="paginas"
      crumb="Overzicht"
      titel="Pagina's"
      sub="Beheer de vaste pagina's van de website."
    />
  );
}
