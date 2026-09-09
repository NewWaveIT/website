import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Handshake,
  Building2,
  Truck,
  Banknote,
  HeartPulse,
  Factory,
  CalendarCheck,
  Route,
  ScanBarcode,
  BatteryCharging,
  PackageSearch,
  ClipboardCheck,
  FileCheck,
  Users,
  ShieldCheck,
  Workflow,
  Gauge,
  Boxes,
  BrainCircuit,
  MonitorSmartphone,
  ClipboardList,
  Sparkles,
  UserRound,
  CalendarDays,
  Bed,
  CalendarClock,
  TabletSmartphone,
  BadgeCheck,
  Wrench,
  Landmark,
} from "lucide-react";
import { Kruimelpad } from "@/components/kruimelpad";
import { JsonLd } from "@/components/json-ld";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { getSectorBySlug, getSectorSlugs, getSectoren } from "@/lib/sectoren-detail-data";
import { getArtikelenVoorSector, isoDatum } from "@/lib/inzichten-data";
import { getTeamleden } from "@/lib/team-data";
import { SITE_URL } from "@/lib/site";
import type { SectorIcon, TeamRegel } from "@/lib/sectoren-detail";
import type { Teamlid } from "@/lib/team";
import "./sector-detail.css";

/** De lucide-iconen die het ontwerp gebruikt. Compleet per constructie: een
 *  ontbrekend icoon is een typefout, geen lege plek op de pagina. */
