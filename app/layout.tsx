import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Display: Archivo (variabel). Archivo Black dekt ook de "expanded" headline-rol
// af (substitutie voor Archivo Expanded, conform de design-notities).
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The New Wave IT · Business-specialist in Mendix, AI en strategie",
    template: "%s · The New Wave IT",
  },
  description:
    "The New Wave IT combineert diepgaande sectorkennis met Mendix, AI en strategie. Enterprise-kwaliteit, menselijk geleverd.",
  // Geen `url` hier: die zou elke pagina erven en dus altijd de homepage
  // aanwijzen. De canonical per pagina dekt dit al.
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "The New Wave IT",
    images: [
      {
        // JPG i.p.v. de WebP-bron: LinkedIn en WhatsApp tonen WebP niet betrouwbaar.
        url: "/assets/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "The New Wave IT, business-specialist in Mendix, AI en strategie",
      },
    ],
  },
  // Alleen `card` en `images`: titel en omschrijving leidt Next per pagina af uit
  // de eigen metadata. Hardcoden zou elke pagina dezelfde card geven.
  twitter: {
    card: "summary_large_image",
    images: ["/assets/og/og-default.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl" className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
