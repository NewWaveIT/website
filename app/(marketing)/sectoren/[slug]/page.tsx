import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import { citaat } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Handshake } from "lucide-react";
import { PaginaHero } from "@/components/layout/pagina-hero";
import { JsonLd } from "@/components/json-ld";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { getSectorBySlug, getSectorSlugs, getSectoren } from "@/lib/sectoren-detail-data";
import { getArtikelenVoorSector } from "@/lib/inzichten-data";
import { getTeamleden } from "@/lib/team-data";
import { getPagina } from "@/lib/paginas-data";
import { SITE_URL } from "@/lib/site";
import type { TeamRegel } from "@/lib/sectoren-detail";
import { SECTOR_ICONEN } from "@/components/sector-iconen";
import type { Teamlid } from "@/lib/team";
import "./sector-detail.css";
import { ArtikelKaart } from "@/components/artikel-kaart";
import { SectieKop } from "@/components/sectie-kop";

/** De lucide-iconen die het ontwerp gebruikt. Compleet per constructie: een
 *  ontbrekend icoon is een typefout, geen lege plek op de pagina. */

const LAAG_LABEL = {
  strategie: "Strategie",
  operatie: "Operatie",
  toekomst: "Toekomst",
  platform: "Platform & governance",
  operating: "Operating model",
  delivery: "Delivery & teams",
} as const;

