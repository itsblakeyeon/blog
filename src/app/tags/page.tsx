import { getAllTags } from "@/lib/posts";
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
        <p className="font-body text-lg text-ink-muted max-w-[60ch] mb-8">
          Stickers on the wall. Peel one off.
        </p>
        <SprayDivider className="mb-10" />
        {tags.length === 0 ? (
          <p className="font-body text-ink-muted italic">No tags yet.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {tags.map(({ tag, count }, i) => (
              <TagSticker key={tag} tag={tag} count={count} index={i} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
