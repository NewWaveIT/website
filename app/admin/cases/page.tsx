import { requireAdmin } from "@/lib/dal";
import { AdminContentList } from "@/components/admin/content-list";

export default async function CasesPage() {
  await requireAdmin();
  return (
    <AdminContentList
      type="cases"
      crumb="Verhalen"
      titel="Klantverhalen"
      sub="De klantverhalen op de website."
    />
  );
}