export async function generateStaticParams() {
  return (await getSectorSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  "use cache";
  cacheLife("content");

  const { slug } = await params;
  const s = await getSectorBySlug(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/sectoren/${s.slug}` },
  };
}

export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  "use cache";
  cacheLife("content");

  const { slug } = await params;
  const s = await getSectorBySlug(slug);
  if (!s) notFound();

  const [artikelen, alleSectoren, teamleden, t] = await Promise.all([
    getArtikelenVoorSector(s.slug),
    getSectoren(),
    getTeamleden(),
    getPagina("sector-detail"),
  ]);

  const perSlug = new Map(teamleden.map((t) => [t.slug, t]));
  const zoekPersoon = (slug?: string): Teamlid | undefined =>
    slug ? perSlug.get(slug) : undefined;

  const quotePersoon = zoekPersoon(s.quoteTeamlid);
  const ctaPersoon = zoekPersoon(s.ctaTeamlid);
  const teamRegels = s.team
    .map((r: TeamRegel) => ({ regel: r, persoon: perSlug.get(r.teamlid) }))
    .filter((x): x is { regel: TeamRegel; persoon: Teamlid } => Boolean(x.persoon));
  const andereSectoren = alleSectoren.filter((x) => x.slug !== s.slug);

  const Badge = SECTOR_ICONEN[s.icon];

  return (
    <div className="p-sector">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.naam,
          description: s.metaDescription,
          provider: { "@type": "Organization", name: "The New Wave IT", url: SITE_URL },
          url: `${SITE_URL}/sectoren/${s.slug}`,
        }}
      />
      {s.faq.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: s.faq.map((f) => ({
              "@type": "Question",
              name: f.vraag,
              acceptedAnswer: { "@type": "Answer", text: f.antwoord },
            })),
          }}
        />
      )}

      {/* 1 · Hero */}
      <PaginaHero
        kruimels={[{ naam: "Sectoren", pad: "/sectoren" }, { naam: s.naam }]}
        kicker={
          <span className="badge">
            <Badge /> {s.naam}
          </span>
        }
        titel={s.h1}
        lead={s.intro}
        achtergrond={<SectorHeroAnim theme={s.heroTheme} />}
      >
        <div className="hero-actions">
          <Link href={`/contact?sector=${s.slug}`} className="btn btn-primary">
            {t.ctaKnop} <ArrowRight />
          </Link>
          <a href="#aanpak" className="btn btn-ghost-on">
            {t.ctaKnopTwee}
          </a>
        </div>
      </PaginaHero>

      {/* 2 · Herkenning */}
      {s.herkenning.length > 0 && (
        <section className="block pain">
          <div className="wrap-wide">
            <SectieKop kicker={t.herkenningKicker} titel={s.herkenningTitel} />
            <div className="pain-grid">
              {s.herkenning.map((p, i) => (
                <div className="pain-item" key={p}>
                  <span className="i">{String(i + 1).padStart(2, "0")}</span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 2b · De mensen */}
      {s.mensenTitel && (
        <section className="people-band">
          <div
            className="pic"
            style={{
              backgroundImage: `url('${s.mensenFoto}')`,
              backgroundPosition: s.mensenFotoPositie,
            }}
          />
          <div className="txt">
            <div className="kicker on-dark">{t.wieKomtKicker}</div>
            <h2>{s.mensenTitel}</h2>
            <p>{s.mensenTekst}</p>
            {s.mensenTags.length > 0 && (
              <div className="tags">
                {s.mensenTags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3 · Waarom nu */}
      {s.waaromAlineas.length > 0 && (
        <section className="block">
          <div className="wrap-wide">
            <div className="why-grid">
              <div className="why-prose">
                <div className="kicker">{t.waaromNuKicker}</div>
                <h2>{s.waaromTitel}</h2>
                {s.waaromAlineas.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div>
                {s.waaromFoto && (
                  <figure className="why-photo">
                    <Image
                      src={s.waaromFoto}
                      alt=""
                      width={1600}
                      height={1000}
                      sizes="(max-width: 1100px) 100vw, 50vw"
                      style={{ objectPosition: s.waaromFotoPositie }}
                    />
                  </figure>
                )}
                {s.quote && quotePersoon && (
                  <div className="why-quote">
                    <blockquote>{citaat(s.quote)}</blockquote>
                    <div className="who">
                      {quotePersoon.foto && (
                        <Image
                          src={quotePersoon.foto}
                          alt={quotePersoon.naam}
                          width={52}
                          height={52}
                        />
                      )}
                      <div>
                        <div className="n">{quotePersoon.naam}</div>
                        <div className="r">{quotePersoon.rol}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4 · Pijn → oplossing */}
      {s.oplossingen.length > 0 && (
        <section className="block solblock">
          <div className="wrap-wide">
            <SectieKop
              kicker={t.oplossingenKicker}
              titel={s.oplossingenTitel}
              intro={s.oplossingenIntro}
            />
            <div className="solhead" aria-hidden="true">
              <div>{t.kolomPijnpunt}</div>
              <div>{t.kolomKost}</div>
              <div>{t.kolomOplossing}</div>
              <div>{t.kolomLaag}</div>
            </div>
            <div className="solgrid">
              {s.oplossingen.map((o) => (
                <article className="solcard" key={o.pijn}>
                  <div>
                    <div className="m">{t.kolomPijnpunt}</div>
                    <div className="pijn">{o.pijn}</div>
                  </div>
                  <div>
                    <div className="m">{t.kolomKost}</div>
                    <div className="kost">{o.kost}</div>
                  </div>
                  <div>
                    <div className="m">{t.kolomOplossing}</div>
                    <div className="opl">{o.oplossing}</div>
                  </div>
                  <div>
                    <span className={`laag laag-${o.laag}`}>{LAAG_LABEL[o.laag]}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5 · Wat we bouwen */}
      {s.useCases.length > 0 && (
        <section className="block">
          <div className="wrap-wide">
            <SectieKop kicker={t.bouwenKicker} titel={s.bouwenTitel} />
            <div className="ucgrid">
              {s.useCases.map((u) => {
                const Icoon = SECTOR_ICONEN[u.icon];
                return (
                  <article className="uccard" key={u.titel}>
                    <Icoon />
                    <h3>{u.titel}</h3>
                    <p>{u.tekst}</p>
                    {u.sluitAanOp && (
                      <div className="link">
                        {t.sluitAanOpLabel} <b>{u.sluitAanOp}</b>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 6 · Hoe we werken */}
      {s.stappen.length > 0 && (
        <section className="block how" id="aanpak">
          <div className="wrap-wide">
            <SectieKop kicker={t.aanpakKicker} titel={s.aanpakTitel} opDonker />
            <div className="how-split">
              {s.aanpakFoto && (
                <figure className="pic">
                  <Image
                    src={s.aanpakFoto}
                    alt=""
                    width={1120}
                    height={1494}
                    sizes="(max-width: 1100px) 100vw, 40vw"
                    style={{ objectPosition: s.aanpakFotoPositie }}
                  />
                </figure>
              )}
              <div>
                <div className="how-grid">
                  {s.stappen.map((p, i) => (
                    <div className="how-step" key={p}>
                      <div className="n">{`Stap ${String(i + 1).padStart(2, "0")}`}</div>
                      <p>{p}</p>
                    </div>
                  ))}
                </div>
                {s.belofte && (
                  <div className="belofte">
                    <Handshake />
                    <p>{s.belofte}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7 · Diensten */}
      {s.dienstLinks.length > 0 && (
        <section className="block">
          <div className="wrap-wide">
            <SectieKop kicker={t.dienstenKicker} titel={s.dienstenTitel} />
            <div className="svc-links">
              {s.dienstLinks.map((d) => (
                <Link className="svc-link" href={d.href} key={d.label}>
                  {d.label} <ArrowUpRight />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8 · FAQ */}
      {s.faq.length > 0 && (
        <section className="block faqblock">
          <div className="wrap-wide">
            <SectieKop kicker={t.faqKicker} titel={s.faqTitel} />
            <div className="faq">
              {s.faq.map((f) => (
                <details key={f.vraag}>
                  <summary>
                    {f.vraag} <span className="pm">+</span>
                  </summary>
                  <p className="a">{f.antwoord}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9 · Inzichten & andere sectoren */}
      {(artikelen.length > 0 || andereSectoren.length > 0) && (
        <section className="block">
          <div className="wrap-wide">
            {artikelen.length > 0 && (
              <>
                <div className="eyebrow-row">
                  <div>
                    <div className="kicker">{t.inzichtenKicker}</div>
                    <h2>{t.inzichtenTitel}</h2>
                  </div>
                  <Link href="/inzichten" className="btn btn-outline btn-sm">
                    {t.inzichtenAlle} <ArrowRight />
                  </Link>
                </div>
                <div className="cards3">
                  {artikelen.slice(0, 3).map((a) => (
                    <ArtikelKaart key={a.slug} artikel={a} meerLabel={t.inzichtenMeer} />
                  ))}
                </div>
              </>
            )}
            {andereSectoren.length > 0 && (
              <div className="sector-links">
                <div className="kicker">{t.andereKicker}</div>
                <div className="sector-pills">
                  {andereSectoren.map((x) => (
                    <Link href={`/sectoren/${x.slug}`} key={x.slug}>
                      {x.naam} <ArrowRight />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9b · Team */}
      {teamRegels.length > 0 && (
        <section className="block teamblock">
          <div className="wrap-wide">
            <SectieKop kicker={t.teamKicker} titel={s.teamTitel} />
            <div className="team-strip">
              {teamRegels.map(({ regel, persoon }) => (
                <div className="person" key={persoon.slug}>
                  {persoon.foto && <Image src={persoon.foto} alt="" width={76} height={76} />}
                  <div>
                    <div className="n">{persoon.naam}</div>
                    <div className="r">{persoon.rol}</div>
                    <p>{regel.tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10 · CTA */}
      <section className="cta-sector">
        <div className="wrap-wide">
          <div>
            <h2>{s.ctaTitel}</h2>
            <p>{s.ctaTekst}</p>
            <div className="acts">
              <Link href={`/contact?sector=${s.slug}`} className="btn btn-on">
                {t.ctaKnop} <ArrowRight />
              </Link>
              <a href="#aanpak" className="btn btn-ghost-on">
                {t.ctaKnopTwee}
              </a>
            </div>
          </div>
          {ctaPersoon && (
            <div className="who-card">
              <div className="k">{t.ctaPersoonLabel}</div>
              <div className="row">
                {ctaPersoon.foto && <Image src={ctaPersoon.foto} alt="" width={64} height={64} />}
                <div>
                  <div className="n">{ctaPersoon.naam}</div>
                  <div className="r">{ctaPersoon.rol}</div>
                </div>
              </div>
              {s.ctaTeamlidTekst && <p>{s.ctaTeamlidTekst}</p>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
