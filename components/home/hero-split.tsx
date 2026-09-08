"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { buildHeroSvg } from "@/lib/sector-hero-svg";
import "./hero-split.css";

/* Hero split-animatie — geport uit ui_kits/website/Hero Split Animatie.dc.html
   + Hero Schermformaten.dc.html. Geanimeerde sectorvignet (dezelfde
   illustratielaag als sector-/dienstpagina's, zie lib/sector-hero-svg.ts) met
   een zwevend "systeem"-venster (Mendix-microflow + compacte AI-regel)
   rechtsonder, dat door vijf sectoren cyclet met een oranje golfsweep. De
   structuur wordt per scene als HTML geïnjecteerd (trouw aan het
   inline-design); de React-laag beheert de scene-index, de sweep en de
   fit-to-scale. */

interface Scene {
  key: string;
  theme: string;
  sector: string;
  real: string;
  crumb: string;
  flow: string;
  metric: string;
  val: string;
  act: string;
  decision: string;
  ja: string;
  nee: string;
  aiHook: string;
}

const SCENES: Scene[] = [
  {
    key: "zorg",
    theme: "zorg",
    sector: "Zorg",
    real: "De wijkverpleegkundige legt de meting vast bij de cliënt thuis",
    crumb: "ZorgApp  ›  Overdracht  ›  ACT_OverdrachtAfronden",
    flow: "ACT_OverdrachtAfronden",
    metric: "Overdrachten vandaag",
    val: "128",
    act: "Retrieve  Dossier",
    decision: "Medicatie afgetekend?",
    ja: "Commit  Overdracht",
    nee: "Show  Herstelactie",
    aiHook: "Commit Overdracht",
  },
  {
    key: "publiek",
    theme: "publiek",
    sector: "Publieke sector",
    real: "Aan de balie wordt de aanvraag samen doorgenomen",
    crumb: "Zaaksysteem  ›  Behandeling  ›  ACT_BesluitVastleggen",
    flow: "ACT_BesluitVastleggen",
    metric: "Doorlooptijd",
    val: "3,2 dg",
    act: "Retrieve  Zaak",
    decision: "Rechtmatig?",
    ja: "Change  Besluit",
    nee: "Create  Hersteltaak",
    aiHook: "Generate Besluitbrief",
  },
  {
    key: "mobiliteit",
    theme: "mobiliteit",
    sector: "Mobiliteit",
    real: "Op de terminal komen trein, truck en kraan samen",
    crumb: "FleetApp  ›  Werkorders  ›  ACT_OnderdeelBoeken",
    flow: "ACT_OnderdeelBoeken",
    metric: "Ritten gepland",
    val: "1.940",
    act: "Retrieve  Werkorder",
    decision: "Voertuig vrij?",
    ja: "Call  PlanRit",
    nee: "Create  Keuring",
    aiHook: "Call PlanRit",
  },
  {
    key: "manufacturing",
    theme: "manufacturing",
    sector: "Manufacturing",
    real: "Aan de lijn stuurt de operator de productie bij",
    crumb: "PlantApp  ›  Productie  ›  ACT_BatchVrijgeven",
    flow: "ACT_BatchVrijgeven",
    metric: "Orders vrijgegeven",
    val: "312",
    act: "Retrieve  Batch 21-C",
    decision: "Kwaliteit akkoord?",
    ja: "Commit  Voorraad",
    nee: "Create  Afkeur",
    aiHook: "Kwaliteitscheck",
  },
  {
    key: "banken",
    theme: "banken",
    sector: "Banken",
    real: "In de boardroom staan de cijfers op tafel",
    crumb: "KredietApp  ›  Aanvraag  ›  ACT_DossierFiatteren",
    flow: "ACT_DossierFiatteren",
    metric: "Aanvragen verwerkt",
    val: "87%",
    act: "Call  Risicotoets",
    decision: "Fiattering akkoord?",
    ja: "Send  Offerte",
    nee: "Send  Afwijzing",
    aiHook: "Call RisicotoetsAPI",
  },
];

