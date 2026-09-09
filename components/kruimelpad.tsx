import Link from "next/link";
import { BreadcrumbJsonLd, type Kruimel } from "@/components/breadcrumb-jsonld";

export type { Kruimel };

/**
 * Het zichtbare kruimelpad plus de bijbehorende structured data.
 *
 * Veertien pagina's schreven hun eigen `<div className="crumbs">` met daarin
 * met de hand `Home / …`, en zetten de BreadcrumbJsonLd er los naast. Twee
 * plekken die hetzelfde moesten zeggen, dus liepen ze uiteen: een deel van de
 * pagina's had wél de zichtbare kruimels maar geen structured data. Nu levert
 * één aanroep allebei, uit dezelfde lijst.
 *
 * De laatste kruimel is de huidige pagina en krijgt daarom geen link — dat is
 * ook wat Google's BreadcrumbList verwacht.
 */
export function Kruimelpad({
  kruimels,
  opDonker = false,
}: {
  kruimels: Kruimel[];
  opDonker?: boolean;
}) {
  const metHome: Kruimel[] = [{ naam: "Home", pad: "/" }, ...kruimels];
  return (
    <>
      <BreadcrumbJsonLd kruimels={metHome} />
      <div className={opDonker ? "crumbs on-dark" : "crumbs"}>
        {metHome.map((k, i) => (
          <span key={k.naam}>
            {i > 0 && " / "}
            {k.pad && i < metHome.length - 1 ? <Link href={k.pad}>{k.naam}</Link> : k.naam}
          </span>
        ))}
      </div>
    </>
  );
}
