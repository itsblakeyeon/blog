"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

type SearchablePost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
};

export function SearchDialog({ posts }: { posts: SearchablePost[] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: "title", weight: 0.5 },
          { name: "description", weight: 0.3 },
          { name: "tags", weight: 0.2 },
        ],
        threshold: 0.35,
        includeMatches: true,
      }),
    [posts],
  );

  const results = query.trim()
    ? fuse.search(query, { limit: 8 }).map((r) => r.item)
    : posts.slice(0, 5);

  const openDialog = useCallback(() => {
    setOpen(true);
    setQuery("");
    setSelected(0);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  // Cmd-K / Ctrl-K global shortcut + custom event from header button
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openDialog();
      }
    };
    const handleCustom = () => openDialog();

    window.addEventListener("keydown", handleKey);
    window.addEventListener("open-search", handleCustom);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("open-search", handleCustom);
    };
  }, [openDialog]);

  // Focus input when dialog opens
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Reset selection when results change
  useEffect(() => {
    setSelected(0);
  }, [query]);

  const navigate = useCallback(
    (slug: string) => {
      closeDialog();
      router.push(`/posts/${slug}`);
    },
    [closeDialog, router],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      closeDialog();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      navigate(results[selected].slug);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={closeDialog}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        className="relative w-full max-w-lg mx-4 bg-wall border border-ink/20 shadow-[4px_4px_0_var(--ink)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center border-b border-ink/15 px-4">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-spray mr-3 shrink-0">
            [SEARCH]
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="posts, tags, keywords..."
            className="flex-1 bg-transparent py-4 font-mono text-sm text-ink placeholder:text-ink-muted/50 outline-none"
          />
          <kbd className="hidden sm:inline-flex font-mono text-[10px] uppercase tracking-wider text-ink-muted border border-ink-muted/30 px-1.5 py-0.5 ml-2 shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-4 py-8 text-center font-mono text-xs uppercase tracking-[0.15em] text-ink-muted">
              No posts found.
            </div>
          ) : (
            <ul>
              {results.map((post, i) => {
                const date = new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
                return (
                  <li key={post.slug}>
                    <button
                      onClick={() => navigate(post.slug)}
                      onMouseEnter={() => setSelected(i)}
                      className={`w-full text-left px-4 py-3 transition-colors ${
                        i === selected
                          ? "bg-spray/10"
                          : "hover:bg-ink/5"
                      }`}
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted mb-1 flex gap-2">
                        <span>[ {date} ]</span>
                        <span>[ {post.readingTime} MIN ]</span>
                      </div>
                      <div className="font-heading text-sm leading-snug text-ink">
                        {post.title}
                      </div>
                      {post.tags.length > 0 && (
                        <div className="flex gap-1.5 mt-1.5">
                          {post.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[10px] uppercase tracking-wider text-spray"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-ink/15 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-ink-muted flex gap-4">
          <span>
            <kbd className="border border-ink-muted/30 px-1 py-0.5 mr-1">↑↓</kbd>
            navigate
          </span>
          <span>
            <kbd className="border border-ink-muted/30 px-1 py-0.5 mr-1">↵</kbd>
            open
          </span>
        </div>
      </div>
    </div>
  );
}
