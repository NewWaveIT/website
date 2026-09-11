import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// style-src is gesplitst. `style-src-attr 'unsafe-inline'` moet aan blijven: next/image
// zet op élke <img> een inline style (minimaal `color: transparent`, bij `fill` de hele
// positionering) en neemt daar geen nonce voor aan — zie
// node_modules/next/dist/shared/lib/get-img-props.js. `style-src-elem 'self'` kan wél
// dicht: de productie-HTML bevat geen enkel <style>-element, alleen <link rel=stylesheet>.
// Daarmee blijft een geïnjecteerd <style>-blok geweigerd, wat met één losse
// `style-src 'unsafe-inline'` niet zo was.
// script-src houdt 'unsafe-inline' voor het GA-initscript (components/consent/consent.tsx).
// In dev staan 'unsafe-eval' en de HMR-websocket erbij, anders breekt `next dev`
// (React Refresh/webpack).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src-elem 'self'",
  "style-src-attr 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  `connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com${isDev ? " ws://localhost:*" : ""}`,
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Cache Components: het cachingmodel dat Next 16 aanraadt. Elke pagina zegt
  // zelf wat gecachet mag worden ('use cache' + cacheLife) in plaats van via de
  // route-config `revalidate`, en wat per request moet gebeuren staat in een
  // <Suspense>. Levert ook Partial Prerendering: een statische shell die
  // meteen geserveerd wordt terwijl het dynamische deel binnenstroomt.
  cacheComponents: true,
  cacheLife: {
    // Eén profiel voor alle publieke pagina's, zodat er nergens losse getallen
    // rondslingeren. `revalidate` 300 komt overeen met de oude route-config;
    // `stale` houdt de browsercache kort, want een redacteur wil zijn wijziging
    // zien. `expire` een dag: valt de revalidatie uit, dan serveren we liever
    // content van gisteren dan een foutpagina.
    content: { stale: 60, revalidate: 300, expire: 86400 },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache geoptimaliseerde afbeeldingen 30 dagen (minder heroptimalisatie).
    minimumCacheTTL: 2592000,
    // Geüploade CMS-afbeeldingen komen uit Supabase Storage.
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
    ],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
