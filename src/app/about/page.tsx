import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SprayDivider } from "@/components/spray-divider";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-5 md:px-8 pt-12 md:pt-16 pb-16">
        <h1
          className="font-display text-[clamp(2.5rem,9vw,5.5rem)] inline-block leading-[1.1] mb-10"
          style={{ transform: "rotate(-2deg)" }}
        >
          <span className="spray-mark">ABOUT</span>
        </h1>

        <SprayDivider className="mb-10" />

        <div className="font-body text-[1.0625rem] md:text-[1.125rem] leading-[1.75] text-ink space-y-6 max-w-[62ch]">
          <p>
            I&apos;m <strong>Blake</strong>. I write about work, product, business, brand, and AI.
          </p>
          <p>
            Most product writing is either too corporate (case studies that say nothing) or too
            abstract (founder platitudes). I want to write the third thing: notes from someone
            actually making stuff, with enough taste to tell the difference between what matters
            and what&apos;s noise.
          </p>
          <p>
            The aesthetic is on purpose. Graffiti means marks on a wall. So does writing. The
            point is to leave something real behind.
          </p>
          <h2 className="font-heading text-2xl mt-10 mb-3">Elsewhere</h2>
          <ul className="list-none space-y-2 font-mono text-sm uppercase tracking-[0.1em]">
            <li>
              <a href="https://itsblakeyeon.xyz" className="text-ink hover:text-spray underline decoration-spray decoration-2 underline-offset-[3px]">
                itsblakeyeon.xyz →
              </a>
            </li>
            <li>
              <a href="https://github.com/itsblakeyeon" target="_blank" rel="noreferrer" className="text-ink hover:text-spray underline decoration-spray decoration-2 underline-offset-[3px]">
                github →
              </a>
            </li>
            <li>
              <a href="/rss.xml" className="text-ink hover:text-spray underline decoration-spray decoration-2 underline-offset-[3px]">
                rss feed →
              </a>
            </li>
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
