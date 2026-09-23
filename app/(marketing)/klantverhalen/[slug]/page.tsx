import { JsonLd } from "@/components/json-ld";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { citaat } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { PaginaHero } from "@/components/layout/pagina-hero";
import { notFound } from "next/navigation";
import { Building2, ArrowRight } from "lucide-react";
import { getKlantverhalen, getKlantverhaalBySlug } from "@/lib/klantverhalen-data";
import type { Stap } from "@/lib/klantverhalen";
import { SlotCta } from "@/components/layout/slot-cta";
import { SITE_URL } from "@/lib/site";
import { getPagina } from "@/lib/paginas-data";
import "./case.css";
import { SectieKopMetKnop } from "@/components/sectie-kop";

/** Klein procesdiagram (bv. "de keten in drie stappen" of een sectie-flow). */
function StappenFlow({ stappen, klein = false }: { stappen: Stap[]; klein?: boolean }) {
  return (
    <div className={`stappen-flow${klein ? " stappen-flow--klein" : ""}`}>
      {stappen.map((st, i) => (
        <div className="stap" key={i}>
          <span className="stap-label kicker">{st.label}</span>
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
  const t = await getPagina("klantverhaal-detail");
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

      <PaginaHero
        kruimels={[
          { naam: "Klantverhalen", pad: "/klantverhalen" },
          { naam: (k.quoteNaam ? k.tag.split("·").pop()?.trim() : k.tag) ?? k.tag },
        ]}
        kicker={
          <span className="tag">
            <Building2 /> {k.tag}
          </span>
        }
        titel={k.h1}
        lead={k.intro}
      >
        {/* De afbeelding komt uit het CMS, dus die kan niet in een class. */}
        <div className="video">
          <Image src={k.image} alt="" fill sizes="100vw" priority />
        </div>
      </PaginaHero>

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
          <div className="prose langvorm">
            <h2>{t.uitdagingTitel}</h2>
            <div dangerouslySetInnerHTML={{ __html: k.challenge }} />
            <p className="pull">{k.pull}</p>

            {k.ketenStappen && k.ketenStappen.length > 0 && (
              <div className="keten">
                {k.ketenTitel && <h2>{k.ketenTitel}</h2>}
                <StappenFlow stappen={k.ketenStappen} />
                {k.ketenSynthese && <p className="keten-synthese">{k.ketenSynthese}</p>}
              </div>
            )}

            <h2>{t.aanpakTitel}</h2>
            {k.secties?.map((sec, i) => (
              <div className="sectie" key={i}>
                <h3>
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  {sec.titel}
                </h3>
                <h4 className="subkop kicker">{t.subkopSituatie}</h4>
                <p>{sec.situatie}</p>
                <h4 className="subkop kicker">{t.subkopAanpak}</h4>
                <p>{sec.aanpak}</p>
                {sec.stappen && sec.stappen.length > 0 && (
                  <StappenFlow stappen={sec.stappen} klein />
                )}
                {sec.functionaliteiten && sec.functionaliteiten.length > 0 && (
                  <>
                    <h4 className="subkop kicker">{t.subkopFunctionaliteiten}</h4>
                    <ul>
                      {sec.functionaliteiten.map((f, j) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                  </>
                )}
                {sec.resultaten.length > 0 && (
                  <>
                    <h4 className="subkop kicker">{t.subkopResultaat}</h4>
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

            <h2>{t.resultaatTitel}</h2>
            <div dangerouslySetInnerHTML={{ __html: k.resultaat }} />
            {k.eindresultaten && k.eindresultaten.length > 0 && (
              <div className="resultaat-kaarten resultaat-kaarten--eind">
                {k.eindresultaten.map((r, i) => (
                  <div className="resultaat-kaart" key={i}>
                    {/* Onder <h2>Het resultaat</h2>, dus h3 — de kaarten in een
                        sectie hieronder hangen onder een h4 en blijven h4. */}
                    {r.titel && <h3>{r.titel}</h3>}
                    <p>{r.tekst}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside>
            <div className="aside-card kaart">
              <h2>{t.projectTitel}</h2>
              <div className="row">
                <span className="k">{t.labelSector}</span>
                <span className="v">{k.aside.sector}</span>
              </div>
              <div className="row">
                <span className="k">{t.labelDiensten}</span>
                <span className="v">{k.aside.diensten}</span>
              </div>
              <div className="row">
                <span className="k">{t.labelDoorlooptijd}</span>
                <span className="v">{k.aside.doorlooptijd}</span>
              </div>
              <div className="row">
                <span className="k">{t.labelTeam}</span>
                <span className="v">{k.aside.team}</span>
              </div>
              <Link href="/contact" className="btn btn-primary">
                {t.projectKnop} <ArrowRight />
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
            <SectieKopMetKnop
              kicker={t.meerKicker}
              titel={t.meerTitel}
              href="/klantverhalen"
              knop={t.meerAlle}
            />
            <div className="cards3">
              {meer.map((m) => (
                <Link href={`/klantverhalen/${m.slug}`} className="post" key={m.slug}>
                  <div className="cover">
                    <Image src={m.image} alt="" fill sizes="(max-width: 900px) 100vw, 33vw" />
                    <span className="cat">{m.sector}</span>
                  </div>
                  <div className="pbody">
                    <h3>{m.cardTitel}</h3>
                    <span className="more">
                      {t.meerLees} <ArrowRight />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SlotCta titel={t.ctaTitel} />
    </div>
  );
}
