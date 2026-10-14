import type { MetadataRoute } from "next";
import { getAllPosts, postUrl } from "@/lib/posts";
import { absoluteUrl, categories } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.updated ?? posts[0]?.date;

  return [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "daily", priority: 1 },
    ...categories.map((c) => ({
      url: absoluteUrl(`/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(postUrl(p)),
      lastModified: p.updated ?? p.date,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [absoluteUrl(p.image)],
    })),
    ...["/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"].map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
