import type { MetadataRoute } from "next";
import { getArtikelen } from "@/lib/inzichten-data";
import { getKlantverhalen } from "@/lib/klantverhalen-data";
import { getVacatures } from "@/lib/vacatures-data";
import { getDienstSlugs } from "@/lib/diensten-detail-data";
import { getSectorSlugs } from "@/lib/sectoren-detail-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thenewwaveit.com";

// Periodiek verversen zodat nieuwe CMS-content vanzelf in de sitemap komt.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    "/privacy",
  ];

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const [sectoren, diensten, vacatures, cases, artikelen] = await Promise.all([
    getSectorSlugs(),
    getDienstSlugs(),
    getVacatures(),
    getKlantverhalen(),
    getArtikelen(),
  ]);

  const push = (
    base: string,
    slugs: string[],
    changeFrequency: "weekly" | "monthly",
    priority: number,
  ) => {
    for (const slug of slugs) {
      entries.push({ url: `${SITE_URL}${base}/${slug}`, lastModified: now, changeFrequency, priority });
    }
  };

  push("/sectoren", sectoren, "monthly", 0.7);
  push("/diensten", diensten, "monthly", 0.7);
  push("/vacatures", vacatures.map((v) => v.slug), "weekly", 0.6);
  push("/klantverhalen", cases.map((k) => k.slug), "monthly", 0.6);
  push("/inzichten", artikelen.map((a) => a.slug), "monthly", 0.6);

  return entries;
}
