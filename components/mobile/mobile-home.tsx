"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Play, Phone, ArrowRight, Building2, Truck, Landmark, HeartPulse, Factory, Compass,
  Layers, BrainCircuit, Route, Target, Users, Workflow, ShieldCheck, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CLIENTS, AWARD } from "@/components/home/client-logos";

const SECTOREN = [
  { slug: "publieke-sector", Icon: Building2, naam: "Publieke sector", chal: "Sneller vergunnen, volledig aantoonbaar." },
  { slug: "mobiliteit", Icon: Truck, naam: "Mobiliteit & logistiek", chal: "Realtime grip op planning en assets." },
  { slug: "banken", Icon: Landmark, naam: "Banken & financials", chal: "Compliant én snel blijven." },
  { slug: "zorg", Icon: HeartPulse, naam: "Zorg", chal: "Meer tijd voor de patiënt." },
  { slug: "manufacturing", Icon: Factory, naam: "Manufacturing", chal: "Productie die meebeweegt met de vraag." },
];

const DIENSTEN = [
  { slug: "mendix", Icon: Layers, titel: "Mendix-applicaties", img: "/assets/photos/overleg-laptop.webp", alt: "Consultants werken aan een Mendix-applicatie", p: "Low-code applicaties op maat, 6–10× sneller dan traditionele bouw.", link: "Meer over Mendix" },
  { slug: "ai", Icon: BrainCircuit, titel: "AI die processen verbetert", img: "/assets/photos/team-overleg-scherm.webp", alt: "Team bespreekt AI-toepassing", p: "Verantwoorde AI binnen je bestaande landschap. Geen hype, wél meetbaar resultaat.", link: "Meer over AI" },
  { slug: "strategie", Icon: Route, titel: "Business & IT-strategie", img: "/assets/photos/klantgesprek-tafel.webp", alt: "Strategiesessie aan tafel", p: "Van ambitie naar roadmap én uitvoering, we blijven tot het werkt.", link: "Meer over Strategie" },
];

const WAAROM_ICONS = [Target, Users, Workflow, ShieldCheck];

const ROLES = [
  { slug: "lead-mendix-consultant", Icon: Layers, naam: "Lead Mendix Consultant" },
  { slug: "ai-engineer", Icon: BrainCircuit, naam: "AI Engineer" },
  { slug: "business-consultant", Icon: Route, naam: "Business Consultant" },
];

