import "server-only";
import { cacheLife } from "next/cache";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import type { PaginaTeksten } from "@/lib/cms/pages";
import { SERVICES, type Service } from "@/lib/services";
import {
  SERVICE_FAMILIES,
  RICHTINGEN,
  BASIS_SLUG,
  type ServiceFamilie,
  type ServiceRichting,
} from "@/lib/dienstenstructuur";

/** De ladder loopt van instap naar capaciteit; binnen een niveau telt `volgorde`. */
const FAMILIE_VOLGORDE: Record<ServiceFamilie, number> = { doen: 0, richting: 1, capaciteit: 2 };

const lezer = maakLezer<Service>({
  type: "services",
  schema: CONTENT_SCHEMAS.services,
  seed: SERVICES,
  sorteer: (a, b) =>
    FAMILIE_VOLGORDE[a.familie] - FAMILIE_VOLGORDE[b.familie] || a.volgorde - b.volgorde,
});

/** Alle live diensten, gesorteerd op familie dan volgorde. */
export const getServices = lezer.alle;

export const getServiceBySlug = lezer.bijSlug;

/**
 * De catalogus: alles behalve de basisdienst. Gebruik deze waar je "de negen
 * diensten" bedoelt — overzichten, kaartenrasters, de rest-van-de-catalogus.
 * `getServices` blijft alles teruggeven, want een vervolgverwijzing of de
 * keuzelijst van het contactformulier mag de basisdienst wél noemen.
 */
export async function getCatalogus(): Promise<Service[]> {
  return (await getServices()).filter((s) => s.slug !== BASIS_SLUG);
}

/** De doorlopende basisdienst, of null als hij uit het CMS verwijderd is. */
export async function getBasisdienst(): Promise<Service | null> {
  return (await getServices()).find((s) => s.slug === BASIS_SLUG) ?? null;
}

/** Wat het contactformulier van een dienst nodig heeft, en niets meer. */
export interface DienstOptie {
  slug: string;
  naam: string;
  familie: ServiceFamilie;
  ctaType: Service["ctaType"];
}

/**
 * De keuzelijst van het contactformulier. Apart en gecachet omdat het
 * formulier achter een <Suspense> hangt (het leest queryparameters) en dus
 * buiten de paginacache valt — zonder dit zou elk bezoek de dienstentabel
 * opnieuw ophalen. Levert alleen de vier velden die de lijst toont.
 */
export async function getDienstOpties(): Promise<DienstOptie[]> {
  "use cache";
  cacheLife("content");
  return (await getServices()).map((s) => ({
    slug: s.slug,
    naam: s.naam,
    familie: s.familie,
    ctaType: s.ctaType,
  }));
}

export interface FaseTijdlijnData {
  nummer: number;
  titel: string;
  tekst: string;
}

/** Precies de tien sleutels die getFaseItems leest, geen veld meer. */
type FaseTeksten = Pick<PaginaTeksten<"diensten">, `fase${1 | 2 | 3 | 4 | 5}${"Titel" | "Tekst"}`>;

/**
 * De 5 fase-items voor <FaseTijdlijn>, met de teksten uit `t`
 * (getPagina("diensten")). Bewust zonder dienstverwijzingen: die relatie staat
 * als fase-badge op de kaarten in de keuzematrix, zodat alle vijf de fasen er
 * gelijk uitzien — ook de fasen zonder eigen dienst.
 */
export function getFaseItems(t: FaseTeksten): FaseTijdlijnData[] {
  return ([1, 2, 3, 4, 5] as const).map((n) => ({
    nummer: n,
    titel: t[`fase${n}Titel`],
    tekst: t[`fase${n}Tekst`],
  }));
}

/**
 * Per richting de instapdienst (niveau 1): de concrete, geprijsde ingang.
 * Gebruikt op de homepage, zodat de dienstensectie daar hetzelfde aanbod toont
 * als /diensten in plaats van een eigen omschrijving te onderhouden.
 */
export async function getInstapPerRichting(): Promise<
  { richting: ServiceRichting; naam: string; href: string; service: Service | null }[]
> {
  const services = await getServices();
  return RICHTINGEN.map(({ key, naam, href }) => ({
    richting: key,
    naam,
    href,
    service:
      services.find((s) => s.richting === key && (s.hubTier ?? s.familie) === "doen") ?? null,
  }));
}

export interface RichtingHubTier {
  familie: ServiceFamilie;
  niveau: number;
  label: string;
  kicker: string;
  service: Service;
}

export interface RichtingHub {
  tiers: RichtingHubTier[];
  crossRefs: Service[];
}

/**
 * De kaarten voor één richting-hub: per familie ten hoogste één dienst (nooit
 * dezelfde dienst twee keer op de site), plus de diensten die als
 * kruisverwijzing op deze hub thuishoren.
 */
export async function getRichtingHub(richting: ServiceRichting): Promise<RichtingHub> {
  const services = await getServices();

  const tiers: RichtingHubTier[] = [];
  for (const { key, niveau, label, kicker } of SERVICE_FAMILIES) {
    const kandidaten = services
      .filter((s) => s.richting === richting && (s.hubTier ?? s.familie) === key)
      .sort((a, b) => a.volgorde - b.volgorde);
    const service = kandidaten[0];
    if (service) tiers.push({ familie: key, niveau, label, kicker, service });
  }

  const crossRefs = services.filter(
    (s) => s.richting !== richting && (s.ookRelevantVoor ?? []).includes(richting),
  );

  return { tiers, crossRefs };
}
