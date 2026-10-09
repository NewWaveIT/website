import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CONTACT_TERUGVAL } from "@/lib/contactgegevens";

/**
 * De inhoud van de 404, zonder schil.
 *
 * Staat los omdat een 404 op twee plekken in de boom kan opduiken en de schil
 * daar niet hetzelfde is. Binnen `app/(marketing)` levert de layout al een
 * header, een `<main id="main">` en een voettekst; daarbuiten (bijvoorbeeld
 * /medewerkerspakket) is er alleen de root-layout en moet de pagina dat zelf
 * doen.
 *
 * Dat ging mis: `app/not-found.tsx` zette de schil er altijd bij, dus een
 * onbekende marketing-URL leverde drie headers, twee voetteksten en twee
 * elementen met `id="main"` -- waardoor de skip-link naar de verkeerde sprong.
 * Gemeten op /klantverhalen/bestaat-niet.
 */
export function NietGevonden() {
  return (
    <section className="notfound">
      <div className="wrap-wide">
        <div className="nf-code">404</div>
        <h1>Deze pagina bestaat niet (meer)</h1>
        <p>
          De link is mogelijk verouderd of verkeerd getypt. Ga terug naar de homepage, bekijk onze
          sectoren, of neem gerust contact op.
        </p>
        <div className="nf-actions">
          <Link href="/" className="btn btn-primary">
            Naar de homepage <ArrowRight />
          </Link>
          <Link href="/sectoren" className="btn btn-outline">
            Bekijk sectoren
          </Link>
          <a href={`tel:${CONTACT_TERUGVAL.telefoon}`} className="nf-tel">
            Of bel {CONTACT_TERUGVAL.telefoonWeergave}
          </a>
        </div>
      </div>
    </section>
  );
}
