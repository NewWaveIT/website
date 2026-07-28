"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/nav";
import { cn } from "@/lib/utils";

const MENU_LINKS = [
  ...NAV_LINKS.filter((l) => l.href !== "/contact"),
  { label: "Werken bij", href: "/werken-bij" },
];

export function MobileShell() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const baseRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGPathElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Sluit menu bij navigatie
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Body-scroll blokkeren bij open menu + Esc sluit
  useEffect(() => {
    document.body.classList.toggle("m-menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("m-menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Scroll-voortgangsgolf + sticky CTA
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = 390, MID = 8, AMP = 4;
    const wavePath = (len: number, phase: number) => {
      if (len <= 0) return `M0,${MID}`;
      let d = "";
      for (let x = 0; x <= len; x += 5) {
        const y = MID + AMP * Math.sin(x * 0.04 - phase);
        d += (x === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
      }
      return d;
    };
    const sticky = document.querySelector<HTMLElement>(".stickycta");
    let ticking = false;
    const draw = () => {
      ticking = false;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const phase = reduced ? 0 : window.scrollY * 0.06;
      baseRef.current?.setAttribute("d", wavePath(W, phase));
      fillRef.current?.setAttribute("d", wavePath(W * p, phase));
      if (sticky) {
        const cta = document.querySelector<HTMLElement>(".cta");
        const past = window.scrollY > 420;
        const nearCta = cta ? cta.getBoundingClientRect().top < window.innerHeight : false;
        sticky.classList.toggle("show", past && !nearCta);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(draw);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    draw();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="mnav">
        <div className="mnav-inner">
          <Link href="/" className="logo-link" aria-label="The New Wave IT — home">
            <Image
              src="/assets/logos/logo-horizontal-espresso.png"
              alt="The New Wave IT"
              width={140}
              height={24}
              style={{ height: 24, width: "auto" }}
            />
          </Link>
          <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="m-menu" onClick={() => setOpen(true)}>
            <Menu />
          </button>
        </div>
      </header>

      <div className="scrollwave" aria-hidden="true">
        <svg viewBox="0 0 390 16" preserveAspectRatio="none">
          <path ref={baseRef} className="sw-base" d="" />
          <path ref={fillRef} className="sw-fill" d="" />
        </svg>
      </div>

      <div className={cn("m-menu", open && "open")} id="m-menu" aria-hidden={!open} inert={!open}>
        <div className="mtop">
          <Image
            src="/assets/logos/logo-horizontal-white.png"
            alt="The New Wave IT"
            width={140}
            height={24}
            style={{ height: 24, width: "auto" }}
          />
          <button className="close" aria-label="Sluit menu" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>
        <nav>
          {MENU_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(isActive(l.href) && "active")}
              style={{ animationDelay: `${0.05 + i * 0.05}s` }}
              onClick={() => setOpen(false)}
            >
              {l.label} <ArrowRight />
            </Link>
          ))}
        </nav>
        <div className="mfoot">
          <Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
            Plan een strategiegesprek <ArrowRight />
          </Link>
          <span className="sub">hello@thenewwaveit.com</span>
        </div>
      </div>

      <div className="stickycta">
        <Link href="/contact" className="btn btn-primary">
          Plan een strategiegesprek <ArrowRight />
        </Link>
      </div>
    </>
  );
}
