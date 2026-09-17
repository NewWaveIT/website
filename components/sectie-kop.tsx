import { cn } from "@/lib/utils";

/**
 * De kop boven een sectie: kicker, titel, en soms een intro.
 *
 * Stond vijfendertig keer met de hand in de pagina's en sectiecomponenten.
 * Dat is geen ramp zolang niemand er iets aan verandert, maar het betekent wel
 * dat een aanpassing op vijfendertig plekken moet, en dat per plek onthouden
 * moet worden of de kicker zijn donkere variant nodig heeft — de variant die
 * genoeg contrast heeft op een donkere sectie.
 *
 * Twee maten: de gewone <h2> en de grotere `sectie-h2`, die de dienstsecties en
 * de richting-hubs gebruiken. Op een donkere ondergrond krijgt die grote
 * variant er nog een klasse bij voor de witte tekstkleur.
 */
export function SectieKop({
  kicker,
  titel,
  intro,
  opDonker = false,
  groot = false,
}: {
  kicker: string;
  /** Leeg = geen <h2>. Eén sectie gebruikt alleen kicker en intro. */
  titel?: string;
  intro?: string;
  /** Donkere sectie: kicker en titel krijgen hun leesbare variant. */
  opDonker?: boolean;
  /** De grotere koptekst uit de dienstsecties (`.sectie-h2`). */
  groot?: boolean;
}) {
  return (
    <div className="sec-head">
      <div className={cn("kicker", opDonker && "on-dark")}>{kicker}</div>
      {titel && (
        <h2 className={cn(groot && "sectie-h2", groot && opDonker && "sectie-h2--op-donker")}>
          {titel}
        </h2>
      )}
      {intro && <p>{intro}</p>}
    </div>
  );
}
