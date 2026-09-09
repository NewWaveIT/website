import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/dal";
import { getAdminCounts } from "@/lib/cms/content";
import { Sidebar } from "@/components/admin/sidebar";
import "./admin.css";

export const metadata: Metadata = {
  title: "CMS · The New Wave IT",
  robots: { index: false, follow: false },
};

/**
 * De admin is per definitie dynamisch: elke pagina leest de sessiecookie en
 * toont de actuele stand van de database. Er valt hier niets zinnigs te
 * prerenderen, dus we zetten de instant-validatie van Cache Components uit voor
 * de hele boom in plaats van elke pagina in een <Suspense> te hangen die
 * niemand ziet. Geldt alleen voor /admin; de publieke site is wél gecachet.
 */
export const instant = false;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  // Niet ingelogd → bare layout (loginpagina rendert zichzelf).
  if (!user) {
    return <div className="cms">{children}</div>;
  }

  const counts = await getAdminCounts();
  const naam = (user.user_metadata?.naam as string) || user.email?.split("@")[0] || "Beheerder";
  const rol = (user.user_metadata?.rol as string) || "Beheer";

  return (
    <div className="cms">
      <div className="app">
        <Sidebar counts={counts} naam={naam} rol={rol} />
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
