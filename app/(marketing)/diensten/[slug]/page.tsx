import { JsonLd } from "@/components/json-ld";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, HardHat, Users } from "lucide-react";
import { ICONEN } from "./iconen";
import { getServices, getServiceBySlug } from "@/lib/services-data";
import { getArtikelenVoorDienst } from "@/lib/inzichten-data";
import { RICHTINGEN } from "@/lib/services";
import type { Service } from "@/lib/services";
import { SlotCta } from "@/components/layout/slot-cta";
import { Kruimelpad } from "@/components/kruimelpad";
import { InzichtenSectie } from "@/components/diensten/secties/verwijzingen";
import { SITE_URL } from "@/lib/site";
import "@/components/diensten/secties/secties.css";
import "./dienst.css";

/* Dienstdetailpagina — geport uit ui_kits/website/dienst-*.html (Claude
   Design). Alle negen diensten delen dit sjabloon; wat per dienst verschilt
   staat in de CMS-rij. Elke sectie verbergt zichzelf als haar velden leeg
   zijn, zodat een dienst die nog niet gevuld is geen lege koppen toont. */

/** Prijsregel; leeg betekent bewust "op aanvraag", niet "gratis". */
function prijsRegel(s: Service): string {
  const eerste = s.prijzen[0];
  if (!eerste) return "Prijs op aanvraag";
  return eerste.variant ? `${eerste.label} ${eerste.variant}` : eerste.label;
}

/** "Mendix · Fase 2" — het labeltje boven een dienstkaart. */
function soortLabel(s: Service): string {
  const richting = RICHTINGEN.find((r) => r.key === s.richting);
  const delen = [richting?.naam ?? "Diensten"];
  if (s.fase) delen.push(`Fase ${s.fase}`);
  return delen.join(" · ");
}

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  "use cache";
  cacheLife("content");

  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s) return {};
  return {
    title: s.naam,
    description: s.lead || s.pitch,
    alternates: { canonical: `/diensten/${slug}` },
  };
}

