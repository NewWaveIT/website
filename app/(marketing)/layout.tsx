import { Header } from "@/components/layout/header";
import { Consent } from "@/components/consent/consent";
import { FooterMetContact, MobileShellMetContact } from "@/components/layout/schil-cms";

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
      <Consent />
    </>
  );
}
