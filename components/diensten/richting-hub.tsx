import Link from "next/link";
import { Boxes, BrainCircuit, Route } from "lucide-react";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { SlotCta } from "@/components/layout/slot-cta";
import { getPagina } from "@/lib/paginas-data";
import { getRichtingHub, getFaseItems } from "@/lib/services-data";
import type { ServiceRichting } from "@/lib/services";
import { FaseTijdlijn } from "./fase-tijdlijn";
import { ServiceCard } from "./service-card";
import { CrossRef } from "./cross-ref";
import "./richting-hub.css";

const BADGE: Record<ServiceRichting, { Icon: typeof Boxes; label: string }> = {
  mendix: { Icon: Boxes, label: "Mendix" },
  ai: { Icon: BrainCircuit, label: "AI" },
  strategie: { Icon: Route, label: "Strategie" },
};

const RICHTING_NAAM: Record<ServiceRichting, string> = {
  mendix: "Mendix",
  ai: "AI",
  strategie: "Strategie",
};

/**
 * Gedeelde body voor de 3 richting-hubpagina's (/diensten/mendix, /ai, /strategie):
 * hero, optionele lichte-instapstrip, verkorte fasenlijn, 2-3 tier-kaarten en een
 * kruisverwijzing. Bewust géén vraagstukken/pijlers/experts/klantverhaal meer —
 * dat is nu de rijkere content op de 3 losse dienstdetailpagina's.
 */
export async function RichtingHub({ richting }: { richting: ServiceRichting }) {
  const [t, hub, dienstenPagina] = await Promise.all([
    getPagina(`diensten-${richting}`),
    getRichtingHub(richting),
    getPagina("diensten"),
  ]);
  const fases = getFaseItems(dienstenPagina);
  const { Icon, label } = BADGE[richting];
  const actieveFases = hub.tiers
    .map((tier) => tier.service.fase)
    .filter((n): n is 1 | 2 | 3 => n !== undefined);

  return (
    <div className="p-richting">
      <section className="shero">
        <SectorHeroAnim theme={richting} />
        <div className="wrap-wide">
          <div className="crumbs">
            <Link href="/">Home</Link> / <Link href="/diensten">Diensten</Link> /{" "}
            {RICHTING_NAAM[richting]}
          </div>
          <div style={{ position: "relative", paddingTop: "var(--space-6)" }}>
            <span className="badge">
              <Icon /> {t.badgeLabel || label}
            </span>
            <h1>{t.heroTitleStart}</h1>
            <p>{t.heroLead}</p>
          </div>
        </div>
      </section>

      {t.instapTitel && (
        <section className="block instap-strip">
          <div className="wrap-wide">
            <div className="kicker">Lichte instap</div>
            <h2>{t.instapTitel}</h2>
            <p>{t.instapTekst}</p>
            <Link href="/contact?type=kennismaking" className="btn btn-outline btn-sm">
              {t.instapKnop || "Plan een kennismaking (20 min)"}
            </Link>
          </div>
        </section>
      )}

      <section className="block tijdlijn-lite">
        <div className="wrap-wide">
          <FaseTijdlijn fases={fases} variant="lite" actieveFases={actieveFases} />
        </div>
      </section>

      <section className="block">
        <div className="wrap-wide">
          <div className="sec-head">
            <div className="kicker">Jouw route</div>
            <h2>Begin bij de instap, schaal op wanneer het werkt.</h2>
            <p>
              Elke stap is los te boeken. Je hoeft dus niet vooraf te kiezen hoe ver je wilt gaan.
            </p>
          </div>
          <div className="richting-ladder">
            {hub.tiers.map((tier) => (
              <div className="ladder-stap" key={tier.service.slug}>
                <div className={`ladder-kop${tier.niveau === 1 ? " ladder-kop--instap" : ""}`}>
                  <span className="num">{String(tier.niveau).padStart(2, "0")}</span>
                  <span className="label">{tier.label}</span>
                  <span className="kicker">{tier.kicker}</span>
                  {tier.niveau === 1 && <span className="begin">Begin hier</span>}
                </div>
                <ServiceCard service={tier.service} compact toonFase />
              </div>
            ))}
          </div>
        </div>
      </section>

      {hub.crossRefs.length > 0 && (
        <section className="block" style={{ paddingTop: 0 }}>
          <div className="wrap-wide">
            <CrossRef
              titel={t.crossrefTitel || "Ook relevant"}
              items={hub.crossRefs.map((s) => ({
                label: `${s.naam} — ook relevant vanuit ${RICHTING_NAAM[richting]}`,
                href: s.detailSlug ? `/diensten/${s.detailSlug}` : `/diensten#svc-${s.slug}`,
              }))}
            />
          </div>
        </section>
      )}

      <SlotCta titel={t.ctaTitel || "Klaar om de volgende stap te bepalen?"} />
    </div>
  );
}
