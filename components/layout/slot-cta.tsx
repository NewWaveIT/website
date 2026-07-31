import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Uniforme slot-CTA onderaan pagina's: contactformulier primair, bellen als
 * vast secundair alternatief. Eén bron zodat de CTA-taal overal gelijk is.
 */
export function SlotCta({
  titel,
  knop = "Plan een strategiegesprek",
}: {
  titel: string;
  knop?: string;
}) {
  return (
    <section className="cta">
      <div className="wrap-wide">
        <h2>{titel}</h2>
        <div className="cta-actions">
          <Link href="/contact" className="btn btn-on">
            {knop} <ArrowRight />
          </Link>
          <a href="tel:+31610751254" className="cta-tel">
            of bel 06–10751254
          </a>
        </div>
      </div>
    </section>
  );
}
