import { requireAdmin } from "@/lib/dal";
import { CONTENT_TABLE, fotoWebp, listContentOfFout, type ContentType } from "@/lib/cms/content";
import { invoerVoor } from "@/lib/cms/baseline-seeds";
import {
  blokkerend,
  CATEGORIEEN,
  tel,
  vergelijk,
  type Bevinding,
  type Categorie,
  type SoortInvoer,
} from "@/lib/cms/baseline";
import { Herstel } from "./herstel";

const TYPEN = Object.keys(CONTENT_TABLE) as ContentType[];

/** Hoeveel regels per categorie in beeld; de rest zit in de JSON-export. */
const MAX_RIJEN = 150;

/**
 * Zoals het leespad de waarde ziet. Twee dingen die anders als verschil tellen
 * terwijl de site identiek rendert: oude `.png`-verwijzingen naar foto's (die
 * worden bij het lezen naar `.webp` vertaald) en CRLF-regeleindes, die in de
 * database belanden zodra iemand tekst uit de SQL-editor plakt.
 */
const normaliseer = (s: string) => fotoWebp(s).split("\r\n").join("\n");

function Chip({ categorie }: { categorie: Categorie }) {
  return (
    <span className={`chip ${CATEGORIEEN[categorie].blokkeert ? "nieuw" : "bezig"}`}>
      {CATEGORIEEN[categorie].blokkeert ? "afwijking" : "ter info"}
    </span>
  );
}

function Tabel({ rijen }: { rijen: Bevinding[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Slug</th>
          <th>Veld</th>
          <th>In het CMS</th>
          <th>In de seed</th>
        </tr>
      </thead>
      <tbody>
        {rijen.slice(0, MAX_RIJEN).map((b, i) => (
          <tr key={`${b.soort}-${b.slug}-${b.veld}-${i}`}>
            <td className="t-nowrap">{b.soort}</td>
            <td className="t-nowrap">{b.slug}</td>
            <td className="bl-veld">{b.veld || "—"}</td>
            <td className="bl-waarde">{b.cms}</td>
            <td className="bl-waarde">{b.seed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function BaselinePage() {
  await requireAdmin();

  const gelezen = await Promise.all(
    TYPEN.map(async (type) => ({ type, ...(await listContentOfFout(type)) })),
  );
  const fouten = gelezen.filter((g) => g.fout);

  const invoer: SoortInvoer[] = gelezen
    .filter((g) => !g.fout)
    .map((g) =>
      invoerVoor(
        g.type,
        g.rijen.map((r) => ({
          slug: r.slug,
          status: r.status,
          data: (r.data ?? {}) as Record<string, unknown>,
        })),
      ),
    );

  const bevindingen = vergelijk(invoer, normaliseer);
  const tellingen = tel(bevindingen);
  const teFixen = blokkerend(bevindingen);
  const rijenTotaal = gelezen.reduce((n, g) => n + g.rijen.length, 0);

  // Volledige waarden, niet de ingekorte weergave: hiermee is de seed in de
  // code bij te werken naar wat er werkelijk in het CMS staat.
  const afwijkendeWaarden = bevindingen
    .filter((b) => b.categorie === "afwijkend" || b.categorie === "leeg")
    .map((b) => {
      const rij = gelezen.find((g) => g.type === b.soort)?.rijen.find((r) => r.slug === b.slug);
      return {
        type: b.soort,
        slug: b.slug,
        veld: b.veld,
        cms: (rij?.data as Record<string, unknown> | undefined)?.[b.veld] ?? null,
      };
    });

  return (
    <>
      <div className="crumb">Beheer</div>
      <div className="page-head">
        <div>
          <h1>Baseline</h1>
          <p className="sub">
            Elke rij in het CMS naast het veldschema en de seed in de code. Nul afwijkingen
            betekent: wat je hier bewerkt is precies wat de site toont, en de fallback toont
            hetzelfde.
          </p>
        </div>
      </div>

      {fouten.length > 0 && (
        <div className="card melding bl-fout">
          <h3>Niet alles gelezen</h3>
          <p className="melding-tekst">
            {fouten.map((f) => `${f.type}: ${f.fout}`).join(" · ")}. De telling hieronder gaat
            alleen over de tabellen die wél gelezen zijn, dus lees dit niet als schoon.
          </p>
        </div>
      )}

      <div className="kpis bl-kpis">
        <div className="card kpi">
          <div className="lbl">Rijen vergeleken</div>
          <div className="val">{rijenTotaal}</div>
          <div className="delta">{invoer.length} contenttypen</div>
        </div>
        <div className="card kpi">
          <div className="lbl">Afwijkingen</div>
          <div className="val">{teFixen}</div>
          <div className="delta">moeten naar nul</div>
        </div>
        <div className="card kpi">
          <div className="lbl">Ter info</div>
          <div className="val">{bevindingen.length - teFixen}</div>
          <div className="delta">kan kloppen</div>
        </div>
      </div>

      {bevindingen.length === 0 && fouten.length === 0 ? (
        <div className="card melding bl-schoon">
          <h3>Geen verschillen</h3>
          <p className="melding-tekst">
            Elke rij kent precies de velden uit het schema, elke waarde is gelijk aan de seed, en er
            staat geen sleutel in de database die de code niet kent. Dit is de nulmeting.
          </p>
        </div>
      ) : (
        tellingen.map(({ categorie, aantal }) => {
          const rijen = bevindingen.filter((b) => b.categorie === categorie);
          return (
            <div className="card bl-groep" key={categorie}>
              <div className="chead">
                <h3>
                  {CATEGORIEEN[categorie].titel} <span className="bl-aantal">{aantal}</span>
                </h3>
                <Chip categorie={categorie} />
              </div>
              <p className="bl-gevolg">{CATEGORIEEN[categorie].gevolg}</p>
              <Tabel rijen={rijen} />
              {aantal > MAX_RIJEN && (
                <p className="bl-gevolg">
                  Nog {aantal - MAX_RIJEN} regel(s) niet getoond. De JSON-export hieronder bevat ze
                  allemaal.
                </p>
              )}
            </div>
          );
        })
      )}

      <Herstel
        ontbrekend={bevindingen.filter((b) => b.categorie === "ontbrekend").length}
        wees={bevindingen.filter((b) => b.categorie === "wees").length}
        exportJson={JSON.stringify(afwijkendeWaarden, null, 2)}
      />

      <div className="card melding bl-uitleg">
        <h3>Wat hier niet in staat</h3>
        <p className="melding-tekst">
          De andere richting, een veld in de editor dat geen enkele pagina rendert, staat niet hier
          maar in de tests: <code>tests/unit/cms-velden.spec.ts</code> voor de contenttypen en{" "}
          <code>tests/unit/cms-pages.spec.ts</code> voor de paginateksten. Die draaien bij elke
          push, dus een dood veld haalt <code>main</code> niet.
        </p>
      </div>
    </>
  );
}
