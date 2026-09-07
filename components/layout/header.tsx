"use client";

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

  return (
    <header className="nav">
      <div className="wrap-wide nav-inner">
        <Link href="/" aria-label="The New Wave IT — home">
          <Image
            src="/assets/logos/logo-horizontal-espresso.png"
            alt="The New Wave IT"
            width={190}
            height={30}
            style={{ height: 30, width: "auto" }}
            priority
          />
        </Link>

        <nav className="nav-links">
          {NAV_LINKS.map((link) => {
            const sub = NAV_DROPDOWNS[link.href];
            return sub ? (
              <div className="nav-drop" key={link.href}>
                <Link href={link.href} className={cn(isActive(link.href) && "active")}>
                  {link.label}
                </Link>
                <div className="nav-menu" role="menu" aria-label={link.label}>
                  {sub.map((s) => (
                    <Link key={s.href} href={s.href} role="menuitem">
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(isActive(link.href) && "active")}
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
