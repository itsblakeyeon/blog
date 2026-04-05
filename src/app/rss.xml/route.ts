import { Feed } from "feed";
import { getAllPostMeta } from "@/lib/posts";

const SITE_URL = "https://blog.itsblakeyeon.xyz";

export function GET() {
  const posts = getAllPostMeta();

  const feed = new Feed({
    title: "blake",
    description: "Streetwise thinking about products.",
    id: SITE_URL,
    link: SITE_URL,
    language: "en",
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Blake`,
    feedLinks: {
      rss2: `${SITE_URL}/rss.xml`,
    },
    author: { name: "Blake", link: SITE_URL },
  });

  for (const post of posts) {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/posts/${post.slug}`,
      link: `${SITE_URL}/posts/${post.slug}`,
      description: post.description,
      date: new Date(post.date),
      category: post.tags.map((name) => ({ name })),
    });
  }

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