const KICKER = ["Publieke sector", "Mobiliteit", "Banken", "Zorg", "Manufacturing"];
const CYCLE_MS = 9000;

/* ---- HTML-bouwstenen (trouw aan het design) ---- */

const arrow = (w = "28px", label = "") => `
  <div data-conn="1" style="position:relative;display:flex;align-items:center;width:${w};">
    <div data-connline="1" style="flex:1;height:1.5px;background:#6B5B42;"></div>
    <div data-arrow="1" style="width:0;height:0;border-top:5px solid transparent;border-bottom:5px solid transparent;border-left:7px solid #6B5B42;"></div>
    ${label ? `<span data-connlabel="1" style="position:absolute;bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:9px;font-family:'IBM Plex Mono',monospace;font-size:11px;color:#8B7B64;">${label}</span>` : ""}
  </div>`;

function nodesHtml(s: Scene): string {
  const pill = (label: string) => `
    <div style="box-sizing:border-box;display:flex;align-items:center;gap:10px;height:48px;padding:0 15px 0 11px;background:#302518;border:1px solid #4E3F2C;border-radius:5px;box-shadow:0 1px 0 rgba(0,0,0,.25),inset 0 1px 0 rgba(255,253,249,.04);">
      <div style="width:20px;height:20px;flex-shrink:0;border-radius:4px;background:#F15822;opacity:.9;"></div>
      <span style="font-size:15px;line-height:1.15;white-space:nowrap;color:#F4F1EA;">${label}</span>
    </div>`;
  const start = `<div style="width:30px;height:30px;border-radius:50%;background:#4C8C62;border:2px solid #6FB98A;"></div>`;
  const diamond = `<div data-diamond="1" style="width:42px;height:42px;background:#C89B34;border:1.5px solid #E0BC65;border-radius:3px;transform:rotate(45deg);"></div>`;
  const end = `<div style="width:30px;height:30px;box-sizing:border-box;border-radius:50%;background:#241C13;border:4px solid #4C8C62;"></div>`;

  const box = (inner: string, sub = "") => `
    <div data-nodebox="1" style="position:relative;display:flex;align-items:center;justify-content:center;height:70px;">
      ${inner}
      ${sub ? `<span data-sublabel="1" style="position:absolute;bottom:100%;left:50%;transform:translateX(-50%);margin-bottom:9px;font-size:13px;line-height:1.2;white-space:nowrap;color:#C9BCA8;">${sub}</span>` : ""}
    </div>`;

  const cell = (inner: string, delay: number) => `
    <div data-nodeitem="1" class="hs-anim-row" style="display:flex;align-items:center;animation-delay:${delay.toFixed(2)}s;">${inner}</div>`;

  let d = 0.35;
  const step = () => {
    const v = d;
    d += 0.16;
    return v;
  };

  return (
    cell(box(start) + arrow(), step()) +
    cell(box(pill(s.act)) + arrow(), step()) +
    cell(box(diamond, s.decision) + arrow("28px", "ja"), step()) +
    cell(box(pill(s.ja)) + arrow(), step()) +
    cell(box(end), step())
  );
}

function branchHtml(s: Scene): string {
  return `
  <div data-branch="1" class="hs-anim-row" style="position:relative;display:flex;align-items:center;margin-top:42px;animation-delay:1.05s;">
    <div data-drop="1" style="position:absolute;left:0;bottom:100%;width:1.5px;height:40px;background:#6B5B42;"></div>
    <div data-jog="1" style="position:absolute;left:0;bottom:100%;margin-bottom:40px;width:0px;height:1.5px;background:#6B5B42;"></div>
    <span data-blabel="1" style="position:absolute;left:10px;bottom:100%;margin-bottom:10px;font-family:'IBM Plex Mono',monospace;font-size:12px;color:#8B7B64;">nee</span>
    ${arrow("26px")}
    <div style="box-sizing:border-box;display:flex;align-items:center;gap:11px;height:48px;padding:0 15px 0 11px;background:#302518;border:1px solid #4E3F2C;border-radius:5px;box-shadow:0 1px 0 rgba(0,0,0,.25);">
      <div style="width:20px;height:20px;flex-shrink:0;border-radius:4px;background:#C4553A;opacity:.9;"></div>
      <span style="font-size:15px;line-height:1.15;white-space:nowrap;color:#F4F1EA;">${s.nee}</span>
    </div>
    ${arrow("26px")}
    <div style="width:30px;height:30px;box-sizing:border-box;border-radius:50%;border:4px solid #C4553A;background:#241C13;"></div>
  </div>`;
}

