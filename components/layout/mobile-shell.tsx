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
  const [prevPathname, setPrevPathname] = useState(pathname);
  const sluitRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Sluit menu bij navigatie. State aanpassen tijdens render (i.p.v. in een
  // effect) voorkomt een extra render-cyclus na elke navigatie.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  /**
   * Zelfde overlay als op desktop (zie Header): op de homepage loopt de
   * hero-foto onder de balk door, dus die is daar doorzichtig met een wit logo
   * tot je de hero voorbij bent. Menu open ⇒ altijd ondoorzichtig, anders
   * staat het logo op het geopende paneel.
   */
  const opHero = pathname === "/";
  const [voorbijHero, setVoorbijHero] = useState(false);

  useEffect(() => {
    if (!opHero) return;
    const hero = document.querySelector<HTMLElement>(".hsec");
    if (!hero) return;
    const meet = () => setVoorbijHero(window.scrollY > hero.offsetHeight - 60);
    meet();
    window.addEventListener("scroll", meet, { passive: true });
    window.addEventListener("resize", meet);
    return () => {
      window.removeEventListener("scroll", meet);
      window.removeEventListener("resize", meet);
    };
  }, [opHero]);

  const doorzichtig = opHero && !voorbijHero && !open;

  // Body-scroll blokkeren bij open menu + Esc sluit
  useEffect(() => {
    document.body.classList.toggle("m-menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Focus meenemen naar het paneel; anders staat de focus nog achter de
    // overlay en tabt de bezoeker door onzichtbare pagina-inhoud.
    sluitRef.current?.focus();
    return () => {
      document.body.classList.remove("m-menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Focus terug naar de openknop zodra het menu dichtgaat.
  const eersteRender = useRef(true);
  useEffect(() => {
    if (eersteRender.current) {
      eersteRender.current = false;
      return;
    }
    if (!open) burgerRef.current?.focus();
  }, [open]);

  // Sticky CTA: toont de knop na 420px scroll, verbergt 'm zodra de echte
  // CTA in beeld komt.
  useEffect(() => {
    const sticky = document.querySelector<HTMLElement>(".stickycta");
    if (!sticky) return;
    let ticking = false;
    const draw = () => {
      ticking = false;
      const cta = document.querySelector<HTMLElement>(".cta");
      const past = window.scrollY > 420;
      const nearCta = cta ? cta.getBoundingClientRect().top < window.innerHeight : false;
      sticky.classList.toggle("show", past && !nearCta);
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
      <header className={cn("mnav", opHero && "mnav-op-hero", doorzichtig && "mnav-doorzichtig")}>
        <div className="mnav-inner">
          <Link href="/" className="logo-link" aria-label="The New Wave IT — home">
            <Image
              src={
                doorzichtig
                  ? "/assets/logos/logo-horizontal-white.png"
                  : "/assets/logos/logo-horizontal-espresso.png"
              }
              alt="The New Wave IT"
              width={140}
              height={24}
              style={{ height: 24, width: "auto" }}
            />
          </Link>
          <button
            ref={burgerRef}
            className="burger"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="m-menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>

      <div className={cn("m-menu", open && "open")} id="m-menu" aria-hidden={!open} inert={!open}>
        <div className="mtop">
          <Image
            src="/assets/logos/logo-horizontal-white.png"
            alt="The New Wave IT"
            width={140}
            height={24}
            style={{ height: 24, width: "auto" }}
          />
          <button
            ref={sluitRef}
            className="close"
            aria-label="Sluit menu"
            onClick={() => setOpen(false)}
          >
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
            Plan een gesprek <ArrowRight />
          </Link>
          <span className="sub">hello@thenewwaveit.com</span>
        </div>
      </div>

      <div className="stickycta">
        <Link href="/contact" className="btn btn-primary">
          Plan een gesprek <ArrowRight />
        </Link>
      </div>
    </>
  );
}
