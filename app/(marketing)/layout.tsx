import { Header } from "@/components/layout/header";
import {
  ConsentMetCms,
  FooterMetContact,
  MobileShellMetContact,
} from "@/components/layout/schil-cms";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Direct naar inhoud
      </a>
      <Header />
      <MobileShellMetContact />
      <main id="main">{children}</main>
      <FooterMetContact />
      <ConsentMetCms />
    </>
  );
}
