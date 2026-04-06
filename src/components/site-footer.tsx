import Link from "next/link";
import { SprayDivider } from "./spray-divider";

export function SiteFooter() {
  return (
    <footer className="mt-24 pb-12">
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        <SprayDivider className="mb-8" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
          <div className="flex flex-col gap-1">
            <span className="text-ink">[ BLAKE ]</span>
            <span>streetwise thinking about products</span>
          </div>
          <div className="flex gap-5">
            <Link href="/rss.xml" className="hover:text-spray">RSS</Link>
            <a href="https://github.com/itsblakeyeon" target="_blank" rel="noreferrer" className="hover:text-spray">GitHub</a>
            <a href="https://x.com/itsblakeyeon" target="_blank" rel="noreferrer" className="hover:text-spray">X</a>
            <a href="https://www.linkedin.com/in/itsblakeyeon" target="_blank" rel="noreferrer" className="hover:text-spray">LinkedIn</a>
          </div>
          <div>© {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
}
