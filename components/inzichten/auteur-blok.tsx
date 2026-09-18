import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./auteur-blok.css";

/**
 * Wie dit geschreven heeft, onder het artikel.
 *
 * Bewust alleen gegevens die al bestaan: naam, functie en foto van het teamlid.
 * Er staat hier geen biografie, want die is er niet. Het blok verbergt zichzelf
 * als de auteur geen teamlid is — dan valt er niets te tonen behalve een naam
 * die al in de byline stond.
 */
export function AuteurBlok({
  naam,
  rol,
  foto,
  label,
  cta,
}: {
  naam: string;
  rol?: string;
  foto?: string;
  label: string;
  cta: string;
}) {
  if (!rol && !foto) return null;

  return (
    <aside className="auteurblok">
      {foto && <Image className="auteurblok-foto" src={foto} alt={naam} width={72} height={72} />}
      <div className="auteurblok-tekst">
        <span className="auteurblok-label">{label}</span>
        <strong className="auteurblok-naam">{naam}</strong>
        {rol && <span className="auteurblok-rol">{rol}</span>}
      </div>
      <Link href="/contact" className="auteurblok-link">
        {cta} <ArrowRight />
      </Link>
    </aside>
  );
}