const ICONEN: Record<SectorIcon, React.ComponentType<{ className?: string }>> = {
  "building-2": Building2,
  truck: Truck,
  banknote: Banknote,
  "heart-pulse": HeartPulse,
  factory: Factory,
  "calendar-check": CalendarCheck,
  route: Route,
  "scan-barcode": ScanBarcode,
  "battery-charging": BatteryCharging,
  "package-search": PackageSearch,
  "clipboard-check": ClipboardCheck,
  "file-check": FileCheck,
  users: Users,
  "shield-check": ShieldCheck,
  workflow: Workflow,
  gauge: Gauge,
  boxes: Boxes,
  "brain-circuit": BrainCircuit,
  "monitor-smartphone": MonitorSmartphone,
  "clipboard-list": ClipboardList,
  sparkles: Sparkles,
  "user-round": UserRound,
  "calendar-days": CalendarDays,
  bed: Bed,
  "calendar-clock": CalendarClock,
  "tablet-smartphone": TabletSmartphone,
  "badge-check": BadgeCheck,
  wrench: Wrench,
  landmark: Landmark,
};

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

  const [artikelen, alleSectoren, teamleden] = await Promise.all([
    getArtikelenVoorSector(s.slug),
    getSectoren(),
    getTeamleden(),
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

  const Badge = ICONEN[s.icon];

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
      <section className="shero">
        <SectorHeroAnim theme={s.heroTheme} />
        <div className="wrap-wide">
          <Kruimelpad kruimels={[{ naam: "Sectoren", pad: "/sectoren" }, { naam: s.naam }]} />
          <div className="hero-split">
            <div>
              <span className="badge">
                <Badge /> {s.naam}
              </span>
              <h1>{s.h1}</h1>
              <p>{s.intro}</p>
              <div className="hero-actions">
                <Link href={`/contact?sector=${s.slug}`} className="btn btn-primary">
                  Plan een gesprek <ArrowRight />
                </Link>
                <a href="#aanpak" className="btn btn-ghost-dark">
                  Bekijk onze aanpak
                </a>
              </div>
            </div>
            {s.heroFoto && (
              <figure className="hero-photo">
                <Image
                  src={s.heroFoto}
                  alt=""
                  width={720}
                  height={540}
                  priority
                  style={{ objectPosition: s.heroFotoPositie }}
                />
                {s.heroFotoBijschrift && <figcaption>{s.heroFotoBijschrift}</figcaption>}
              </figure>
            )}
          </div>
        </div>
      </section>

      {/* 2 · Herkenning */}
      {s.herkenning.length > 0 && (
        <section className="block pain">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">Herkenning</div>
              <h2>{s.herkenningTitel}</h2>
            </div>
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
            <div className="kicker on-dark">Wie er komt</div>
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
                <div className="kicker">Waarom nu</div>
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
                      width={640}
                      height={400}
                      style={{ objectPosition: s.waaromFotoPositie }}
                    />
                  </figure>
                )}
                {s.quote && quotePersoon && (
                  <div className="why-quote">
                    <blockquote>{`“${s.quote}”`}</blockquote>
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
            <div className="sec-head">
              <div className="kicker">Pijn → oplossing</div>
              <h2>{s.oplossingenTitel}</h2>
              {s.oplossingenIntro && <p>{s.oplossingenIntro}</p>}
            </div>
            <div className="solhead" aria-hidden="true">
              <div>Pijnpunt</div>
              <div>Wat het kost</div>
              <div>Onze oplossing</div>
              <div>Laag</div>
            </div>
            <div className="solgrid">
              {s.oplossingen.map((o) => (
                <article className="solcard" key={o.pijn}>
                  <div>
                    <div className="m">Pijnpunt</div>
                    <div className="pijn">{o.pijn}</div>
                  </div>
                  <div>
                    <div className="m">Wat het kost</div>
                    <div className="kost">{o.kost}</div>
                  </div>
                  <div>
                    <div className="m">Onze oplossing</div>
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
            <div className="sec-head">
              <div className="kicker">Wat we bouwen</div>
              <h2>{s.bouwenTitel}</h2>
            </div>
            <div className="ucgrid">
              {s.useCases.map((u) => {
                const Icoon = ICONEN[u.icon];
                return (
                  <article className="uccard" key={u.titel}>
                    <Icoon />
                    <h3>{u.titel}</h3>
                    <p>{u.tekst}</p>
                    {u.sluitAanOp && (
                      <div className="link">
                        Sluit aan op: <b>{u.sluitAanOp}</b>
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
            <div className="sec-head">
              <div className="kicker on-dark">Hoe we werken</div>
              <h2>{s.aanpakTitel}</h2>
            </div>
            <div className="how-split">
              {s.aanpakFoto && (
                <figure className="pic">
                  <Image
                    src={s.aanpakFoto}
                    alt=""
                    width={560}
                    height={747}
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
            <div className="sec-head">
              <div className="kicker">Diensten</div>
              <h2>{s.dienstenTitel}</h2>
            </div>
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
            <div className="sec-head">
              <div className="kicker">Veelgestelde vragen</div>
              <h2>{s.faqTitel}</h2>
            </div>
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
                    <div className="kicker">Inzichten</div>
                    <h2>Kennis uit deze sector</h2>
                  </div>
                  <Link href="/inzichten" className="btn btn-outline btn-sm">
                    Alle inzichten <ArrowRight />
                  </Link>
                </div>
                <div className="cards3">
                  {artikelen.slice(0, 3).map((a) => (
                    <Link href={`/inzichten/${a.slug}`} className="post" key={a.slug}>
                      <div className="cover">
                        <Image src={a.image} alt="" fill sizes="(max-width: 980px) 100vw, 33vw" />
                        <span className="cat">{a.cat}</span>
                      </div>
                      <div className="pbody">
                        <div className="meta">
                          {a.leestijd} · <time dateTime={isoDatum(a.datum)}>{a.datum}</time>
                        </div>
                        <h3>{a.titel}</h3>
                        <span className="more">
                          Lees meer <ArrowRight />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {andereSectoren.length > 0 && (
              <div className="sector-links">
                <div className="kicker" style={{ marginBottom: "var(--space-5)" }}>
                  Andere sectoren
                </div>
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
            <div className="sec-head">
              <div className="kicker">Het team</div>
              <h2>{s.teamTitel}</h2>
            </div>
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
              <Link href={`/contact?sector=${s.slug}`} className="btn btn-op-oranje">
                Plan een gesprek <ArrowRight />
              </Link>
              <a href="#aanpak" className="btn btn-ghost-on">
                Bekijk onze aanpak
              </a>
            </div>
          </div>
          {ctaPersoon && (
            <div className="who-card">
              <div className="k">Wie je spreekt</div>
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