/* Compacte AI-regel: bliksem → AI Agent → hook, met status 'actief'. */
function aiLayerHtml(s: Scene): string {
  return `
  <div data-ailayer="1" style="flex-shrink:0;display:flex;align-items:center;gap:12px;background:#1F1810;border-top:1px solid #382C1F;padding:14px 22px;overflow:hidden;">
    <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#F15822;white-space:nowrap;">AI</span>
    <div class="hs-anim-row" style="display:flex;align-items:center;gap:9px;min-width:0;animation-delay:.3s;">
      <span style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;flex-shrink:0;background:#2B2116;border:1px solid #4E3F2C;border-radius:15px 6px 6px 15px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6FB98A" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"></path></svg>
      </span>
      <span style="width:14px;height:1.5px;background:#6B5B42;flex-shrink:0;"></span>
      <span style="display:flex;align-items:center;gap:8px;height:30px;padding:0 12px;flex-shrink:0;background:#2B2116;border:1px solid #7A4526;border-radius:6px;box-shadow:0 0 0 3px rgba(241,88,34,.08);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F15822" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3"></path><rect x="4" y="6" width="16" height="12" rx="3"></rect><path d="M9 11v2M15 11v2"></path></svg>
        <span style="font-size:12px;font-weight:600;color:#F4F1EA;white-space:nowrap;">AI Agent</span>
      </span>
      <span style="width:14px;height:1.5px;background:#6B5B42;flex-shrink:0;"></span>
      <span style="font-size:12px;color:#AC9D85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.aiHook}</span>
    </div>
    <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#4E9E6E;white-space:nowrap;">actief</span>
  </div>`;
}

function rightHtml(s: Scene): string {
  return `
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;">
    <div style="display:flex;align-items:center;gap:14px;padding:0 22px;height:40px;background:#1C160F;border-bottom:1px solid #382C1F;flex-shrink:0;">
      <div style="display:flex;gap:6px;">
        <div style="width:7px;height:7px;background:#463A2A;border-radius:2px;"></div>
        <div style="width:7px;height:7px;background:#463A2A;border-radius:2px;"></div>
        <div style="width:7px;height:7px;background:#F15822;border-radius:2px;"></div>
      </div>
      <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:.08em;color:#9A8B73;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${s.crumb}</div>
      <div style="margin-left:auto;display:flex;align-items:center;gap:7px;">
        <div style="width:6px;height:6px;background:#F15822;border-radius:50%;"></div>
        <span style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#9A8B73;white-space:nowrap;">Run locally</span>
      </div>
    </div>
    <div data-canvas="1" style="position:relative;flex:1;background:#241C13;background-image:radial-gradient(#372B1D 1px,transparent 1px);background-size:18px 18px;overflow:hidden;">
      <div data-flowbadge="1" style="position:absolute;left:22px;top:16px;display:flex;align-items:center;gap:8px;padding:6px 12px;background:#2B2116;border:1px solid #3E3122;border-radius:4px;z-index:2;"><span style="width:7px;height:7px;border-radius:2px;background:#F15822;"></span><span style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.1em;color:#AC9D85;white-space:nowrap;">${s.flow}</span></div>
      <div data-flow="1" style="position:absolute;left:24px;top:50%;transform-origin:left center;transform:translateY(-50%) scale(.62);display:flex;flex-direction:column;align-items:flex-start;width:max-content;">
        <div data-mainrow="1" style="display:flex;align-items:center;">${nodesHtml(s)}</div>
        ${branchHtml(s)}
      </div>
    </div>
    ${aiLayerHtml(s)}
    <div style="flex-shrink:0;background:#1C160F;border-top:1px solid #382C1F;padding:13px 22px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
      <span style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#9A8B73;">${s.metric}</span>
      <span style="font-size:22px;font-weight:bold;color:#FFFDF9;letter-spacing:-.5px;">${s.val}</span>
    </div>
    <div style="flex-shrink:0;height:3px;background:#382C1F;overflow:hidden;">
      <div style="height:3px;background:#F15822;animation:hsBar 1.9s cubic-bezier(.16,.8,.24,1) both;animation-delay:.5s;width:72%;"></div>
    </div>
  </div>`;
}

