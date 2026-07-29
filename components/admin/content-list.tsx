import Link from "next/link";
import { Plus } from "lucide-react";
import type { ContentRow, ContentType } from "@/lib/cms/content";
import { ContentListClient, type Facet } from "./content-list-client";

export function AdminContentList({
  type,
  crumb,
  titel,
  sub,
  rows,
  facets,
}: {
  type: ContentType;
  crumb: string;
  titel: string;
  sub: string;
  rows: ContentRow[];
  facets?: Facet[];
}) {
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
      <ContentListClient type={type} rows={rows} facets={facets} />
    </>
  );
}
