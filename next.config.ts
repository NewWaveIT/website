import type { NextConfig } from "next";

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
};

export default nextConfig;
