"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Layers,
  ListChecks,
  Building2,
  Newspaper,
  Package,
  Quote,
  UserRound,
  Inbox,
  UserCheck,
  Shield,
  History,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { ADMIN_NAV, type AdminNavIcon } from "@/lib/admin-nav";
import { logout } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

/** Compleet per constructie: `Record<AdminNavIcon, …>` maakt een ontbrekend
 *  icoon een typefout in plaats van een lege plek in de zijbalk. */
const ICONS: Record<AdminNavIcon, React.ComponentType> = {
  "layout-dashboard": LayoutDashboard,
  "file-text": FileText,
  layers: Layers,
  "list-checks": ListChecks,
  "building-2": Building2,
  package: Package,
  quote: Quote,
  newspaper: Newspaper,
  "user-round": UserRound,
  briefcase: Briefcase,
  inbox: Inbox,
  "user-check": UserCheck,
  shield: Shield,
  history: History,
};

export function Sidebar({
  counts,
  naam,
  rol,
}: {
  counts: Record<string, number>;
  naam: string;
  rol: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [vorigPad, setVorigPad] = useState(pathname);
  const sluitRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Sluit bij navigatie. State tijdens render aanpassen (in plaats van in een
  // effect) scheelt een extra rendercyclus na elke klik in het menu.
  if (pathname !== vorigPad) {
    setVorigPad(pathname);
    setOpen(false);
  }

  // Escape sluit, en de pagina eronder scrollt niet mee. Zelfde afspraak als
  // het mobiele menu op de publieke site.
  useEffect(() => {
    document.body.classList.toggle("cms-menu-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Focus mee naar binnen; anders staat hij nog achter de overlay.
    sluitRef.current?.focus();
    return () => {
      document.body.classList.remove("cms-menu-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // En terug naar de openknop zodra het menu dichtgaat.
  const eersteRender = useRef(true);
  useEffect(() => {
    if (eersteRender.current) {
      eersteRender.current = false;
      return;
    }
    if (!open) burgerRef.current?.focus();
  }, [open]);

  const initials = naam
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      {/* Alleen zichtbaar onder 900px; daarboven verbergt admin.css hem. */}
      <header className="cms-top">
        <Image
          src="/assets/logos/logo-horizontal-white.png"
          alt="The New Wave IT"
          width={140}
          height={24}
          className="cms-top-logo"
        />
        <span className="env">CMS</span>
        <button
          ref={burgerRef}
          type="button"
          className="burger"
          aria-label="Menu"
          aria-expanded={open}
          aria-controls="cms-nav"
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
      </header>

      <div
        className={cn("side-overlay", open && "open")}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside className={cn("side", open && "open")} id="cms-nav">
        <div className="logo">
          <Image
            src="/assets/logos/logo-horizontal-white.png"
            alt="The New Wave IT"
            width={150}
            height={26}
            className="side-logo"
          />
          <span className="env">CMS</span>
          <button
            ref={sluitRef}
            type="button"
            className="side-sluit"
            aria-label="Menu sluiten"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Beheer">
          {ADMIN_NAV.map((group) => (
            <div key={group.groep}>
              <div className="grp">{group.groep}</div>
              {group.items.map((item) => {
                const Icon = ICONS[item.icon];
                const active =
                  item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
                const cnt = item.countKey ? counts[item.countKey] : undefined;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn("nav-item", active && "active")}
                    aria-current={active ? "page" : undefined}
                  >
                    {Icon && <Icon />}
                    {item.label}
                    {cnt !== undefined && cnt > 0 && <span className="cnt">{cnt}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="foot">
          <div className="av">{initials}</div>
          <div>
            <div className="nm">{naam}</div>
            <div className="rl">{rol}</div>
          </div>
          <form action={logout}>
            <button type="submit" className="logout" aria-label="Uitloggen" title="Uitloggen">
              <LogOut />
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
