import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/dal";
import { CONTENT_TABLE, getContentById, type ContentType } from "@/lib/cms/content";
import { getTeamleden } from "@/lib/team-data";
import { getProposities } from "@/lib/proposities-data";
import { ContentEditor } from "@/components/admin/content-editor";

const META: Record<ContentType, { label: string; listPath: string }> = {
  paginas: { label: "Pagina", listPath: "/admin/paginas" },
  cases: { label: "Case", listPath: "/admin/cases" },
  diensten: { label: "Dienst", listPath: "/admin/diensten" },
  sectoren: { label: "Sector", listPath: "/admin/sectoren" },
  artikelen: { label: "Artikel", listPath: "/admin/inzichten" },
  vacatures: { label: "Vacature", listPath: "/admin/vacatures" },
  teamleden: { label: "Teamlid", listPath: "/admin/teamleden" },
  proposities: { label: "Propositie", listPath: "/admin/proposities" },
};

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

  // Propositie-opties voor de PMC-koppeling op sectoren.
  const proposities =
    t === "sectoren"
      ? (await getProposities()).map((p) => ({ slug: p.slug, titel: p.titel, nummer: p.nummer }))
      : [];

  return (
    <ContentEditor
      type={t}
      label={META[t].label}
      listPath={META[t].listPath}
      row={row}
      teamleden={teamleden}
      proposities={proposities}
    />
  );
}
