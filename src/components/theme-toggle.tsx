"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Render a placeholder with same width until mounted to avoid layout shift
  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className="uppercase text-ink-muted invisible"
      >
        [NIGHT]
      </span>
    );
  }

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="uppercase text-ink-muted hover:text-spray transition-colors"
    >
      [{isDark ? "DAY" : "NIGHT"}]
    </button>
  );
}