export function MobileHome({ home }: { home: Record<string, string> }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const [dot, setDot] = useState(0);
  const [openAcc, setOpenAcc] = useState(0);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];

    // Hero: word reveal + accent
    const h1 = root.querySelector<HTMLElement>(".m-hero h1");
    const accent = h1?.querySelector<HTMLElement>(".accent");
    if (h1 && !reduced) {
      let idx = 0;
      const split = (node: Node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === 3) {
            const frag = document.createDocumentFragment();
            (child.textContent ?? "").split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
              const s = document.createElement("span");
              s.className = "w"; s.textContent = part;
              s.style.animationDelay = `${120 + idx * 55}ms`; idx++;
              frag.appendChild(s);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === 1) split(child);
        });
      };
      split(h1);
      const to = window.setTimeout(() => accent?.classList.add("draw"), 120 + idx * 55 + 350);
      cleanups.push(() => window.clearTimeout(to));
    } else {
      accent?.classList.add("draw");
    }

    // Hero canvas
    const hero = root.querySelector<HTMLElement>(".m-hero");
    const cv = root.querySelector<HTMLCanvasElement>(".m-hero-wave");
    const ctx = cv?.getContext("2d");
    if (hero && cv && ctx && !reduced) {
      const orange = getComputedStyle(document.documentElement).getPropertyValue("--orange-400").trim() || "#ff7a29";
      let W = 0, H = 0, t = 0, raf = 0;
      const resize = () => { W = cv.width = hero.offsetWidth; H = cv.height = hero.offsetHeight; };
      resize();
      window.addEventListener("resize", resize);
      const draw = () => {
        t += 0.007;
        const s = Math.min(1, window.scrollY / 500);
        ctx.clearRect(0, 0, W, H);
        ctx.lineWidth = 1.5; ctx.strokeStyle = orange;
        for (let l = 0; l < 3; l++) {
          ctx.globalAlpha = 0.08 + l * 0.05;
          ctx.beginPath();
          const amp = (10 + l * 7) * (0.7 + s * 0.8);
          const yBase = H * (0.82 + l * 0.05);
          for (let x = 0; x <= W; x += 7) {
            const y = yBase + Math.sin(x * 0.008 + t * (1 + l * 0.35) + s * 2) * amp + Math.sin(x * 0.02 - t * 0.7 + l) * amp * 0.35;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(draw);
      };
      draw();
      cleanups.push(() => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); });
    }

    // Ken Burns parallax
    const kb = root.querySelector<HTMLElement>(".m-fcase .kbwrap");
    if (kb?.parentElement && !reduced) {
      const parent = kb.parentElement;
      let ticking = false;
      const update = () => {
        ticking = false;
        const r = parent.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const d = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        kb.style.transform = `translateY(${(-d * 30).toFixed(1)}px)`;
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
      window.addEventListener("scroll", onScroll, { passive: true });
      update();
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    // Reveal
    if (!reduced && "IntersectionObserver" in window) {
      const targets = root.querySelectorAll<HTMLElement>(".m-sector-card, .m-fcase, .m-wcard, .m-sec-head, .m-acc, .m-joinus .role");
      targets.forEach((el) => el.classList.add("m-reveal"));
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const sibs = Array.prototype.filter.call(el.parentNode?.children ?? [], (c: Element) => c.classList.contains("m-reveal"));
          el.style.transitionDelay = `${Math.min(sibs.indexOf(el), 5) * 70}ms`;
          el.classList.add("in");
          io.unobserve(el);
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });
      targets.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  // Carrousel-dots
  useEffect(() => {
    const car = carRef.current;
    if (!car) return;
    const onScroll = () => {
      const card = car.children[0] as HTMLElement | undefined;
      if (!card) return;
      const i = Math.round(car.scrollLeft / (card.offsetWidth + 14));
      setDot(Math.max(0, Math.min(SECTOREN.length, i)));
    };
    car.addEventListener("scroll", onScroll, { passive: true });
    return () => car.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="m-home only-mobile" ref={rootRef}>
      <section className="m-hero">
        <canvas className="m-hero-wave" aria-hidden="true" />
        <div className="m-wrap">
          <span className="m-kicker on-dark">{home.heroKickerMobiel}</span>
          <h1>
            {home.heroTitleStart}
            <span className="accent">{home.heroAccent}</span>.
          </h1>
          <p className="lead">{home.heroLeadMobiel}</p>
          <div className="m-hero-actions">
            <Link href="/contact" className="m-btn primary">
              {home.heroCtaPrimair} <ArrowRight />
            </Link>
            <a href="tel:+31610751254" className="m-btn ghost-dark">
              <Phone /> Bel 06–10751254
            </a>
          </div>
          <div className="m-chiprow">
            <span className="lab">Kies jouw sector</span>
            <div className="m-chips">
              {SECTOREN.map(({ slug, Icon, naam }) => (
                <Link key={slug} href={`/sectoren/${slug}`} className="m-chip">
                  <Icon /> {naam}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="m-proof">
        <div className="m-wrap">
          <div className="m-logos">
            <div className="m-proof-head">
              <span className="cap">Vertrouwd door</span>
              <a className="m-award" href={AWARD.url} target="_blank" rel="noopener noreferrer">
                {AWARD.label}
              </a>
            </div>
            <div className="track">
              <div className="set">
                {CLIENTS.concat(CLIENTS).map((c, i) => (
                  <span key={i} aria-hidden={i >= CLIENTS.length}>{c.naam}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="m-block">
        <div className="m-wrap">
          <div className="m-sec-head">
            <div className="m-kicker">Onze sectoren</div>
            <h2>Eén partner die jouw taal spreekt.</h2>
          </div>
        </div>
        <div className="m-wrap">
          <div className="m-carousel" ref={carRef}>
            {SECTOREN.map(({ slug, Icon, naam, chal }) => (
              <Link key={slug} href={`/sectoren/${slug}`} className="m-sector-card">
                <div className="ic"><Icon /></div>
                <h3>{naam}</h3>
                <p className="chal">{chal}</p>
                <span className="go">Bekijk <ArrowRight /></span>
              </Link>
            ))}
            <Link href="/sectoren" className="m-sector-card more">
              <div className="ic"><Compass /></div>
              <h3>Niet jouw sector?</h3>
              <p className="chal">We denken graag mee.</p>
              <span className="go">Plan een verkenning <ArrowRight /></span>
            </Link>
          </div>
          <div className="m-dots">
            {Array.from({ length: SECTOREN.length + 1 }).map((_, i) => (
              <i key={i} className={cn(i === dot && "on")} />
            ))}
          </div>
        </div>
      </section>

      <section className="m-block m-featured">
        <div className="m-wrap">
          <div className="m-sec-head">
            <div className="m-kicker">Klantverhaal</div>
            <h2>Bewezen impact bij COA.</h2>
          </div>
          <div className="m-fcase">
            <div className="media">
              <div className="kbwrap"><div className="kb" /></div>
              <span className="tag">Publieke sector · COA</span>
              <button type="button" className="playbig" aria-label="Bekijk video"><Play /></button>
            </div>
            <div className="body">
              <blockquote>“We leveren nu in weken wat eerst maanden kostte.”</blockquote>
              <div className="metrics">
                <div className="m"><div className="n">-60%</div><div className="l">Doorlooptijd</div></div>
                <div className="m"><div className="n">8×</div><div className="l">Sneller live</div></div>
                <div className="m"><div className="n">100%</div><div className="l">Auditproof</div></div>
              </div>
              <div className="who">
                <div className="av">PD</div>
                <div><div className="nm">Peter van Dam</div><div className="rl">IT Manager, COA</div></div>
                <Link href="/klantverhalen/coa" className="m-btn outline" style={{ marginLeft: "auto", width: "auto", minHeight: 40, padding: "8px 14px", fontSize: "var(--text-xs)" }}>
                  Lees meer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="m-block">
        <div className="m-wrap">
          <div className="m-sec-head">
            <div className="m-kicker">Hoe wij het doen</div>
            <h2>Drie manieren waarop we versnellen</h2>
          </div>
          <div className="m-acc">
            {DIENSTEN.map((d, i) => (
              <div key={d.slug} className={cn("m-acc-item", openAcc === i && "open")}>
                <button className="m-acc-head" onClick={() => setOpenAcc(openAcc === i ? -1 : i)}>
                  <span className="ic"><d.Icon /></span>
                  {d.titel}
                  <span className="chev"><ChevronDown /></span>
                </button>
                <div className="m-acc-body">
                  <div>
                    <div className="pad">
                      <div className="media-img">
                        <Image src={d.img} alt={d.alt} fill sizes="100vw" />
                      </div>
                      <p>{d.p}</p>
                      <Link href={`/diensten/${d.slug}`} className="link">
                        {d.link} <ArrowRight style={{ width: 15, height: 15 }} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-block m-waarom">
        <div className="m-wrap">
          <div className="m-sec-head">
            <div className="m-kicker on-dark">{home.waaromKicker}</div>
            <h2 style={{ color: "#fff" }}>{home.waaromTitel}</h2>
          </div>
          <div className="wlist">
            {WAAROM_ICONS.map((Icon, i) => (
              <div className="m-wcard" key={i}>
                <div className="ic"><Icon /></div>
                <h4>{home[`waarom${i + 1}Titel`]}</h4>
                <p>{home[`waarom${i + 1}Tekst`]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-block m-mensen">
        <div className="m-wrap">
          <div className="media-img">
            <Image src="/assets/photos/overleg-lachend.webp" alt="Consultants in overleg" fill sizes="100vw" />
          </div>
          <div className="m-kicker">{home.mensenKicker}</div>
          <h2 style={{ fontSize: "var(--text-xl)", margin: "12px 0 14px" }}>{home.mensenTitel}</h2>
          <p>{home.mensenP1}</p>
          <Link href="/over-ons" className="m-btn outline">Ontmoet ons team</Link>
        </div>
      </section>

      <section className="m-block m-joinus">
        <div className="m-wrap">
          <div className="m-kicker on-dark">{home.joinusKicker}</div>
          <h2>{home.joinusTitel}</h2>
          <div className="roles">
            {ROLES.map(({ slug, Icon, naam }) => (
              <Link key={slug} href={`/vacatures/${slug}`} className="role">
                <Icon /> {naam} <span className="n">→</span>
              </Link>
            ))}
          </div>
          <div className="actions">
            <Link href="/werken-bij" className="m-btn primary">Bekijk alle vacatures <ArrowRight /></Link>
            <Link href="/werken-bij#cultuur" className="m-btn ghost-dark">Lees over onze cultuur</Link>
          </div>
        </div>
      </section>

      <section className="m-cta">
        <div className="m-wrap">
          <h2>{home.ctaTitel}</h2>
          <Link href="/contact" className="m-btn">{home.ctaKnop} <ArrowRight /></Link>
        </div>
      </section>
    </div>
  );
}
