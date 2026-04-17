import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/app/config/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = SITE_CONFIG.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
