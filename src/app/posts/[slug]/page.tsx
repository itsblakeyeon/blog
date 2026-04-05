import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { renderMDX } from "@/lib/mdx";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SprayDivider } from "@/components/spray-divider";
import { TagSticker } from "@/components/tag-sticker";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };

  const og = `/api/og?title=${encodeURIComponent(post.title)}&tag=${encodeURIComponent(post.tags[0] ?? "")}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [og],
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const mdx = await renderMDX(post.content);
  const formatted = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-16">
        <Link
          href="/"
          className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted hover:text-spray transition-colors"
        >
          ← Back
        </Link>

        <header className="mt-8 mb-10 relative">
          <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted mb-5 flex flex-wrap gap-x-3 gap-y-1">
            <span>[ {formatted} ]</span>
            <span>[ {post.readingTime} MIN READ ]</span>
          </div>
          <h1
            className="font-heading font-bold text-[clamp(2rem,6.5vw,4rem)] leading-[1.25] tracking-tight [text-wrap:balance]"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="spray-mark">{post.title}</span>
          </h1>
          {post.description && (
            <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-ink-muted max-w-[62ch]">
              {post.description}
            </p>
          )}
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t, i) => (
                <TagSticker key={t} tag={t} index={i} size="sm" />
              ))}
            </div>
          )}
        </header>

        <SprayDivider className="mb-8" />

        <article className="prose-post font-body text-[1.0625rem] md:text-[1.125rem] leading-[1.75] text-ink">
          {mdx}
        </article>

        <SprayDivider className="mt-16 mb-8" />

        <footer className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.15em] text-ink-muted">
          <Link href="/" className="hover:text-spray">
            ← All posts
          </Link>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://blog.itsblakeyeon.xyz/posts/${post.slug}`)}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-spray"
          >
            Share →
          </a>
        </footer>
      </main>
      <SiteFooter />
    </>
  );
}
