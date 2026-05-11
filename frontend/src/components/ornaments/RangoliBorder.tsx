"use client";

interface RangoliBorderProps {
  className?: string;
}

/**
 * Ornamental corner flourishes for cards.
 * Renders SVG flourishes in all four corners.
 */
export function RangoliBorder({ className = "" }: RangoliBorderProps) {
  const cornerSvg = (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer curve */}
      <path
        d="M0 32C0 14.3269 14.3269 0 32 0"
        stroke="var(--gold-royal)"
        strokeWidth="1"
        opacity="0.4"
        fill="none"
      />
      {/* Inner curve */}
      <path
        d="M0 24C0 10.7452 10.7452 0 24 0"
        stroke="var(--gold-royal)"
        strokeWidth="0.8"
        opacity="0.3"
        fill="none"
      />
      {/* Dot */}
      <circle cx="4" cy="4" r="1.5" fill="var(--gold-royal)" opacity="0.5" />
      {/* Lotus petal accent */}
      <path
        d="M8 0C8 0 12 4 12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 4 8 0 8 0Z"
        fill="var(--gold-royal)"
        opacity="0.15"
      />
    </svg>
  );

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      {/* Top-left */}
      <div className="absolute top-0 left-0">{cornerSvg}</div>
      {/* Top-right */}
      <div className="absolute top-0 right-0" style={{ transform: "scaleX(-1)" }}>
        {cornerSvg}
      </div>
      {/* Bottom-left */}
      <div className="absolute bottom-0 left-0" style={{ transform: "scaleY(-1)" }}>
        {cornerSvg}
      </div>
      {/* Bottom-right */}
      <div
        className="absolute bottom-0 right-0"
        style={{ transform: "scale(-1, -1)" }}
      >
        {cornerSvg}
      </div>
    </div>
  );
}
