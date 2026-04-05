import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-[2px] bg-wall/70 border-b border-ink/10">
      <div className="max-w-5xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl tracking-tight text-ink hover:text-spray transition-colors"
          style={{ transform: "rotate(-1deg)" }}
        >
          BLAKE
        </Link>
        <nav className="flex items-center gap-5 font-mono text-xs uppercase tracking-[0.15em]">
          <Link href="/" className="text-ink-muted hover:text-ink">Posts</Link>
          <Link href="/tags" className="text-ink-muted hover:text-ink">Tags</Link>
          <Link href="/about" className="text-ink-muted hover:text-ink">About</Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
