import Link from "next/link";
import { TagSticker } from "./tag-sticker";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post, index = 0 }: { post: PostMeta; index?: number }) {
  const date = new Date(post.date);
  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group py-8 border-b border-ink-muted/15 last:border-b-0">
      <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted mb-3 flex flex-wrap gap-x-3 gap-y-1">
        <span>[ {formatted} ]</span>
        <span>[ {post.readingTime} MIN READ ]</span>
      </div>
      <h2 className="font-heading text-[1.375rem] md:text-3xl leading-[1.15] mb-3 [text-wrap:balance]">
        <Link
          href={`/posts/${post.slug}`}
          className="text-ink hover:text-spray transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      {post.description && (
        <p className="text-ink-muted font-body text-base md:text-lg leading-relaxed mb-4 max-w-[62ch]">
          {post.description}
        </p>
      )}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((t, i) => (
            <TagSticker key={t} tag={t} index={index + i} size="sm" />
          ))}
        </div>
      )}
    </article>
  );
}
