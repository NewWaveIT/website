import { JsonLd } from "@/components/json-ld";
import { cacheLife } from "next/cache";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { PaginaHero } from "@/components/layout/pagina-hero";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { SlotCta } from "@/components/layout/slot-cta";
import { getPagina } from "@/lib/paginas-data";
import { getCatalogus, getBasisdienst, getInstapPerRichting } from "@/lib/services-data";
import { getContactpersoon } from "@/lib/team-data";
import { SERVICE_FAMILIES } from "@/lib/dienstenstructuur";
import type { Service } from "@/lib/services";
import { SITE_URL } from "@/lib/site";
import "./diensten.css";

/* Dienstenoverzicht — geport uit ui_kits/website/diensten.html (Claude Design).
   De pagina zet de doorlopende basisdienst apart bovenaan en verdeelt de
   catalogus daaronder in instap (één dag) en verdieping (twee faseblokken). */

export const metadata: Metadata = {
  title: "Diensten: consultants die meebouwen, of een dienst met vaste scope",
  description:
    "Consultants die in jouw team meebouwen aan Mendix en AI, of een afgebakende dienst met vaste scope en een prijs vooraf. Begin met één dag.",
  alternates: { canonical: "/diensten" },
};

/** Prijsregel; leeg betekent bewust "op aanvraag", niet "gratis". */
function prijsRegel(s: Service): { label: string; variant?: string } {
  const eerste = s.prijzen[0];
  return eerste ? { label: eerste.label, variant: eerste.variant } : { label: "Prijs op aanvraag" };
}

/** "Eén dag · zes tot tien deelnemers" — de metaregel onder een instapkaart. */
function metaRegel(s: Service): string {
  return [s.duur, s.groepsgrootte].filter(Boolean).join(" · ");
}

