import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { TagSticker } from "@/components/tag-sticker";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SprayDivider } from "@/components/spray-divider";

export const metadata = { title: "Tags" };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-5xl w-full mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-16">
        <h1
          className="font-display text-[clamp(2.5rem,8vw,5rem)] text-ink mb-6"
          style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}
        >
          TAGS
        </h1>
        <p className="font-body text-lg md:text-xl text-ink-muted max-w-[60ch] mb-8">
          Stickers on the wall. Peel one off.
        </p>
        <SprayDivider className="mb-10" />
        {tags.length === 0 ? (
          <p className="font-body text-ink-muted italic">No tags yet.</p>
        ) : (
          <div className="space-y-10">
            {/* Big tag wall */}
            <div className="flex flex-wrap gap-3 md:gap-4">
              {tags.map(({ tag, count }, i) => (
                <TagSticker key={tag} tag={tag} count={count} index={i} size="lg" />
              ))}
            </div>

            {/* Post list per tag */}
            <div className="space-y-8 pt-4">
              {tags.map(({ tag }) => {
                const posts = getPostsByTag(tag);
                return (
                  <section key={tag} className="border-t border-ink-muted/15 pt-6">
                    <div className="flex items-baseline gap-3 mb-4">
                      <h2 className="font-heading text-xl md:text-2xl text-ink">
                        <Link
                          href={`/tags/${encodeURIComponent(tag)}`}
                          className="hover:text-spray transition-colors"
                        >
                          #{tag}
                        </Link>
                      </h2>
                      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
                        {posts.length} post{posts.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {posts.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/posts/${p.slug}`}
                            className="font-body text-base md:text-lg text-ink hover:text-spray transition-colors"
                          >
                            {p.title}
                          </Link>
                          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted ml-3">
                            {new Date(p.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
