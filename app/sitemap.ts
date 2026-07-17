import type { MetadataRoute } from "next";
import { VACATURE_SLUGS } from "@/lib/vacatures";
import { KLANTVERHAAL_SLUGS } from "@/lib/klantverhalen";
import { ARTIKEL_SLUGS } from "@/lib/inzichten";

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

  for (const slug of VACATURE_SLUGS) {
    entries.push({
      url: `${SITE_URL}/vacatures/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  for (const slug of KLANTVERHAAL_SLUGS) {
    entries.push({
      url: `${SITE_URL}/klantverhalen/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const slug of ARTIKEL_SLUGS) {
    entries.push({
      url: `${SITE_URL}/inzichten/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
