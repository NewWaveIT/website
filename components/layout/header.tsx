"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV_LINKS, FOOTER_SECTOREN, NAV_DIENSTEN } from "@/lib/nav";
import type { NavLink } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Links met een dropdown-menu in de hoofdnavigatie. */
const NAV_DROPDOWNS: Record<string, NavLink[]> = {
  "/sectoren": FOOTER_SECTOREN,
  "/diensten": NAV_DIENSTEN,
};

/**
 * Desktop-navigatie (≥1041px). Op ≤1040px neemt MobileShell de navigatie over,
 * dus deze balk heeft geen eigen mobiel/burger-menu meer.
 */
export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  /**
   * Op de homepage loopt de hero-foto onder de navigatie door (hero 3a). De
   * balk is daar dus doorzichtig met witte tekst, en wordt pas ondoorzichtig
   * zodra je de hero voorbij bent — anders staat er donkere tekst op niets.
   * Alleen ≥1041px; daaronder verbergt globals.css deze balk en neemt
   * MobileShell het over.
   */
  const opHero = pathname === "/";
  const [voorbijHero, setVoorbijHero] = useState(false);

  useEffect(() => {
    if (!opHero) return;
    const hero = document.querySelector<HTMLElement>(".hsec");
    if (!hero) return;
    const meet = () => setVoorbijHero(window.scrollY > hero.offsetHeight - 76);
    meet();
    window.addEventListener("scroll", meet, { passive: true });
    window.addEventListener("resize", meet);
    return () => {
      window.removeEventListener("scroll", meet);
      window.removeEventListener("resize", meet);
    };
  }, [opHero]);

  const doorzichtig = opHero && !voorbijHero;

  return (
    <header className={cn("nav", opHero && "nav-op-hero", doorzichtig && "nav-doorzichtig")}>
      <div className="wrap-wide nav-inner">
        <Link href="/" aria-label="The New Wave IT — home">
          <Image
            src={
              doorzichtig
                ? "/assets/logos/logo-horizontal-white.png"
                : "/assets/logos/logo-horizontal-espresso.png"
            }
            alt="The New Wave IT"
            width={190}
            height={30}
            className="nav-logo"
            priority
          />
        </Link>

        <nav className="nav-links">
          {NAV_LINKS.map((link) => {
            const sub = NAV_DROPDOWNS[link.href];
            const actief = isActive(link.href);
            // Bewust geen role="menu"/"menuitem": dat patroon belooft
            // applicatiegedrag (pijltjesnavigatie, Escape) dat een hover-lijst
            // met links niet heeft. Een genest <nav> met links beschrijft het
            // eerlijker en werkt met de gewone linknavigatie van screenreaders.
            return sub ? (
              <div className="nav-drop" key={link.href}>
                <Link
                  href={link.href}
                  className={cn(actief && "active")}
                  aria-current={actief ? "page" : undefined}
                >
                  {link.label}
                </Link>
                {/* prefetch uit: het uitklapmenu is `visibility: hidden`, niet
                    `display: none`, dus Next ziet deze acht links op élke pagina
                    in beeld staan en haalt hun RSC-payload op nog voor iemand het
                    menu opent. De twee hublinks erboven prefetchen wel. */}
                <nav className="nav-menu" aria-label={`${link.label} — onderdelen`}>
                  {sub.map((s) => (
                    <Link key={s.href} href={s.href} prefetch={false}>
                      {s.label}
                    </Link>
                  ))}
                </nav>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(actief && "active")}
                aria-current={actief ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-cta">
          <Link href="/werken-bij" className="nav-secondary">
            Werken bij
          </Link>
          <Link href="/contact" className="btn btn-primary btn-sm">
            Plan een gesprek
          </Link>
        </div>
      </div>
    </header>
  );
}
