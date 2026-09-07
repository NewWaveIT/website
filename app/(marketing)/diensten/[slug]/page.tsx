import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Boxes, BrainCircuit, Route, Check, Plus, ArrowRight } from "lucide-react";
import { getDienstBySlug, getDienstSlugs } from "@/lib/diensten-detail-data";
import { stripHtml } from "@/lib/cms/sanitize";
import { getArtikelenVoorDienst } from "@/lib/inzichten-data";
import { getServices, getServiceBySlug } from "@/lib/services-data";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { SlotCta } from "@/components/layout/slot-cta";
import "./dienst-detail.css";

export const revalidate = 300;

const BADGE_ICON = { boxes: Boxes, "brain-circuit": BrainCircuit, route: Route };

export async function generateStaticParams() {
  return (await getDienstSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDienstBySlug(slug);
  if (!d) return {};
  return {
    title: `${d.naam} — ${d.h1}`,
    description: stripHtml(d.intro),
    alternates: { canonical: `/diensten/${slug}` },
  };
}

export default async function DienstPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = await getDienstBySlug(slug);
  if (!d) notFound();
  const artikelen = await getArtikelenVoorDienst(slug);
  const service = d.serviceSlug ? await getServiceBySlug(d.serviceSlug) : null;
  const alleServices = service?.volgendeStapSlugs?.length ? await getServices() : [];
  const vervolgLinks = (service?.volgendeStapSlugs ?? [])
    .map((s) => alleServices.find((v) => v.slug === s))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));

  const Badge = BADGE_ICON[d.badgeIcon];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.naam,
    description: stripHtml(d.intro),
    provider: { "@type": "Organization", name: "The New Wave IT" },
    url: `https://thenewwaveit.com/diensten/${slug}`,
  };

  return (
    <div className="p-dienst">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="shero">
        <SectorHeroAnim theme={d.heroTheme ?? slug} />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/diensten">Diensten</Link> / {d.naam}
          </div>
          <div style={{ position: "relative", paddingTop: "var(--space-6)" }}>
            <span className="badge">
              <Badge /> {d.badgeLabel}
            </span>
            <h1>{d.h1}</h1>
            <p dangerouslySetInnerHTML={{ __html: d.intro }} />
            {service && (
              <p className="feiten-strip">
                {service.doelgroep} · {service.duur}
                {service.prijzen[0] ? ` · ${service.prijzen[0].label}` : ""}
              </p>
            )}
            <div className="hero-actions">
              <Link
                href={service ? `/contact?dienst=${service.slug}` : "/contact"}
                className="btn btn-primary"
              >
                {service?.ctaLabel ?? "Plan een gesprek"} <ArrowRight />
              </Link>
              <Link href="/klantverhalen" className="btn btn-ghost-dark">
                {d.ctaSecondary}
              </Link>
            </div>
            <div className="kpis">
              {d.kpis.map((k, i) => (
                <div key={i}>
                  <div className="n">{k.n}</div>
                  <div className="l">{k.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <nav className="subnav" aria-label="Op deze pagina">
        <div className="wrap-wide">
          <a href="#vraagstukken">Vraagstukken</a>
          {d.pijlers.length > 0 && <a href="#diensten">{d.naam}-diensten</a>}
          {d.aanpak.length > 0 && <a href="#aanpak">Aanpak</a>}
          {(d.waarom.length > 0 || d.experts.length > 0) && <a href="#waarom">Waarom wij</a>}
          {d.caseTitle && <a href="#klantverhaal">Klantverhalen</a>}
        </div>
      </nav>

      <section className="block" id="vraagstukken">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Wanneer zet je dit in</div>
            <h2
              style={{
                fontSize: "var(--text-3xl)",
                fontWeight: "var(--fw-extrabold)",
                margin: "var(--space-4) 0",
              }}
            >
              Hiervoor komen organisaties bij ons
            </h2>
          </div>
          <div className="chal-grid">
            {d.vraagstukken.map((v, i) => (
              <div className="chal-card" key={i}>
                <div className="q">{v.q}</div>
                <h3>{v.titel}</h3>
                <p>{v.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {d.pijlers.length > 0 && (
        <section className="block" id="diensten" style={{ background: "var(--eggshell)" }}>
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Wat we doen</div>
              <h2
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--fw-extrabold)",
                  margin: "var(--space-4) 0",
                }}
              >
                Onze {d.naam}-diensten
              </h2>
              <p>{d.pijlersIntro}</p>
            </div>
            <div className="pillars">
              {d.pijlers.map((p) => (
                <div className="pillar" key={p.num}>
                  <div className="num">{p.num}</div>
                  <h3>{p.titel}</h3>
                  <p>{p.p}</p>
                  {p.items.map((it, idx) => (
                    <details key={idx} open={idx === 0}>
                      <summary>
                        {it.summary} <Plus />
                      </summary>
                      <p>{it.p}</p>
                    </details>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {d.aanpak.length > 0 && (
        <section className="block sol" id="aanpak" style={{ background: "var(--paper)" }}>
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Onze aanpak</div>
              <h2
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--fw-extrabold)",
                  margin: "var(--space-4) 0",
                }}
              >
                Zo pakken we het aan
              </h2>
            </div>
            {d.aanpak.map((row, i) => (
              <div className={i % 2 === 1 ? "sol-row rev" : "sol-row"} key={i}>
                <div className="txt">
                  <div className="kicker">{row.kicker}</div>
                  <h3>{row.titel}</h3>
                  <p>{row.p}</p>
                  <ul>
                    {row.punten.map((pt, idx) => (
                      <li key={idx}>
                        <Check /> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="ph">
                  <Image
                    src={row.img}
                    alt=""
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(d.waarom.length > 0 || d.experts.length > 0) && (
        <section className="block why" id="waarom">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Waarom The New Wave IT</div>
              <h2
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--fw-extrabold)",
                  margin: "var(--space-4) 0",
                }}
              >
                De juiste partner voor jouw traject
              </h2>
            </div>
            <div className="grid">
              {d.waarom.length > 0 && (
                <div>
                  {d.waarom.map((w, i) => (
                    <div className="vitem" key={i}>
                      <div className="num">{String(i + 1).padStart(2, "0")}</div>
                      <div>
                        <h4>{w.titel}</h4>
                        <p>{w.p}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {d.experts.length > 0 && (
                <div className="experts">
                  <p className="exphead">{d.expertsHead}</p>
                  {d.experts.map((e, i) => (
                    <div className="expert" key={i}>
                      <Image src={e.img} alt={`Portret ${e.naam}`} width={76} height={76} />
                      <div>
                        <div className="role">{e.role}</div>
                        <h4>{e.naam}</h4>
                        <div className="links">
                          <a href={`tel:${e.tel}`}>{e.tel.replace("+31", "0")}</a>
                          <a href="mailto:hello@thenewwaveit.com">Mail</a>
                          <a
                            href="https://www.linkedin.com/company/the-new-wave-it"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            LinkedIn
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {d.partners.length > 0 && (
        <section className="partners-strip">
          <div className="wrap-wide">
            <span className="plabel">Technologiepartners</span>
            {d.partners.map((p) => (
              <span className="plogo" key={p}>
                {p}
              </span>
            ))}
          </div>
        </section>
      )}

      {d.outcomes.length > 0 && (
        <section className="block outcomes">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker on-dark">Resultaten met {d.naam}</div>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--fw-extrabold)",
                  margin: "var(--space-4) 0 0",
                }}
              >
                Wat het oplevert
              </h2>
            </div>
            <div className="grid">
              {d.outcomes.map((o, i) => (
                <div className="oc" key={i}>
                  <div className="n">{o.n}</div>
                  <div className="l">{o.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!d.caseTitle && d.waarborg && (
        <section className="block">
          <div className="wrap-wide">
            <div className="waarborg-card">
              <p>{d.waarborg}</p>
            </div>
          </div>
        </section>
      )}

      {d.caseTitle && (
        <section className="block featured" id="klantverhaal">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Klantverhaal</div>
              <h2
                style={{
                  fontSize: "var(--text-3xl)",
                  fontWeight: "var(--fw-extrabold)",
                  margin: "var(--space-4) 0 0",
                }}
              >
                {d.caseTitle}
              </h2>
            </div>
            <div className="case-mini">
              <div className="media" style={{ backgroundImage: `url('${d.caseImage}')` }} />
              <div className="body">
                <div className="kicker">{d.caseSector}</div>
                <blockquote>{d.caseQuote}</blockquote>
                <div className="who">
                  <strong>{d.caseNaam}</strong>, {d.caseRol}
                  <br />
                  <Link
                    href={d.caseHref ?? "/klantverhalen"}
                    className="more"
                    style={{ display: "inline-block", marginTop: 14 }}
                  >
                    Lees het volledige verhaal →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {(artikelen.length > 0 || d.insights.length > 0) && (
        <section className="block">
          <div className="wrap-wide">
            <div className="eyebrow-row">
              <div>
                <div className="kicker">Inzichten</div>
                <h2>{d.insightsTitle}</h2>
              </div>
              <Link href="/inzichten" className="btn btn-outline btn-sm">
                Alle inzichten <ArrowRight />
              </Link>
            </div>
            <div className="cards3">
              {artikelen.length > 0
                ? artikelen.slice(0, 3).map((a) => (
                    <Link href={`/inzichten/${a.slug}`} className="post" key={a.slug}>
                      <div className="cover">
                        <Image
                          src={a.image}
                          alt={a.titel}
                          fill
                          sizes="(max-width: 980px) 100vw, 33vw"
                          style={{ objectFit: "cover" }}
                        />
                        <span className="cat">{a.cat}</span>
                      </div>
                      <div className="pbody">
                        <div className="meta">
                          {a.leestijd} · {a.datum}
                        </div>
                        <h3>{a.titel}</h3>
                        <span className="more">
                          Lees meer <ArrowRight />
                        </span>
                      </div>
                    </Link>
                  ))
                : d.insights.map((post, i) => (
                    <article className="post" key={i}>
                      <div className="cover">
                        <span className="cat">{post.cat}</span>
                      </div>
                      <div className="pbody">
                        <div className="meta">{post.meta}</div>
                        <h3>{post.titel}</h3>
                        <Link href="/inzichten" className="more">
                          Lees meer <ArrowRight />
                        </Link>
                      </div>
                    </article>
                  ))}
            </div>
          </div>
        </section>
      )}

      {service?.volgendeStap && (
        <section className="block">
          <div className="wrap-wide">
            <div className="waarborg-card">
              <div className="kicker">Logische volgende stap</div>
              <p>{service.volgendeStap}</p>
              {vervolgLinks.length > 0 && (
                <div className="vervolg-links">
                  {vervolgLinks.map((v) => (
                    <Link
                      key={v.slug}
                      href={
                        v.detailSlug ? `/diensten/${v.detailSlug}` : `/contact?dienst=${v.slug}`
                      }
                      className="more"
                    >
                      {v.naam} <ArrowRight />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <SlotCta titel={d.ctaTitle} />
    </div>
  );
}