const PHONE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F15822" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

function leftHtml(s: Scene): string {
  const kicker = KICKER.map((name, n) => {
    const active = name === s.sector;
    const sep = n < KICKER.length - 1 ? '<span style="color:#7A5A44;">·</span>' : "";
    return `<span style="display:flex;align-items:baseline;gap:9px;"><span style="color:${active ? "#FFFDF9" : "#B4633C"};transition:color .5s ease;">${name}</span>${sep}</span>`;
  }).join("");

  return `
  <div class="hs-theme-anim" aria-hidden="true" style="position:absolute;inset:0;">${buildHeroSvg(s.theme)}</div>
  <div style="position:absolute;inset:0;background:linear-gradient(100deg,rgba(46,37,26,.92) 0%,rgba(46,37,26,.80) 34%,rgba(46,37,26,.48) 68%,rgba(46,37,26,.28) 100%);"></div>
  <div style="position:absolute;inset:0;background:linear-gradient(0deg,rgba(36,28,19,.72) 0%,rgba(36,28,19,0) 42%);"></div>
  <div class="hs-copy" data-copy="1" style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:26px 56px 26px 48px;box-sizing:border-box;">
    <div style="display:flex;flex-wrap:wrap;align-items:baseline;gap:0 9px;font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;margin-bottom:clamp(14px,2.6vh,26px);">
      <span style="color:#F15822;">Business-specialist in</span>${kicker}
    </div>
    <h1 style="font-family:var(--font-display-expanded),'Archivo',Arial,sans-serif;font-weight:900;font-size:clamp(28px,3vw,48px);line-height:1.06;letter-spacing:-1px;color:#FFFDF9;margin:0 0 clamp(14px,2.4vh,24px);text-wrap:balance;">Wij maken van business en IT <span style="color:#F15822;border-bottom:3px solid #F15822;">één beweging</span>.</h1>
    <p style="font-size:clamp(15px,1.15vw,17px);line-height:1.6;color:#C9BCA8;margin:0 0 clamp(20px,3.4vh,34px);max-width:46ch;text-wrap:pretty;">The New Wave IT combineert diepgaande sectorkennis met Mendix, AI en strategie. Zo vertalen we jouw ambitie naar oplossingen die werken voor de mensen die ermee moeten werken.</p>
    <div style="display:flex;flex-wrap:wrap;gap:18px 26px;align-items:center;">
      <a href="/contact" style="background:#F15822;color:#FFFFFF;text-decoration:none;font-size:15px;font-weight:600;padding:15px 28px;white-space:nowrap;">Plan een gesprek &nbsp;&rarr;</a>
      <a href="tel:+31610751254" style="display:flex;align-items:center;gap:14px;color:#FFFDF9;text-decoration:none;font-size:15px;font-weight:600;white-space:nowrap;">
        <span style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;border:1px solid #6B5B47;flex-shrink:0;">${PHONE_SVG}</span>
        Bel 06&ndash;10751254
      </a>
    </div>
  </div>
  <div class="hs-realrow hs-anim-row" data-caption="1" style="position:absolute;left:48px;bottom:34px;right:56px;display:flex;align-items:baseline;gap:14px;animation-duration:.8s;">
    <span style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#F15822;white-space:nowrap;">${s.sector}</span>
    <span style="font-size:15px;color:#AC9D85;">${s.real}</span>
  </div>`;
}

