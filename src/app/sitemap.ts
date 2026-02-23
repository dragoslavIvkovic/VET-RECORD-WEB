import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://www.vetrecord.app";

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/blog", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.7 },
    { path: "/privacy-policy", priority: 0.5 },
    { path: "/delete-data", priority: 0.5 },
  ];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority,
  }));

  try {
    const posts = await getBlogPosts();
    for (const post of posts) {
      entries.push({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      });
    }
  } catch {
    // Blog not configured, skip
  }

  return entries;
}
