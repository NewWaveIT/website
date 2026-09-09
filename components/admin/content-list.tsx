import Link from "next/link";
import { Plus } from "lucide-react";
import { listContentSamenvatting, type ContentType } from "@/lib/cms/content";
import { LIJST_FACETTEN, isSorteerbaar } from "@/lib/cms/admin-lijst";
import { ContentListClient } from "./content-list-client";

/**
 * De adminlijst van één contenttype.
 *
 * Haalt zijn eigen rijen op, en alleen wat de tabel toont: de negen
 * lijstpagina's zeiden eerst allemaal zelf `listContent(type)` en kregen
 * daarmee de volledige inhoud van elke rij mee. Nu bepaalt de facetdeclaratie
 * (`LIJST_FACETTEN`) welke velden er nodig zijn, en kan die query niet meer uit
 * de pas lopen met wat de lijst laat zien.
 */
export async function AdminContentList({
  type,
  crumb,
  titel,
  sub,
}: {
  type: ContentType;
  crumb: string;
  titel: string;
  sub: string;
}) {
  const facets = LIJST_FACETTEN[type] ?? [];
  const rows = await listContentSamenvatting(
    type,
    facets.map((f) => f.key),
  );

  return (
    <>
      <div className="crumb">{crumb}</div>
      <div className="page-head">
        <div>
          <h1>{titel}</h1>
          <p className="sub">{sub}</p>
        </div>
        <Link href={`/admin/content/${type}/new`} className="btn btn-primary">
          <Plus /> Nieuw
        </Link>
      </div>
      <ContentListClient type={type} rows={rows} facets={facets} orderable={isSorteerbaar(type)} />
    </>
  );
}
