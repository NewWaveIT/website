import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /medewerkerspakket is intern gereedschap: geen geheim, maar het hoort niet
      // tussen de zoekresultaten van klanten. De pagina zet zelf ook noindex.
      disallow: ["/admin", "/api", "/medewerkerspakket"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
