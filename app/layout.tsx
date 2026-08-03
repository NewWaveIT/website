import type { Metadata } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thenewwaveit.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The New Wave IT · Business-specialist in Mendix, AI en strategie",
    template: "%s · The New Wave IT",
  },
  description:
    "The New Wave IT combineert diepgaande sectorkennis met Mendix, AI en strategie. Enterprise-kwaliteit, menselijk geleverd.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "The New Wave IT",
    url: SITE_URL,
    images: [
      {
        url: "/assets/photos/team-presentatie-breed.webp",
        width: 1200,
        height: 630,
        alt: "The New Wave IT — business-specialist in Mendix, AI en strategie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The New Wave IT · Business-specialist in Mendix, AI en strategie",
    description:
      "Diepgaande sectorkennis gecombineerd met Mendix, AI en strategie. Enterprise-kwaliteit, menselijk geleverd.",
    images: ["/assets/photos/team-presentatie-breed.webp"],
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
