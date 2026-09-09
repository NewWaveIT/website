import { SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";

export interface Kruimel {
  naam: string;
  /** Pad beginnend met een slash; laat weg voor de huidige pagina. */
  pad?: string;
}

/**
 * BreadcrumbList-structured data bij de zichtbare kruimelpaden. Los van de
 * visuele `.crumbs`, zodat pagina's die markup houden zoals hij is.
 */
export function BreadcrumbJsonLd({ kruimels }: { kruimels: Kruimel[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: kruimels.map((k, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: k.naam,
      ...(k.pad ? { item: `${SITE_URL}${k.pad}` } : {}),
    })),
  };
  return <JsonLd data={jsonLd} />;
}
