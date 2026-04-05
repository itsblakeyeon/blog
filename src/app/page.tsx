import { getAllPostMeta } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SprayBackdrop } from "@/components/spray-backdrop";
import { SprayDivider } from "@/components/spray-divider";

export default function HomePage() {
  const posts = getAllPostMeta();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-5xl w-full mx-auto px-5 md:px-8">
        <section className="pt-16 md:pt-24 pb-12 relative">
          <div className="relative inline-block">
            <SprayBackdrop />
            <h1
              className="font-display text-[clamp(3.2rem,11vw,6.5rem)] leading-[0.95] text-wall inline-block px-3 py-1 relative"
              style={{ transform: "rotate(-2deg)" }}
            >
              BLAKE
            </h1>
          </div>
          <p className="mt-10 max-w-[58ch] font-body text-xl md:text-2xl leading-snug text-ink">
            Notes on work, product, business, brand, and AI. Written from the sidewalk, not the boardroom.
          </p>
          <div className="mt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
            [ {posts.length} POST{posts.length === 1 ? "" : "S"} ] [ blog.itsblakeyeon.xyz ]
          </div>
        </section>

        <SprayDivider className="mb-8" />

        <section className="pb-16">
          <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-ink-muted mb-2">
            All Posts
          </h2>
          {posts.length === 0 ? (
            <p className="py-12 font-body text-ink-muted italic">
              No posts yet. The wall is blank.
            </p>
          ) : (
            <div>
              {posts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
