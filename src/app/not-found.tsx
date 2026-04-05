import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-5 md:px-8 pt-16 pb-16 flex flex-col justify-center">
        <div
          className="font-display text-[clamp(4rem,15vw,9rem)] text-spray leading-none"
          style={{ transform: "rotate(-3deg)" }}
        >
          404
        </div>
        <p className="mt-6 font-body text-xl text-ink max-w-[50ch]">
          This wall is blank. Nothing tagged here.
        </p>
        <Link
          href="/"
          className="mt-8 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted hover:text-spray"
        >
          [ ← Back home ]
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
