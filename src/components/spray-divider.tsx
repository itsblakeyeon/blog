export function SprayDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 24"
      className={`w-full h-6 text-ink-muted/40 ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="spray-rough" x="-10%" y="-50%" width="120%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
      </defs>
      <path
        d="M 10 12 Q 200 4 400 12 T 790 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        filter="url(#spray-rough)"
      />
    </svg>
  );
}
