import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getServices, getServiceBySlug } from "@/lib/services-data";
import { getArtikelenVoorDienst } from "@/lib/inzichten-data";
import { RICHTINGEN } from "@/lib/services";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { SlotCta } from "@/components/layout/slot-cta";
import { BreadcrumbJsonLd } from "@/components/breadcrumb-jsonld";
import { VraagstukkenSectie } from "@/components/diensten/secties/probleem";
import { AanpakSectie } from "@/components/diensten/secties/aanpak";
import { WaaromSectie, OutcomesSectie } from "@/components/diensten/secties/bewijs";
import { KlantverhaalSectie, InzichtenSectie } from "@/components/diensten/secties/verwijzingen";
import { SITE_URL } from "@/lib/site";
import "@/components/diensten/secties/secties.css";
import "./dienst.css";

export const revalidate = 300;

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s) return {};
  return {
    title: s.naam,
    description: s.pitch,
    alternates: { canonical: `/diensten/${slug}` },
  };
}

export default async function DienstPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [s, artikelen] = await Promise.all([getServiceBySlug(slug), getArtikelenVoorDienst(slug)]);
  if (!s) notFound();

  const richting = RICHTINGEN.find((r) => r.key === s.richting);
  const vervolg = s.volgendeStapSlugs?.length
    ? (await getServices()).filter((v) => s.volgendeStapSlugs?.includes(v.slug))
    : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.naam,
    description: s.pitch,
    provider: { "@type": "Organization", name: "The New Wave IT" },
    url: `${SITE_URL}/diensten/${slug}`,
  };

  return (
    <div className="p-dienst dienst-secties">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <BreadcrumbJsonLd
        kruimels={[
          { naam: "Home", pad: "/" },
          { naam: "Diensten", pad: "/diensten" },
          ...(richting ? [{ naam: richting.naam, pad: richting.href }] : []),
          { naam: s.naam },
        ]}
      />

      <section className="shero">
        <SectorHeroAnim theme={s.richting ?? "diensten"} />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/diensten">Diensten</Link>
            {richting && (
              <>
                {" / "}
                <Link href={richting.href}>{richting.naam}</Link>
              </>
            )}{" "}
            / {s.naam}
          </div>
          <div style={{ position: "relative", paddingTop: "var(--space-6)" }}>
            <h1>{s.naam}</h1>
            <p>{s.pitch}</p>
            <p className="feiten-strip">
              {s.doelgroep} · {s.duur}
              {s.groepsgrootte ? ` · ${s.groepsgrootte}` : ""}
            </p>
            <div className="dienst-prijzen">
              {s.prijzen.map((p) => (
                <span key={p.label}>
                  <strong>{p.label}</strong>
                  {p.variant ? ` ${p.variant}` : ""}
                </span>
              ))}
            </div>
            <div className="hero-actions">
              <Link href={`/contact?dienst=${s.slug}`} className="btn btn-primary">
                {s.ctaLabel} <ArrowRight />
              </Link>
              <Link href="/diensten" className="btn btn-ghost-dark">
                Alle diensten
              </Link>
            </div>
            {s.kpis && s.kpis.length > 0 && (
              <div className="kpis">
                {s.kpis.map((k, i) => (
                  <div key={i}>
                    <div className="n">{k.n}</div>
                    <div className="l">{k.l}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Wat de kaart in de matrix ook toont, hier voluit. */}
      <section className="block">
        <div className="wrap-wide">
          <div className="dienst-intro">
            <p>{s.beschrijving}</p>
            {s.resultaten.length > 0 && (
              <ul className="dienst-resultaten">
                {s.resultaten.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <VraagstukkenSectie vraagstukken={s.vraagstukken ?? []} />
      <AanpakSectie aanpak={s.aanpak ?? []} />
      <WaaromSectie waarom={s.waarom ?? []} />
      <OutcomesSectie outcomes={s.outcomes ?? []} naam={s.naam} />
      <KlantverhaalSectie
        caseTitle={s.caseTitle}
        caseSector={s.caseSector}
        caseQuote={s.caseQuote}
        caseNaam={s.caseNaam}
        caseRol={s.caseRol}
        caseImage={s.caseImage}
        caseHref={s.caseHref}
      />
      <InzichtenSectie artikelen={artikelen} titel={`Kennis over ${s.naam}`} />

      {s.volgendeStap && (
        <section className="block">
          <div className="wrap-wide">
            <div className="waarborg-card">
              <div className="kicker">Logische volgende stap</div>
              <p>{s.volgendeStap}</p>
              {vervolg.length > 0 && (
                <div className="vervolg-links">
                  {vervolg.map((v) => (
                    <Link key={v.slug} href={`/diensten/${v.slug}`} className="more">
                      {v.naam} <ArrowRight />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <SlotCta titel={`Benieuwd of ${s.naam} bij jouw vraagstuk past?`} knop={s.ctaLabel} />
    </div>
  );
}
