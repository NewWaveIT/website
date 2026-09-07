import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Inline `style`-attributen en één inline GA-initscript (components/consent/consent.tsx)
// vereisen 'unsafe-inline' voor style-src/script-src — een nonce-opzet zou honderden
// bestaande inline styles moeten aanraken. In dev staan 'unsafe-eval' en de HMR-websocket
// erbij, anders breekt `next dev` (React Refresh/webpack).
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
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
