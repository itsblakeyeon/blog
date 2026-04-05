export function SprayBackdrop({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 100"
      className={`absolute inset-0 -z-10 w-full h-full text-spray ${className}`}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="spray-bg" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="8" />
          <feGaussianBlur stdDeviation="0.4" />
        </filter>
      </defs>
      <g opacity="0.65">
        <rect
          x="8"
          y="35"
          width="384"
          height="38"
          fill="currentColor"
          filter="url(#spray-bg)"
        />
        <rect
          x="20"
          y="28"
          width="360"
          height="12"
          fill="currentColor"
          filter="url(#spray-bg)"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}
