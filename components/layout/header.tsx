"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, FOOTER_SECTOREN } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

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
          {NAV_LINKS.map((link) =>
            link.href === "/sectoren" ? (
              <div className="nav-drop" key={link.href}>
                <Link href={link.href} className={cn(isActive(link.href) && "active")}>
                  {link.label}
                </Link>
                <div className="nav-menu" role="menu" aria-label="Sectoren">
                  {FOOTER_SECTOREN.map((s) => (
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
            ),
          )}
        </nav>

        <div className="nav-cta">
          <Link href="/werken-bij" className="nav-secondary">
            Werken bij
          </Link>
          <Link href="/contact" className="btn btn-primary btn-sm">
            Plan een strategiegesprek
          </Link>
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <nav className={cn("nav-mobile", open && "open")}>
        {NAV_LINKS.map((link) =>
          link.href === "/sectoren" ? (
            <div className="nav-mobile-group" key={link.href}>
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
              <div className="nav-mobile-sub">
                {FOOTER_SECTOREN.filter((s) => s.href !== "/sectoren").map((s) => (
                  <Link key={s.href} href={s.href} onClick={() => setOpen(false)}>
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ),
        )}
        <Link href="/werken-bij" onClick={() => setOpen(false)}>
          Werken bij
        </Link>
        <Link
          href="/contact"
          className="btn btn-primary"
          onClick={() => setOpen(false)}
        >
          Plan een strategiegesprek
        </Link>
      </nav>
    </header>
  );
}
