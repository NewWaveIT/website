import type { Kop } from "@/lib/artikel-koppen";
import "./artikel-zijkolom.css";

/**
 * De meelopende kolom rechts van een artikel: inhoudsopgave plus de feiten die
 * anders alleen bovenin de hero staan.
 *
 * Aanleiding, gemeten op een venster van 1440: de tekstkolom was 720px breed
 * en de pagina 7.612px hoog. Dat is 80 tekens per regel — te lang om prettig
 * te lezen — met aan weerszijden 360px leegte, en geen enkele manier om
 * ergens heen te springen in acht en een half scherm.
 *
 * De koppen staan al in de tekst; hier worden ze alleen bruikbaar. Er komt
 * geen nieuwe content bij en de redactie hoeft niets in te vullen: heeft een
 * artikel geen h2's, dan toont dit blok alleen de feiten, en onder 1100px
 * verdwijnt de hele kolom.
 */
export function ArtikelZijkolom({
  koppen,
  titel,
  leestijd,
  datum,
  auteur,
  doorLabel,
}: {
  koppen: Kop[];
  /** "In dit artikel" — komt uit de paginateksten. */
  titel: string;
  leestijd: string;
  datum: string;
  auteur: string;
  /** "door" */
  doorLabel: string;
}) {
  return (
    <aside className="artikel-zij" aria-label={titel}>
      <div className="artikel-zij-plak">
        {koppen.length > 0 && (
          <nav className="artikel-inhoud" aria-label={titel}>
            <p className="artikel-zij-kop kicker">{titel}</p>
            <ol>
              {koppen.map((k) => (
                <li key={k.id}>
                  <a href={`#${k.id}`}>{k.tekst}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <dl className="artikel-feiten">
          {leestijd && (
            <div>
              <dt>Leestijd</dt>
              <dd>{leestijd}</dd>
            </div>
          )}
          <div>
            <dt>Gepubliceerd</dt>
            <dd>{datum}</dd>
          </div>
          <div>
            <dt>{doorLabel}</dt>
            <dd>{auteur}</dd>
          </div>
        </dl>
      </div>
    </aside>
  );
}
