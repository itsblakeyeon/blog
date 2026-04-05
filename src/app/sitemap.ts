import type { MetadataRoute } from "next";
import { getAllPostMeta, getAllTags } from "@/lib/posts";

const SITE_URL = "https://blog.itsblakeyeon.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta();
  const tags = getAllTags();

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/tags`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.4 },
    ...posts.map((p) => ({
      url: `${SITE_URL}/posts/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...tags.map(({ tag }) => ({
      url: `${SITE_URL}/tags/${encodeURIComponent(tag)}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
