import Link from "next/link";
import { PaginaHero } from "@/components/layout/pagina-hero";
import { Boxes, BrainCircuit, Route } from "lucide-react";
import { SectorHeroAnim } from "@/components/sector-hero-anim";
import { SlotCta } from "@/components/layout/slot-cta";
import { getPagina } from "@/lib/paginas-data";
import { getRichtingHub, getFaseItems } from "@/lib/services-data";
import { getRichtingBySlug } from "@/lib/diensten-detail-data";
import { getArtikelenVoorDienst } from "@/lib/inzichten-data";
import { getSectoren } from "@/lib/sectoren-detail-data";
import type { ServiceRichting } from "@/lib/services";
import { FaseTijdlijn } from "./fase-tijdlijn";
import { ServiceCard } from "./service-card";
import { CrossRef } from "./cross-ref";
import { VraagstukkenSectie, WelNietSectie } from "./secties/probleem";
import { PijlersSectie, AanpakSectie } from "./secties/aanpak";
import { WaaromSectie, PartnersSectie, OutcomesSectie } from "./secties/bewijs";
import { KlantverhaalSectie, SectorkoppelingSectie, InzichtenSectie } from "./secties/verwijzingen";
import "./secties/secties.css";
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
 * Gedeelde body voor de 3 richting-hubpagina's (/diensten/mendix, /ai, /strategie).
 *
 * Het aanbod staat hoog — de dienstenladder is waar iemand boekt — en de
 * verdieping eronder. Die verdieping komt uit het contenttype `diensten`, dat
 * de drie richtingen beschrijft; de kaarten komen uit `services`. Elke sectie
 * verbergt zichzelf als hij leeg is.
 */
export async function RichtingHub({ richting }: { richting: ServiceRichting }) {
  const [t, hub, dienstenPagina, inhoud, artikelen, alleSectoren] = await Promise.all([
    getPagina(`diensten-${richting}`),
    getRichtingHub(richting),
    getPagina("diensten"),
    getRichtingBySlug(richting),
    getArtikelenVoorDienst(richting),
    getSectoren(),
  ]);
  const fases = getFaseItems(dienstenPagina);
  const { Icon, label } = BADGE[richting];
  const actieveFases = hub.tiers
    .map((tier) => tier.service.fase)
    .filter((n): n is 1 | 2 | 3 => n !== undefined);

  // Sectorkoppeling: slugs uit de richting-content, namen uit de sectoren zelf.
  const sectoren = (inhoud?.sectoren ?? [])
    .map((slug) => alleSectoren.find((x) => x.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .map((x) => ({ slug: x.slug, naam: x.naam }));

  return (
    <div className="p-richting dienst-secties">
      <PaginaHero
        kruimels={[{ naam: "Diensten", pad: "/diensten" }, { naam: RICHTING_NAAM[richting] }]}
        kicker={
          <span className="badge">
            <Icon /> {t.badgeLabel || label}
          </span>
        }
        titel={t.heroTitleStart ?? ""}
        lead={t.heroLead}
        achtergrond={<SectorHeroAnim theme={richting} />}
      />

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

      {inhoud && (
        <>
          <VraagstukkenSectie vraagstukken={inhoud.vraagstukken} />
          <PijlersSectie
            pijlers={inhoud.pijlers}
            intro={inhoud.pijlersIntro}
            naam={RICHTING_NAAM[richting]}
          />
          <AanpakSectie aanpak={inhoud.aanpak} />
          <WelNietSectie
            titel={inhoud.welNietTitel}
            wel={inhoud.welWanneer}
            niet={inhoud.nietWanneer}
          />
          <WaaromSectie
            waarom={inhoud.waarom}
            experts={inhoud.experts}
            expertsHead={inhoud.expertsHead}
          />
          <PartnersSectie partners={inhoud.partners} />
          <OutcomesSectie outcomes={inhoud.outcomes} naam={RICHTING_NAAM[richting]} />
          <KlantverhaalSectie
            caseTitle={inhoud.caseTitle}
            caseSector={inhoud.caseSector}
            caseQuote={inhoud.caseQuote}
            caseNaam={inhoud.caseNaam}
            caseRol={inhoud.caseRol}
            caseImage={inhoud.caseImage}
            caseHref={inhoud.caseHref}
            waarborg={inhoud.waarborg}
          />
          <SectorkoppelingSectie sectoren={sectoren} />
          <InzichtenSectie
            artikelen={artikelen}
            titel={inhoud.insightsTitle || `Kennis over ${RICHTING_NAAM[richting]}`}
          />
        </>
      )}

      {hub.crossRefs.length > 0 && (
        <section className="block crossref-blok">
          <div className="wrap-wide">
            <CrossRef
              titel={t.crossrefTitel || "Ook relevant"}
              items={hub.crossRefs.map((s) => ({
                label: `${s.naam} — ook relevant vanuit ${RICHTING_NAAM[richting]}`,
                href: `/diensten/${s.slug}`,
              }))}
            />
          </div>
        </section>
      )}

      <SlotCta titel={t.ctaTitel || "Klaar om de volgende stap te bepalen?"} />
    </div>
  );
}
