"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="font-mono text-xs uppercase tracking-[0.15em] text-ink-muted hover:text-spray transition-colors px-2 py-1 border border-transparent hover:border-ink"
    >
      [{theme === "light" ? "NIGHT" : "DAY"}]
    </button>
  );
}
