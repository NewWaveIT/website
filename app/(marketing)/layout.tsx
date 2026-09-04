import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileShell } from "@/components/layout/mobile-shell";
import { Consent } from "@/components/consent/consent";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Direct naar inhoud
      </a>
      <Header />
      <MobileShell />
      <main id="main">{children}</main>
      <Footer />
      <Consent />
    </>
  );
}