export default async function DienstenPage() {
  "use cache";
  cacheLife("content");

  const [t, catalogus, basis, instap, contactpersoon] = await Promise.all([
    getPagina("diensten"),
    getCatalogus(),
    getBasisdienst(),
    getInstapPerRichting(),
    getContactpersoon("sales"),
  ]);

  const rollen = ([1, 2, 3, 4] as const)
    .map((n) => ({
      label: t[`basisRol${n}Label`],
      naam: t[`basisRol${n}Naam`],
      tekst: t[`basisRol${n}Tekst`],
    }))
    .filter((r) => r.label && r.naam);
  const basisPunten = ([1, 2, 3, 4] as const).map((n) => t[`basisPunt${n}`]).filter(Boolean);

  // De instapkaarten zijn de drie diensten van niveau 1, één per richting; de
  // verdieping is de rest van de catalogus, gegroepeerd op niveau.
  const instapDiensten = instap
    .map((i) => i.service)
    .filter((s): s is Service => s !== null)
    .map((s) => ({ service: s, spoor: instap.find((i) => i.service === s)?.naam ?? "" }));

  const verdieping = SERVICE_FAMILIES.filter((f) => f.key !== "doen").map((familie) => ({
    ...familie,
    tekst: familie.key === "richting" ? t.verdiepingRichtingTekst : t.verdiepingCapaciteitTekst,
    diensten: catalogus.filter((s) => (s.hubTier ?? s.familie) === familie.key),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [...(basis ? [basis] : []), ...catalogus].map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/diensten/${s.slug}`,
      item: {
        "@type": "Service",
        name: s.naam,
        description: s.pitch,
        provider: { "@type": "Organization", name: "The New Wave IT" },
      },
    })),
  };

  return (
    <div className="p-diensten">
      <JsonLd data={jsonLd} />

      {/* 1 · Hero */}
      <PaginaHero
        kruimels={[{ naam: "Diensten", pad: "/diensten" }]}
        kicker="Diensten"
        titel={t.heroTitleStart ?? ""}
        accent={t.heroAccent}
        staart={t.heroTitleEnd}
        lead={t.heroLead}
        achtergrond={<SectorHeroAnim theme="diensten" />}
      />

      {/* 2 · De doorlopende basisdienst, naast de catalogus */}
      {basis && (
        <section className="basis">
          <div className="wrap-wide">
            <div className="basis-inner">
              <div>
                <div className="kicker">{t.basisKicker}</div>
                <h2>{t.basisTitel}</h2>
                <p className="b">{t.basisTekst}</p>
                {rollen.length > 0 && (
                  <dl className="rollen">
                    {rollen.map((r) => (
                      <div key={r.label}>
                        <dt className="l">{r.label}</dt>
                        <dd className="v">{r.naam}</dd>
                        {r.tekst && <dd className="d">{r.tekst}</dd>}
                      </div>
                    ))}
                  </dl>
                )}
              </div>

              <aside className="basis-card">
                {contactpersoon && (
                  <div className="pic">
                    {contactpersoon.foto && (
                      <Image
                        src={contactpersoon.foto}
                        alt={contactpersoon.naam}
                        width={136}
                        height={136}
                        sizes="68px"
                      />
                    )}
                    <div>
                      <div className="r">{t.basisPersoonRol}</div>
                      <div className="n">
                        {contactpersoon.naam}, {contactpersoon.rol}
                      </div>
                      <p>{t.basisPersoonTekst}</p>
                    </div>
                  </div>
                )}
                <div className="l">{t.basisInzetLabel}</div>
                <div className="v">{t.basisInzetWaarde}</div>
                {basisPunten.length > 0 && (
                  <ul>
                    {basisPunten.map((p) => (
                      <li key={p}>
                        <Check aria-hidden="true" /> {p}
                      </li>
                    ))}
                  </ul>
                )}
                <Link href={`/contact?dienst=${basis.slug}`} className="btn btn-primary">
                  {t.basisCta} <ArrowRight />
                </Link>
                <Link href="/werken-bij" className="alt">
                  {t.basisCtaAlt}
                </Link>
              </aside>
            </div>
          </div>
        </section>
      )}

      {/* 3 · Begin hier — de drie instapdiensten */}
      {instapDiensten.length > 0 && (
        <section className="block cat">
          <div className="wrap-wide">
            <div className="sec-head">
              <div className="kicker">{t.instapKicker}</div>
              <h2>{t.instapTitel}</h2>
              <p>{t.instapIntro}</p>
            </div>
            <div className="instap-grid">
              {instapDiensten.map(({ service: s, spoor }) => {
                const prijs = prijsRegel(s);
                return (
                  <article className="cat-card" key={s.slug}>
                    <div className="top">
                      <span className="fase">Instap</span>
                      <span className="spoor">{spoor}</span>
                    </div>
                    <h3>{s.naam}</h3>
                    <p className="q">{s.pitch}</p>
                    <div className="meta">{metaRegel(s)}</div>
                    <div className="price">
                      {prijs.label}
                      {prijs.variant && <small>{prijs.variant}</small>}
                    </div>
                    <Link
                      href={`/contact?dienst=${s.slug}`}
                      className="btn btn-primary btn-sm"
                      aria-label={`${s.ctaLabel}, ${s.naam}`}
                    >
                      {s.ctaLabel}
                    </Link>
                    <Link
                      href={`/diensten/${s.slug}`}
                      className="more"
                      aria-label={`Meer over ${s.naam}`}
                    >
                      Meer over deze dienst →
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4 · Verder in het traject */}
      <section className="block">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">{t.verdiepingKicker}</div>
            <h2>{t.verdiepingTitel}</h2>
            <p>{t.verdiepingIntro}</p>
          </div>
          {verdieping.map((blok) => (
            <div className="fase-block" key={blok.key}>
              <div className="fase-head">
                <span className="n">{String(blok.niveau).padStart(2, "0")}</span>
                <div>
                  <h3>{blok.kicker}</h3>
                  {blok.tekst && <p>{blok.tekst}</p>}
                </div>
              </div>
              <div className="lite-list">
                {blok.diensten.map((s) => (
                  <Link className="lite-row" href={`/diensten/${s.slug}`} key={s.slug}>
                    <span className="sp">{spoorLabel(s)}</span>
                    <span className="tt">
                      <strong>{s.naam}</strong>
                      <span className="d">{s.pitch}</span>
                    </span>
                    <span className="du">{s.duur}</span>
                    <span className="pr">{prijsRegel(s).label}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SlotCta titel={t.ctaTitel ?? ""} />
    </div>
  );
}

/** "Mendix", of "Mendix · AI" voor een dienst die geen eigen richting heeft. */
function spoorLabel(s: Service): string {
  const namen = { mendix: "Mendix", ai: "AI", strategie: "Strategie" } as const;
  if (s.richting) return namen[s.richting];
  const overig = (s.ookRelevantVoor ?? []).map((r) => namen[r]);
  return overig.length ? overig.join(" · ") : "Diensten";
}
