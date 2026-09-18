import Image from "next/image";
import type { CSSProperties } from "react";
import { beeldMaten } from "@/lib/beeldmaten";
import { cn } from "@/lib/utils";
import "./beeld-kader.css";

/**
 * Een redactioneel beeld dat altijd goed staat, wat er ook geüpload wordt.
 *
 * Twee regels, en ze gelden samen:
 *
 * 1. **Het kader volgt het beeld.** Geen vaste hoogte met `object-fit: cover`,
 *    want dan snijdt elk beeld met een andere verhouding af. Een diagram
 *    verloor zo zijn bovenste rij.
 * 2. **Een beeld wordt nooit vergroot.** Een schermafdruk van 378px breed werd
 *    uitgerekt naar 978 en was daardoor wazig. Hij staat nu op 378, scherp,
 *    gecentreerd op een rustig vlak.
 *
 * Zijn de maten onbekend (beeld onbereikbaar tijdens de build), dan valt de
 * opmaak terug op een kader met `object-fit: scale-down` uit beeld-kader.css.
 * Dat snijdt ook niet af en schaalt ook niet op; er kan alleen wat ruimte
 * overblijven. De pagina gaat er nooit door stuk.
 */
export async function BeeldKader({
  src,
  alt,
  maxBreedte = 980,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  /** Bovengrens van het kader; het beeld wordt nooit breder dan zichzelf. */
  maxBreedte?: number;
  className?: string;
  priority?: boolean;
}) {
  const maat = await beeldMaten(src);
  const breedte = maat ? Math.min(maat.breedte, maxBreedte) : maxBreedte;

  const stijl = maat
    ? ({
        "--kader-verhouding": `${maat.breedte} / ${maat.hoogte}`,
        "--kader-max": `${breedte}px`,
      } as CSSProperties)
    : undefined;

  return (
    <div className={cn("beeldkader", className)} style={stijl}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`(max-width: ${breedte}px) 100vw, ${breedte}px`}
        priority={priority}
      />
    </div>
  );
}
