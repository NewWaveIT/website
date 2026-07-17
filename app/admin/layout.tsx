import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/dal";
import { getAdminCounts } from "@/lib/cms/content";
import { Sidebar } from "@/components/admin/sidebar";
import "./admin.css";

export const metadata: Metadata = {
  title: "CMS · The New Wave IT",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Niet ingelogd → bare layout (loginpagina rendert zichzelf).
  if (!user) {
    return <div className="cms">{children}</div>;
  }

  const counts = await getAdminCounts();
  const naam =
    (user.user_metadata?.naam as string) ||
    user.email?.split("@")[0] ||
    "Beheerder";
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
