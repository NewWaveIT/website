import type { ReactNode } from "react";
import { Kruimelpad, type Kruimel } from "@/components/kruimelpad";
import "./pagina-hero.css";

/**
 * De donkere kop bovenaan een pagina: kruimelpad, kicker, titel met accentwoord,
 * lead, en wat de pagina er verder onder wil zetten.
 *
 * Dertien pagina's hadden hiervoor hun eigen versie — `.shero`, `.dhero`,
 * `.chero` en `.legal-hero` — die op de paginaprefix na dezelfde CSS bevatten.
 * Dat het kopieerwerk was en geen toeval bleek uit de details die uiteen waren
 * gelopen: zeven verschillende breekpunten voor dezelfde h1-verkleining
 * (640, 700, 900, 1100 en 1180px), twee verschillende paddings, en elf blokken
 * die hun zijmarge kwijt waren door dezelfde `padding`-shorthand-fout.
 *
 * Wat per pagina verschilt zijn de regelbreedtes; die stel je in de page-CSS in
 * met `--pkop-kop` en `--pkop-lead`, zodat er geen inline style voor nodig is.
 */
export function PaginaHero({
  kruimels,
  kicker,
  titel,
  accent,
  staart,
  lead,
  toon = "donker",
  achtergrond,
  children,
}: {
  kruimels: Kruimel[];
  kicker?: string;
  /** Het deel van de kop vóór het accentwoord. */
  titel: string;
  /** Het woord in oranje. Weglaten voor een kop zonder accent. */
  accent?: string;
  /** Wat er ná het accent komt, meestal "." of "?". */
  staart?: string;
  lead?: string;
  /** Licht is voor pagina's waar de kop geen aandacht hoeft te trekken. */
  toon?: "donker" | "licht";
  /** Achtergrondlaag: een `SectorHeroAnim` of een foto. */
  achtergrond?: ReactNode;
  /** Knoppen, badges of KPI's onder de lead. */
  children?: ReactNode;
}) {
  const donker = toon === "donker";
  return (
    <section className={donker ? "pkop" : "pkop pkop-licht"}>
      {achtergrond}
      <div className="wrap-wide">
        <Kruimelpad kruimels={kruimels} opDonker={donker} />
        {kicker ? <div className={donker ? "kicker on-dark" : "kicker"}>{kicker}</div> : null}
        <h1>
          {titel}
          {accent ? <em>{accent}</em> : null}
          {staart}
        </h1>
        {lead ? <p>{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
