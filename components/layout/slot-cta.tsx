import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getContactgegevens } from "@/lib/contact-data";

/**
 * Uniforme slot-CTA onderaan pagina's: contactformulier primair, bellen als
 * vast secundair alternatief. Eén bron zodat de CTA-taal overal gelijk is.
 */
export async function SlotCta({
  titel,
  knop = "Plan een gesprek",
}: {
  titel: string;
  knop?: string;
}) {
  const contact = await getContactgegevens();
  return (
    <section className="cta">
      <div className="wrap-wide">
        <h2>{titel}</h2>
        <div className="cta-actions">
          <Link href="/contact" className="btn btn-on">
            {knop} <ArrowRight />
          </Link>
          <a href={`tel:${contact.telefoon}`} className="cta-tel">
            of bel {contact.telefoonWeergave}
          </a>
        </div>
      </div>
    </section>
  );
}