function contentHtml(s: Scene): string {
  return `
  <div class="hs-left" data-left="1" style="position:absolute;left:0;top:0;width:62%;height:100%;overflow:hidden;background:#2E251A;">${leftHtml(s)}</div>
  <div class="hs-right" data-right="1" style="position:absolute;right:0;top:0;width:38%;height:100%;background:#241C13;overflow:hidden;">${rightHtml(s)}</div>`;
}

export function HeroSplit() {
  const [i, setI] = useState(0);
  const [sweep, setSweep] = useState(0);
  const [pauze, setPauze] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const fitFlow = useCallback(() => {
    const root = contentRef.current;
    if (!root) return;
    const c = root.querySelector<HTMLElement>('[data-flow="1"]');
    const canvasEl = c?.parentElement;
    if (!c || !canvasEl) return;

    // Reserveer de zone van het "ACT_..."-badge linksboven (gemeten, niet
    // geraden) zodat de microflow daaronder centreert en er nooit overheen
    // schuift — op geen enkele venstergrootte.
    const badge = canvasEl.querySelector<HTMLElement>('[data-flowbadge="1"]');
    const bottomSafe = 14;
    const sideMargin = 22;
    const baseGap = 14; // volstaat als het label horizontaal geen badge raakt
    const overlapGap = 26; // extra ademruimte als een label wél in de x-range van het badge valt

    const place = (topSafe: number) => {
      const avail = canvasEl.clientWidth - sideMargin * 2;
      const availH = Math.max(40, canvasEl.clientHeight - topSafe - bottomSafe);
      const w = c.scrollWidth || 1;
      const h = c.scrollHeight || 1;
      const scale = Math.max(0.42, Math.min(0.98, avail / w, availH / h));
      c.style.top = `${topSafe + availH / 2}px`;
      c.style.transform = `translateY(-50%) scale(${scale})`;
      return scale;
    };

    const canvasRect = canvasEl.getBoundingClientRect();
    let topSafe = badge ? badge.getBoundingClientRect().bottom - canvasRect.top + baseGap : 48;
    let sc = place(topSafe);

    // Tweede pas: bij een brede badge-tekst (langere sectornaam) kán een label
    // dat boven zijn node uitsteekt er (horizontaal) mee overlappen. Meet elk
    // label na positioneren; overlapt het de x-range van het badge, dan is
    // een ruimere marge nodig om overtuigend gescheiden te ogen. Werkt voor
    // élke combinatie van badge- en labeltekstlengte.
    if (badge) {
      const bRect = badge.getBoundingClientRect();
      const labels = c.querySelectorAll<HTMLElement>("[data-sublabel], [data-connlabel]");
      let deficit = 0;
      labels.forEach((l) => {
        const r = l.getBoundingClientRect();
        const overlapsX = r.right > bRect.left && r.left < bRect.right;
        const requiredTop = bRect.bottom + (overlapsX ? overlapGap : baseGap);
        if (r.top < requiredTop) deficit = Math.max(deficit, requiredTop - r.top);
      });
      if (deficit > 0) {
        topSafe += deficit;
        sc = place(topSafe);
      }
    }

    const d = c.querySelector<HTMLElement>("[data-diamond]");
    const rows = c.querySelectorAll<HTMLElement>("[data-branch]");
    if (!d || !rows.length) return;
    const dr = d.getBoundingClientRect();
    const x = (dr.left + dr.width / 2 - c.getBoundingClientRect().left) / sc - 0.75;
    rows.forEach((r) => {
      r.style.marginLeft = `${Math.round(x)}px`;
    });
  }, []);

  // Scene-cyclus. Respecteert prefers-reduced-motion (dan geen cyclus) en is
  // pauzeerbaar — WCAG 2.2.2 vraagt een mechanisme voor bewegende content die
  // langer dan vijf seconden doorloopt, en hover telt niet voor toetsenbord.
  useEffect(() => {
    if (pauze) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    const id = window.setInterval(() => {
      setSweep((s) => s + 1);
      timers.push(window.setTimeout(() => setI((v) => (v + 1) % SCENES.length), 480));
    }, CYCLE_MS);
    return () => {
      clearInterval(id);
      timers.forEach(clearTimeout);
    };
  }, [pauze]);

  // Schaal de microflow zodat 'ie past, na elke scene-wissel en bij resize.
  // Een ResizeObserver op het (zwevende) systeempaneel houdt de flow passend als
  // dat paneel op tablet/telefoon van formaat verandert.
  useEffect(() => {
    const raf = requestAnimationFrame(fitFlow);
    const fallback = window.setTimeout(fitFlow, 80);
    // Herbereken zodra webfonts geladen zijn: een late fontwissel kan de
    // tekstbreedte net genoeg laten verschuiven om de nee-branch onder de
    // beslissingsruit te laten verspringen.
    document.fonts?.ready?.then(fitFlow).catch(() => {});
    const root = contentRef.current;
    let ro: ResizeObserver | undefined;
    if (root && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => fitFlow());
      const right = root.querySelector("[data-right]");
      const flowParent = root.querySelector<HTMLElement>('[data-flow="1"]')?.parentElement;
      if (right) ro.observe(right);
      if (flowParent) ro.observe(flowParent);
    }
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
      ro?.disconnect();
    };
  }, [i, fitFlow]);
  useEffect(() => {
    window.addEventListener("resize", fitFlow);
    return () => window.removeEventListener("resize", fitFlow);
  }, [fitFlow]);

  const s = SCENES[i]!;

  return (
    <section
      className="hs"
      style={{
        background: "#2E251A",
        fontFamily: "var(--font-sans), 'IBM Plex Sans', Arial, sans-serif",
      }}
    >
      <div
        className="hs-split"
        data-hero="1"
        style={{ position: "relative", background: "#2E251A", overflow: "hidden" }}
      >
        <div key={i} ref={contentRef} dangerouslySetInnerHTML={{ __html: contentHtml(s) }} />

        {/* Oranje golfsweep over de foto bij elke scene-wissel */}
        <div
          key={`sw${sweep}`}
          className="hs-sweep"
          style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
        >
          <div
            style={{
              position: "absolute",
              top: "-8%",
              left: 0,
              width: "9%",
              height: "116%",
              background:
                "linear-gradient(90deg,rgba(241,88,34,0) 0%,rgba(241,88,34,.28) 45%,rgba(241,88,34,.6) 100%)",
              animation: "hsSweep 1.6s cubic-bezier(.45,0,.35,1) both",
            }}
          />
        </div>

        {/* Voortgangsstreepjes per sector, met pauzeknop (WCAG 2.2.2) */}
        <div
          className="hs-ticks"
          data-ticks="1"
          style={{
            position: "absolute",
            left: 48,
            top: 34,
            display: "flex",
            alignItems: "center",
            gap: 7,
            zIndex: 3,
          }}
        >
          {SCENES.map((sc, n) => (
            <div
              key={sc.key}
              style={{
                width: 26,
                height: 3,
                background: n === i ? "#F15822" : "rgba(255,253,249,.25)",
              }}
            />
          ))}
          <button
            type="button"
            className="hs-pauze"
            onClick={() => setPauze((p) => !p)}
            aria-pressed={pauze}
            aria-label={
              pauze ? "Sectoren automatisch laten wisselen" : "Wisselen van sector pauzeren"
            }
          >
            {pauze ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
  );
}
