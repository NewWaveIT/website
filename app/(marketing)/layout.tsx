import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileShell } from "@/components/layout/mobile-shell";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <MobileShell />
      <main>{children}</main>
      <Footer />
    </>
  );
}
