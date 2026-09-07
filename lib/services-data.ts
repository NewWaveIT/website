import "server-only";
import { getPublishedContent, type ContentRow } from "@/lib/cms/content";
import {
  SERVICES,
  SERVICE_FAMILIES,
  RICHTINGEN,
  type Service,
  type ServiceFamilie,
  type ServiceRichting,
} from "@/lib/services";

const arr = (v: unknown, fallback: string[] = []): string[] =>
  Array.isArray(v) ? v.map((x) => String(x)).filter(Boolean) : fallback;

function toRichting(v?: string): ServiceRichting | undefined {
  return v === "mendix" || v === "ai" || v === "strategie" ? v : undefined;
}

function toFamilie(v?: string): ServiceFamilie | undefined {
  return v === "doen" || v === "richting" || v === "capaciteit" ? v : undefined;
}

function toFase(v?: string): 1 | 2 | 3 | undefined {
  const n = Number(v);
  return n === 1 || n === 2 || n === 3 ? n : undefined;
}

/**
 * De keuzevelden in het CMS hebben expliciete 'leeg'-opties ("(geen)",
 * "(zelfde als familie)"). Zo'n keuze moet de seed-waarde wíssen, niet erop
 * terugvallen — anders lijkt het veld in de admin niets te doen.
 */
const SENTINELS = new Set(["(geen)", "(zelfde als familie)"]);

function keuze(d: Record<string, unknown>, key: string): { gezet: boolean; waarde?: string } {
  if (!(key in d)) return { gezet: false };
  const s = typeof d[key] === "string" ? (d[key] as string).trim() : String(d[key] ?? "");
  return s && !SENTINELS.has(s) ? { gezet: true, waarde: s } : { gezet: true };
}

function mapRow(row: ContentRow): Service {
  const base = SERVICES.find((s) => s.slug === row.slug);
  const d = row.data as Partial<Service>;
  const rij = row.data as Record<string, unknown>;
  const kFamilie = keuze(rij, "familie");
  const kRichting = keuze(rij, "richting");
  const kHubTier = keuze(rij, "hubTier");
  const kFase = keuze(rij, "fase");
  return {
    slug: row.slug,
    naam: row.titel || base?.naam || row.slug,
    familie:
      (kFamilie.gezet ? toFamilie(kFamilie.waarde) : base?.familie) ?? base?.familie ?? "doen",
    richting: kRichting.gezet ? toRichting(kRichting.waarde) : base?.richting,
    hubTier: kHubTier.gezet ? toFamilie(kHubTier.waarde) : base?.hubTier,
    ookRelevantVoor: arr(d.ookRelevantVoor, base?.ookRelevantVoor ?? []).filter(
      (r): r is ServiceRichting => r === "mendix" || r === "ai" || r === "strategie",
    ),
    fase: kFase.gezet ? toFase(kFase.waarde) : base?.fase,
    pitch: String(d.pitch ?? base?.pitch ?? ""),
    beschrijving: String(d.beschrijving ?? base?.beschrijving ?? ""),
    doelgroep: String(d.doelgroep ?? base?.doelgroep ?? ""),
    duur: String(d.duur ?? base?.duur ?? ""),
    groepsgrootte: d.groepsgrootte ? String(d.groepsgrootte) : base?.groepsgrootte,
    prijzen: Array.isArray(d.prijzen) && d.prijzen.length ? d.prijzen : (base?.prijzen ?? []),
    resultaten: arr(d.resultaten, base?.resultaten ?? []),
    volgendeStap: String(d.volgendeStap ?? base?.volgendeStap ?? ""),
    volgendeStapSlugs: d.volgendeStapSlugs ? arr(d.volgendeStapSlugs) : base?.volgendeStapSlugs,
    ctaLabel: String(d.ctaLabel ?? base?.ctaLabel ?? "Neem contact op"),
    ctaType:
      d.ctaType === "kennismaking" || d.ctaType === "datum"
        ? d.ctaType
        : (base?.ctaType ?? "datum"),
    detailSlug: d.detailSlug ? String(d.detailSlug) : base?.detailSlug,
    volgorde: Number(row.volgorde ?? base?.volgorde ?? 0),
  };
}

const FAMILIE_ORDER: Record<ServiceFamilie, number> = { doen: 0, richting: 1, capaciteit: 2 };

/** Alle live services (CMS met lib-fallback), gesorteerd op familie dan volgorde. */
export async function getServices(): Promise<Service[]> {
  const rows = await getPublishedContent("services");
  const services = rows.length ? rows.map(mapRow) : SERVICES;
  return [...services].sort(
    (a, b) => FAMILIE_ORDER[a.familie] - FAMILIE_ORDER[b.familie] || a.volgorde - b.volgorde,
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices();
  return services.find((s) => s.slug === slug) ?? null;
}

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
