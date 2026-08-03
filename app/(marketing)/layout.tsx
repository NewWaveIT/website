import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ScrollWave } from "@/components/layout/scroll-wave";
import { Consent } from "@/components/consent/consent";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main" className="skip-link">Direct naar inhoud</a>
      <Header />
      <ScrollWave />
      <MobileShell />
      <main id="main">{children}</main>
      <Footer />
      <Consent />
    </>
  );
}
