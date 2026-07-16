import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thenewwaveit.com";

const SECTOREN = [
  "publieke-sector",
  "mobiliteit",
  "banken",
  "zorg",
  "manufacturing",
];
const DIENSTEN = ["mendix", "ai", "strategie"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPaths = [
    "",
    "/sectoren",
    "/diensten",
    "/klantverhalen",
    "/inzichten",
    "/over-ons",
    "/werken-bij",
    "/contact",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  for (const slug of SECTOREN) {
    entries.push({
      url: `${SITE_URL}/sectoren/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const slug of DIENSTEN) {
    entries.push({
      url: `${SITE_URL}/diensten/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