export default async function DienstPage({ params }: { params: Promise<{ slug: string }> }) {
  "use cache";
  cacheLife("content");

  const { slug } = await params;
  const [s, alle] = await Promise.all([getServiceBySlug(slug), getServices()]);
  if (!s) notFound();

  const richting = RICHTINGEN.find((r) => r.key === s.richting);
  const kop = s.kop || s.naam;
  const lead = s.lead || s.pitch;
  const boekPunten = s.boekPunten?.length ? s.boekPunten : s.resultaten;
  // In de boekkaart staat het bedrag groot en de nuance eronder. Zonder eigen
  // toelichting schuift de variant ("exclusief licenties") naar die regel, in
  // plaats van achter het bedrag te blijven plakken.
  const prijsLabel = s.prijzen[0]?.label ?? "Prijs op aanvraag";
  const prijsNoot = s.prijsToelichting || s.prijzen[0]?.variant;

  // Vervolgdiensten: de reden staat bij deze dienst, de rest van de gegevens
  // bij de dienst waarnaar verwezen wordt. Slugs die niet (meer) bestaan
  // vallen weg in plaats van een dode kaart op te leveren.
  const vervolg = (s.vervolg ?? [])
    .map((v) => ({ reden: v.reden, dienst: alle.find((d) => d.slug === v.slug) }))
    .filter((v): v is { reden: string; dienst: Service } => Boolean(v.dienst));
  const rest = alle.filter((d) => d.slug !== s.slug);

  const secties = [
    s.herken?.length ? { id: "voor-wie", label: "Voor wie" } : null,
    s.meeneemt?.length ? { id: "meeneemt", label: "Wat je meeneemt" } : null,
    s.dagSlots?.length ? { id: "programma", label: s.dagLabel || "Programma" } : null,
    s.wijZorgen?.length || s.jijZorgt?.length
      ? { id: "voorbereiding", label: "Voorbereiding" }
      : null,
    vervolg.length ? { id: "daarna", label: "Daarna" } : null,
    s.faq?.length ? { id: "faq", label: "Vragen" } : null,
  ].filter((x): x is { id: string; label: string } => x !== null);

  // Een dienst die nog niet naar het ontwerp van september is overgezet heeft
  // geen enkele van die secties. Zonder terugval blijft daar een pagina over met
  // alleen een kop, een pitchregel en de boekkaart — geen tekst om op te vinden.
  const geport = secties.length > 0;
  const artikelen = geport ? [] : await getArtikelenVoorDienst(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.naam,
    description: lead,
    provider: { "@type": "Organization", name: "The New Wave IT" },
    url: `${SITE_URL}/diensten/${slug}`,
  };
  const faqLd = s.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: s.faq.map((f) => ({
          "@type": "Question",
          name: f.vraag,
          acceptedAnswer: { "@type": "Answer", text: f.antwoord },
        })),
      }
    : null;

  return (
    <div className="p-dienst">
      <JsonLd data={jsonLd} />
      {faqLd && <JsonLd data={faqLd} />}

      {/* 1 · Hero met boekkaart */}
      <section className="dhero">
        <div className="wrap-wide">
          <Kruimelpad
            kruimels={[
              { naam: "Diensten", pad: "/diensten" },
              ...(richting ? [{ naam: richting.naam, pad: richting.href }] : []),
              { naam: s.naam },
            ]}
          />
          <div className="dhero-grid">
            <div>
              <div className="tags">
                <span className="tag hot">{soortLabel(s)}</span>
                {s.duur && <span className="tag">{s.duur}</span>}
                {s.groepsgrootte && <span className="tag">{s.groepsgrootte}</span>}
              </div>
              <h1>{kop}</h1>
              <p className="lead">{lead}</p>
              {s.feiten && s.feiten.length > 0 && (
                <dl className="facts">
                  {s.feiten.map((f) => (
                    <div key={f.label}>
                      <dt className="l">{f.label}</dt>
                      <dd className="v">{f.waarde}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <aside className="book">
              {s.fase && <span className="fase">{soortLabel(s)}</span>}
              <p className="price">
                {prijsLabel}
                {prijsNoot && <small>{prijsNoot}</small>}
              </p>
              {boekPunten.length > 0 && (
                <ul>
                  {boekPunten.map((p) => (
                    <li key={p}>
                      <Check aria-hidden="true" /> {p}
                    </li>
                  ))}
                </ul>
              )}
              <Link href={`/contact?dienst=${s.slug}`} className="btn btn-primary">
                {s.ctaLabel} <ArrowRight />
              </Link>
              <Link href="/contact" className="alt">
                Liever eerst 20 min kennismaken →
              </Link>
            </aside>
          </div>
        </div>
      </section>

      {secties.length > 1 && (
        <nav className="subnav" aria-label="Op deze pagina">
          <div className="wrap-wide">
            {secties.map((x) => (
              <a key={x.id} href={`#${x.id}`}>
                {x.label}
              </a>
            ))}
          </div>
        </nav>
      )}

      {/* Terugval (buiten het ontwerp): de tekst die deze dienst al heeft,
             zolang er geen ontwerpsecties zijn om te tonen */}
      {!geport && (
        <section className="block">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Over deze dienst</div>
              <h2>Wat {s.naam} inhoudt</h2>
              <p>{s.beschrijving}</p>
            </div>
            <div className="sec-head">
              <div className="kicker">Voor wie</div>
              <p>{s.doelgroep}</p>
            </div>
          </div>
        </section>
      )}

      {/* 2 · Voor wie */}
      {s.herken && s.herken.length > 0 && (
        <section className="block" id="voor-wie">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Voor wie</div>
              <h2>Herken je dit?</h2>
              {s.herkenIntro && <p>{s.herkenIntro}</p>}
            </div>
            <div className="herken">
              {s.herken.map((q) => (
                <blockquote key={q}>{`“${q}”`}</blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3 · Wat je meeneemt */}
      {s.meeneemt && s.meeneemt.length > 0 && (
        <section className="block op-eggshell" id="meeneemt">
          <div className="wrap-wide">
            <div className="split">
              <div>
                <div className="kicker">Wat je meeneemt</div>
                {s.meeneemtTitel && <h2 className="split-h2">{s.meeneemtTitel}</h2>}
                <ul className="take">
                  {s.meeneemt.map((m) => {
                    const Icoon = ICONEN[m.icon] ?? Check;
                    return (
                      <li key={m.titel}>
                        <Icoon aria-hidden="true" />
                        <div>
                          <strong>{m.titel}</strong>
                          <span className="d">{m.tekst}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {s.meeneemtFoto && (
                <Image
                  src={s.meeneemtFoto}
                  alt=""
                  width={1600}
                  height={1200}
                  // Zonder `sizes` serveert Next de opgegeven breedte, terwijl
                  // de CSS de foto over de halve pagina uitrekt — op een
                  // 2x-scherm zichtbaar zacht. De kolom is 46% van 1440px.
                  sizes="(max-width: 1100px) 100vw, 46vw"
                  className="split-foto"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4 · Het programma */}
      {s.dagSlots && s.dagSlots.length > 0 && (
        <section className="block day" id="programma">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker on-dark">{s.dagLabel || "Programma"}</div>
              {s.dagTitel && <h2>{s.dagTitel}</h2>}
              {s.dagIntro && <p>{s.dagIntro}</p>}
            </div>
            <div className="day-grid">
              {s.dagSlots.map((d) => (
                <div className="slot" key={`${d.tijd}-${d.titel}`}>
                  <div className="t">{d.tijd}</div>
                  <div>
                    <h3>{d.titel}</h3>
                    <p>{d.tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5 · Voorbereiding */}
      {(s.wijZorgen?.length || s.jijZorgt?.length) && (
        <section className="block" id="voorbereiding">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Voorbereiding</div>
              <h2>Wat wij regelen, wat jij regelt</h2>
              {s.voorbereidingIntro && <p>{s.voorbereidingIntro}</p>}
            </div>
            <div className="prep">
              {s.wijZorgen && s.wijZorgen.length > 0 && (
                <div className="prep-col">
                  <h3>
                    <HardHat aria-hidden="true" /> Wij zorgen voor
                  </h3>
                  <ul>
                    {s.wijZorgen.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
              {s.jijZorgt && s.jijZorgt.length > 0 && (
                <div className="prep-col">
                  <h3>
                    <Users aria-hidden="true" /> Jij zorgt voor
                  </h3>
                  <ul>
                    {s.jijZorgt.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 6 · Daarna */}
      {vervolg.length > 0 && (
        <section className="block op-eggshell" id="daarna">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Daarna</div>
              <h2>Wat er logisch op volgt</h2>
              {s.daarnaIntro && <p>{s.daarnaIntro}</p>}
            </div>
            <div className="next-grid">
              {vervolg.map(({ dienst, reden }) => (
                <Link className="next" href={`/diensten/${dienst.slug}`} key={dienst.slug}>
                  <span className="m">{soortLabel(dienst)}</span>
                  <h3>{dienst.naam}</h3>
                  <p>{reden}</p>
                  <span className="go">
                    {prijsRegel(dienst)} <ArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7 · Vragen */}
      {s.faq && s.faq.length > 0 && (
        <section className="block" id="faq">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Veelgestelde vragen</div>
              <h2>{s.faqTitel || `Wat klanten over ${s.naam} vragen`}</h2>
            </div>
            <div className="faq">
              {s.faq.map((f) => (
                <details key={f.vraag}>
                  <summary>
                    {f.vraag}{" "}
                    <span className="pm" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="a">{f.antwoord}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* `secties.css` scopet zichzelf onder .dienst-secties; die class staat
             bewust niet op de paginaroot, want .subnav en .crumbs botsen met het
             nieuwe ontwerp. Zonder de scope verliest .cover zijn positionering
             en ontsnapt de fill-afbeelding naar de viewport. */}
      {artikelen.length > 0 && (
        <div className="dienst-secties">
          <InzichtenSectie artikelen={artikelen} titel={`Kennis over ${s.naam}`} />
        </div>
      )}

      {/* 8 · De rest van de catalogus */}
      {rest.length > 0 && (
        <section className="block op-eggshell">
          <div className="wrap-wide">
            <div className="eyebrow-row">
              <div>
                <div className="kicker">Diensten</div>
                <h2>De rest van de catalogus</h2>
              </div>
              <Link href="/diensten" className="btn btn-outline btn-sm">
                Alle diensten <ArrowRight />
              </Link>
            </div>
            <div className="all-grid">
              {rest.map((d) => (
                <Link className="mini" href={`/diensten/${d.slug}`} key={d.slug}>
                  <span className="sp">{soortLabel(d)}</span>
                  <h3>{d.naam}</h3>
                  <span className="pr">{prijsRegel(d)}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SlotCta
        titel={s.ctaTitel || `Benieuwd of ${s.naam} bij jouw vraagstuk past?`}
        knop={s.ctaLabel}
      />
    </div>
  );
}
