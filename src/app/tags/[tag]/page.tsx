import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/post-card";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SprayDivider } from "@/components/spray-divider";

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  return { title: `#${decodeURIComponent(tag)}` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: raw } = await params;
  const tag = decodeURIComponent(raw);
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-5xl w-full mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-16">
        <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted mb-3">
          [ TAG ]
        </div>
        <h1
          className="font-display text-[clamp(2.5rem,9vw,5.5rem)] text-ink mb-6"
          style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}
        >
          #{tag.toUpperCase()}
        </h1>
        <p className="font-body text-ink-muted">
          {posts.length} post{posts.length === 1 ? "" : "s"}
        </p>
        <SprayDivider className="mt-8 mb-4" />
        <div>
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
