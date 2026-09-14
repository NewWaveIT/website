import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/dal";
import { CONTENT_TABLE, getContentById, type ContentType } from "@/lib/cms/content";
import { ADMIN_PADEN } from "@/lib/cms/admin-paden";
import { getTeamleden } from "@/lib/team-data";
import { ContentEditor } from "@/components/admin/content-editor";

export default async function ContentEditPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  await requireAdmin();
  const { type, id } = await params;
  if (!(type in CONTENT_TABLE)) notFound();

  const t = type as ContentType;
  const row = id === "new" ? null : await getContentById(t, id);
  if (id !== "new" && !row) notFound();

  // Auteurskeuze bij artikelen: teamleden als opties.
  const teamleden =
    t === "artikelen"
      ? (await getTeamleden()).map((m) => ({ slug: m.slug, naam: m.naam, foto: m.foto }))
      : [];

  return (
    <ContentEditor
      type={t}
      label={ADMIN_PADEN[t].label}
      listPath={ADMIN_PADEN[t].lijst}
      row={row}
      teamleden={teamleden}
    />
  );
}
