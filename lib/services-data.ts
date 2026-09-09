import "server-only";
import { CONTENT_SCHEMAS } from "@/lib/cms/schemas";
import { maakLezer } from "@/lib/cms/lees";
import { SERVICES, type Service } from "@/lib/services";
import {
  SERVICE_FAMILIES,
  RICHTINGEN,
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

export interface MatrixCel {
  richting: ServiceRichting;
  service: Service;
}

export interface MatrixRij {
  familie: ServiceFamilie;
  niveau: number;
  label: string;
  kicker: string;
  /**
   * "kolommen" = elke richting heeft op dit niveau een dienst, dus de rij lijnt
   * uit op de kolomkoppen. "breed" = het niveau werkt richting-overstijgend en
   * de rij loopt door over de volle breedte. Zo blijft de rij altijd gevuld en
   * ontstaat er nooit een zichtbaar gat.
   */
  layout: "kolommen" | "breed";
  /** Alleen bij layout "kolommen". */
  cellen: MatrixCel[];
  /** Alleen bij layout "breed": alle diensten van dit niveau, in leesvolgorde. */
  diensten: Service[];
}

export interface DienstMatrix {
  rijen: MatrixRij[];
}

/**
 * De keuzematrix van /diensten: richtingen als kolommen, de drie niveaus als
 * rijen (instap bovenaan). Eén dienst staat op precies één plek, zodat de
 * bezoeker een kolom kiest en van boven naar beneden opschaalt.
 */
export async function getDienstMatrix(): Promise<DienstMatrix> {
  const services = await getServices();

  const rijen: MatrixRij[] = SERVICE_FAMILIES.map(({ key, niveau, label, kicker }) => {
    const opNiveau = (s: Service) => (s.hubTier ?? s.familie) === key;
    const perRichting = RICHTINGEN.map(({ key: richting }) => ({
      richting,
      service: services.find((s) => s.richting === richting && opNiveau(s)),
    }));
    const volledig = perRichting.every((c) => c.service);
    const diensten = [
      ...perRichting.map((c) => c.service),
      ...services.filter((s) => !s.richting && opNiveau(s)),
    ].filter((s): s is Service => Boolean(s));

    return {
      familie: key,
      niveau,
      label,
      kicker,
      layout: volledig && diensten.length === RICHTINGEN.length ? "kolommen" : "breed",
      cellen: volledig ? (perRichting as MatrixCel[]) : [],
      diensten,
    };
  });

  return { rijen };
}

export interface FaseTijdlijnData {
  nummer: number;
  titel: string;
  tekst: string;
}

/**
 * De 5 fase-items voor <FaseTijdlijn>, met de teksten uit `t`
 * (getPagina("diensten")). Bewust zonder dienstverwijzingen: die relatie staat
 * als fase-badge op de kaarten in de keuzematrix, zodat alle vijf de fasen er
 * gelijk uitzien — ook de fasen zonder eigen dienst.
 */
export function getFaseItems(t: Record<string, string>): FaseTijdlijnData[] {
  return [1, 2, 3, 4, 5].map((n) => ({
    nummer: n,
    titel: t[`fase${n}Titel`] ?? "",
    tekst: t[`fase${n}Tekst`] ?? "",
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
