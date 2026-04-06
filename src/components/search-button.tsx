"use client";

export function SearchButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new CustomEvent("open-search"))}
      className="text-ink-muted hover:text-ink transition-colors flex items-center gap-1"
      aria-label="Search posts"
    >
      <span className="hidden sm:inline">Search</span>
      <kbd className="hidden sm:inline-flex text-[9px] border border-ink-muted/30 px-1 py-0.5 ml-0.5">
        ⌘K
      </kbd>
      <span className="sm:hidden">⌕</span>
    </button>
  );
}
