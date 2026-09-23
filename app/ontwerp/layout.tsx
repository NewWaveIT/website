import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sidebar } from "@/components/admin/sidebar";
import { VOORBEELD_TELLERS, voorbeeldToegestaan } from "@/lib/cms/voorbeeldrijen";
import "../admin/admin.css";

export const metadata: Metadata = {
  title: "Ontwerpweergave · CMS",
  robots: { index: false, follow: false },
};

/**
 * De admin-schil met verzonnen data, zonder database en zonder login.
 *
 * Hij staat bewust buiten /admin: `proxy.ts` stuurt alles onder dat pad naar de
 * loginpagina, en een uitzondering daarop is precies het soort gat dat je later
 * niet meer terugvindt. Wat hier rendert zijn dezelfde componenten als in de
 * echte admin, dus de WCAG-gate en een schermafdruk meten voortaan het echte
 * werk in plaats van een met de hand bijgehouden kopie.
 */
export const instant = false;

export default function OntwerpLayout({ children }: { children: React.ReactNode }) {
  if (!voorbeeldToegestaan()) notFound();
  return (
    <div className="cms">
      <div className="app">
        <Sidebar counts={VOORBEELD_TELLERS} naam="Voorbeeld Beheerder" rol="Ontwerpweergave" />
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
