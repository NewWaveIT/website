import Link from "next/link";
import { Plus } from "lucide-react";
import { listContentSamenvatting, type ContentRow, type ContentType } from "@/lib/cms/content";
import { LIJST_FACETTEN, isSorteerbaar, type Facet } from "@/lib/cms/admin-lijst";
import { ContentListClient } from "./content-list-client";

/**
 * Het lijstscherm zelf: kop, knop en tabel, zonder te weten waar de rijen
 * vandaan komen.
 *
 * Het staat los van `AdminContentList` hieronder zodat /ontwerp het met
 * verzonnen rijen kan tonen. Zou die weergave de kop overtekenen, dan mist hij
 * precies wat je wil beoordelen -- de eerste versie liet de "Nieuw"-knop weg en
 * daardoor leek het alsof je op dit scherm niets kon aanmaken.
 */
export function ContentListScherm({
  type,
  crumb,
  titel,
  sub,
  rows,
  facets = [],
  orderable = false,
  nieuwHref,
}: {
  type: ContentType;
  crumb: string;
  titel: string;
  sub: string;
  rows: ContentRow[];
  facets?: Facet[];
  orderable?: boolean;
  nieuwHref: string;
}) {
  return (
    <>
      <div className="crumb">{crumb}</div>
      <div className="page-head">
        <div>
          <h1>{titel}</h1>
          <p className="sub">{sub}</p>
        </div>
        <Link href={nieuwHref} className="btn btn-primary">
          <Plus /> Nieuw
        </Link>
      </div>
      <ContentListClient type={type} rows={rows} facets={facets} orderable={orderable} />
    </>
  );
}

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
    <ContentListScherm
      type={type}
      crumb={crumb}
      titel={titel}
      sub={sub}
      rows={rows}
      facets={facets}
      orderable={isSorteerbaar(type)}
      nieuwHref={`/admin/content/${type}/new`}
    />
  );
}
