import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { isoDatum } from "@/lib/datum";

/**
 * De artikelkaart zoals hij op de homepage, het inzichtenoverzicht, de
 * sectorpagina's en de dienstsecties staat.
 *
 * Vier plekken schreven hier hun eigen markup voor, en vijf CSS-bestanden hun
 * eigen opmaak. Dat liep uiteen: alleen het inzichtenoverzicht liet de kaarten
 * even hoog worden, twee van de vijf gaven de "lees meer"-regel een kleur die
 * AA haalde, de omslagfoto was 160, 170 of 190 pixels hoog, en drie varianten
 * zetten de datum niet in een <time>. Eén component, één blok CSS in
 * globals.css.
 *
 * De homepage splitste de kaart in twee links naar dezelfde pagina — de foto en
 * de "lees meer"-regel. Voor wie met een schermlezer door de links tabt, staat
 * elk artikel er dan twee keer in. Hier is de hele kaart één link.
 */

export interface ArtikelKaartData {
  slug: string;
  titel: string;
  image: string;
  cat: string;
  datum: string;
  leestijd: string;
  intro?: string;
}

export function ArtikelKaart({
  artikel,
  meerLabel,
  metIntro = false,
  sizes = "(max-width: 980px) 100vw, 33vw",
}: {
  artikel: ArtikelKaartData;
  /** Tekst op de "lees meer"-regel; komt uit het CMS, dus per pagina anders. */
  meerLabel: string;
  /** Alleen de homepage toont de intro; elders past hij niet in de rij. */
  metIntro?: boolean;
  sizes?: string;
}) {
  return (
    <Link href={`/inzichten/${artikel.slug}`} className="post">
      {/* Leeg alt: de kop eronder zegt hetzelfde, en die staat er al. */}
      <div className="cover">
        <Image src={artikel.image} alt="" fill sizes={sizes} />
        <span className="cat">{artikel.cat}</span>
      </div>
      <div className="pbody">
        <div className="meta">
          {artikel.leestijd} · <time dateTime={isoDatum(artikel.datum)}>{artikel.datum}</time>
        </div>
        <h3>{artikel.titel}</h3>
        {metIntro && artikel.intro && <p>{artikel.intro}</p>}
        <span className="more meer-link">
          {meerLabel} <ArrowRight />
        </span>
      </div>
    </Link>
  );
}
