import type { MetadataRoute } from "next";
import { mockFigures } from "@/lib/mock-data";
import { getAllBlogPosts } from "@/lib/blog";

const BASE_URL = "https://intelligence-red.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/directory`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/scorecard`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/topics`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/about/methodology`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contribute`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const figurePages: MetadataRoute.Sitemap = mockFigures.flatMap((figure) => {
    const base = `${BASE_URL}/figure/${figure.slug}`;
    return [
      { url: base, changeFrequency: "daily" as const, priority: 0.8 },
      { url: `${base}/statements`, changeFrequency: "daily" as const, priority: 0.7 },
      { url: `${base}/actions`, changeFrequency: "daily" as const, priority: 0.7 },
      { url: `${base}/timeline`, changeFrequency: "weekly" as const, priority: 0.6 },
    ];
  });

  const blogPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...getAllBlogPosts().map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...staticPages, ...figurePages, ...blogPages];
}
