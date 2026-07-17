"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Newspaper,
  Users,
  Inbox,
  UserCheck,
  LogOut,
} from "lucide-react";
import { ADMIN_NAV } from "@/lib/admin-nav";
import { logout } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType> = {
  "layout-dashboard": LayoutDashboard,
  "file-text": FileText,
  briefcase: Briefcase,
  newspaper: Newspaper,
  users: Users,
  inbox: Inbox,
  "user-check": UserCheck,
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
  const initials = naam
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside className="side">
      <div className="logo">
        <Image
          src="/assets/logos/logo-horizontal-white.png"
          alt="The New Wave IT"
          width={150}
          height={26}
          style={{ height: 26, width: "auto" }}
        />
        <span className="env">CMS</span>
      </div>
      <nav>
        {ADMIN_NAV.map((group) => (
          <div key={group.groep}>
            <div className="grp">{group.groep}</div>
            {group.items.map((item) => {
              const Icon = ICONS[item.icon];
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              const cnt = item.countKey ? counts[item.countKey] : undefined;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn("nav-item", active && "active")}
                >
                  <Icon />
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
  );
}
