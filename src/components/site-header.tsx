import Link from "next/link";
import { SearchButton } from "./search-button";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-[2px] bg-wall/80 border-b border-ink/10">
      <div className="max-w-5xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-3">
        <Link
          href="/"
          className="font-display text-base sm:text-lg md:text-xl tracking-tight text-ink hover:text-spray transition-colors shrink-0"
          style={{ transform: "rotate(-1deg)" }}
        >
          BLAKE
        </Link>
        <nav className="flex items-center gap-2.5 sm:gap-4 md:gap-5 font-heading text-[10px] sm:text-[11px] md:text-xs uppercase tracking-[0.1em] md:tracking-[0.15em] font-medium">
          <Link href="/" className="text-ink-muted hover:text-ink transition-colors">Posts</Link>
          <Link href="/tags" className="text-ink-muted hover:text-ink transition-colors">Tags</Link>
          <Link href="/about" className="text-ink-muted hover:text-ink transition-colors">About</Link>
          <SearchButton />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
