import { JsonLd } from "@/components/json-ld";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { citaat } from "@/lib/utils";
import Link from "next/link";
import { Kruimelpad } from "@/components/kruimelpad";
import { notFound } from "next/navigation";
import { Building2, ArrowRight } from "lucide-react";
import { getKlantverhalen, getKlantverhaalBySlug } from "@/lib/klantverhalen-data";
import type { Stap } from "@/lib/klantverhalen";
import { SlotCta } from "@/components/layout/slot-cta";
import { SITE_URL } from "@/lib/site";
import "./case.css";

/** Klein procesdiagram (bv. "de keten in drie stappen" of een sectie-flow). */
function StappenFlow({ stappen, klein = false }: { stappen: Stap[]; klein?: boolean }) {
  return (
    <div className={`stappen-flow${klein ? " stappen-flow--klein" : ""}`}>
      {stappen.map((st, i) => (
        <div className="stap" key={i}>
          <span className="stap-label">{st.label}</span>
          <span className="stap-titel">{st.titel}</span>
          {st.tekst && <span className="stap-tekst">{st.tekst}</span>}
          {i < stappen.length - 1 && <ArrowRight className="stap-arrow" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

export async function generateStaticParams() {
  return (await getKlantverhalen()).map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  "use cache";
  cacheLife("content");

  const { slug } = await params;
  const k = await getKlantverhaalBySlug(slug);
  if (!k) return {};
  return {
    title: `Klantverhaal ${k.tag}`,
    description: k.intro,
    alternates: { canonical: `/klantverhalen/${slug}` },
    openGraph: { type: "article", images: [k.image] },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  "use cache";
  cacheLife("content");

  const { slug } = await params;
  const k = await getKlantverhaalBySlug(slug);
  if (!k) notFound();

  const meer = (await getKlantverhalen()).filter((x) => x.slug !== slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: k.h1,
    description: k.intro,
    image: `${SITE_URL}${k.image}`,
    mainEntityOfPage: `${SITE_URL}/klantverhalen/${slug}`,
    author: { "@type": "Organization", name: "The New Wave IT" },
    publisher: {
      "@type": "Organization",
      name: "The New Wave IT",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logos/logo-horizontal-espresso.png`,
      },
    },
  };

  return (
    <div className="p-case">
      <JsonLd data={jsonLd} />

      <section className="chero">
        <div className="wrap-wide">
          <Kruimelpad
            kruimels={[
              { naam: "Klantverhalen", pad: "/klantverhalen" },
              { naam: (k.quoteNaam ? k.tag.split("·").pop()?.trim() : k.tag) ?? k.tag },
            ]}
          />
          <span className="tag">
            <Building2 /> {k.tag}
          </span>
          <h1>{k.h1}</h1>
          <p>{k.intro}</p>
          <div className="video" style={{ backgroundImage: `url('${k.image}')` }} />
        </div>
      </section>

      <div className="impact">
        <div className="wrap-wide">
          {k.impact.map((m, i) => (
            <div className="m" key={i}>
              <div className="n">{m.n}</div>
              <div className="l">{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      <section className="block">
        <div className="wrap-wide article">
          <div className="prose">
            <h2>De uitdaging</h2>
            <div dangerouslySetInnerHTML={{ __html: k.challenge }} />
            <p className="pull">{k.pull}</p>

            {k.ketenStappen && k.ketenStappen.length > 0 && (
              <div className="keten">
                {k.ketenTitel && <h2>{k.ketenTitel}</h2>}
                <StappenFlow stappen={k.ketenStappen} />
                {k.ketenSynthese && <p className="keten-synthese">{k.ketenSynthese}</p>}
              </div>
            )}

            <h2>De aanpak</h2>
            {k.secties?.map((sec, i) => (
              <div className="sectie" key={i}>
                <h3>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  {sec.titel}
                </h3>
                <h4 className="subkop">Situatie &amp; uitdaging</h4>
                <p>{sec.situatie}</p>
                <h4 className="subkop">Onze aanpak</h4>
                <p>{sec.aanpak}</p>
                {sec.stappen && sec.stappen.length > 0 && (
                  <StappenFlow stappen={sec.stappen} klein />
                )}
                {sec.functionaliteiten && sec.functionaliteiten.length > 0 && (
                  <>
                    <h4 className="subkop">De functionaliteiten</h4>
                    <ul>
                      {sec.functionaliteiten.map((f, j) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
                {sec.resultaten.length > 0 && (
                  <>
                    <h4 className="subkop">Resultaat</h4>
                    <div className="resultaat-kaarten">
                      {sec.resultaten.map((r, j) => (
                        <div className="resultaat-kaart" key={j}>
                          {r.titel && <h4>{r.titel}</h4>}
                          <p>{r.tekst}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}

            <h2>Het resultaat</h2>
            <div dangerouslySetInnerHTML={{ __html: k.resultaat }} />
            {k.eindresultaten && k.eindresultaten.length > 0 && (
              <div className="resultaat-kaarten resultaat-kaarten--eind">
                {k.eindresultaten.map((r, i) => (
                  <div className="resultaat-kaart" key={i}>
                    {r.titel && <h4>{r.titel}</h4>}
                    <p>{r.tekst}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside>
            <div className="aside-card">
              <h4>Over dit project</h4>
              <div className="row">
                <span className="k">Sector</span>
                <span className="v">{k.aside.sector}</span>
              </div>
              <div className="row">
                <span className="k">Diensten</span>
                <span className="v">{k.aside.diensten}</span>
              </div>
              <div className="row">
                <span className="k">Doorlooptijd</span>
                <span className="v">{k.aside.doorlooptijd}</span>
              </div>
              <div className="row">
                <span className="k">Team</span>
                <span className="v">{k.aside.team}</span>
              </div>
              <Link href="/contact" className="btn btn-primary">
                Vergelijkbaar vraagstuk? <ArrowRight />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="block qblock">
        <div className="wrap-wide">
          <div className="av" />
          <div>
            <blockquote>{citaat(k.quote)}</blockquote>
            <div className="who">
              <strong>{k.quoteNaam}</strong>, {k.quoteRol}
            </div>
          </div>
        </div>
      </section>

      {meer.length > 0 && (
        <section className="block">
          <div className="wrap-wide">
            <div className="eyebrow-row">
              <div>
                <div className="kicker">Meer klantverhalen</div>
                <h2>Resultaten in andere sectoren</h2>
              </div>
              <Link href="/klantverhalen" className="btn btn-outline btn-sm">
                Alle verhalen <ArrowRight />
              </Link>
            </div>
            <div className="cards3">
              {meer.map((m) => (
                <Link href={`/klantverhalen/${m.slug}`} className="post" key={m.slug}>
                  <div className="cover" style={{ backgroundImage: `url('${m.image}')` }}>
                    <span className="cat">{m.sector}</span>
                  </div>
                  <div className="pbody">
                    <h3>{m.cardTitel}</h3>
                    <span className="more">
                      Lees het verhaal <ArrowRight />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SlotCta titel="Herken je dit vraagstuk in jouw organisatie?" />
    </div>
  );
}
