import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileShell } from "@/components/layout/mobile-shell";
import { ScrollWave } from "@/components/layout/scroll-wave";
import "./mobile-base.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ScrollWave />
      <MobileShell />
      <main>{children}</main>
      <Footer />
    </>
  );
}
