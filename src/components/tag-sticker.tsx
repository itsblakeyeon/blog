import Link from "next/link";

type Props = {
  tag: string;
  count?: number;
  index?: number;
  size?: "sm" | "md" | "lg";
};

export function TagSticker({ tag, count, index = 0, size = "md" }: Props) {
  const rotate = ((index % 5) - 2) * 1.2;
  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-0.5 text-[11px]"
      : size === "lg"
        ? "px-4 py-2 text-sm md:text-base"
        : "px-3 py-1 text-xs";
  const shadowOffset = size === "lg" ? "3px 3px 0 var(--ink)" : "2px 2px 0 var(--ink)";

  return (
    <Link
      href={`/tags/${encodeURIComponent(tag)}`}
      className={`tag-sticker inline-flex items-center gap-1.5 font-mono uppercase tracking-wider ${sizeClasses} border border-ink bg-wall-deep text-ink no-underline transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:rotate-0`}
      style={{
        transform: `rotate(${rotate}deg)`,
        boxShadow: shadowOffset,
      }}
    >
      <span className="text-spray">#</span>
      <span>{tag}</span>
      {count != null && <span className="text-ink-muted">({count})</span>}
    </Link>
  );
}
