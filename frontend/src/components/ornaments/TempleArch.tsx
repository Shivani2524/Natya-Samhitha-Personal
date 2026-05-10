"use client";

interface TempleArchProps {
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Decorative temple arch (torana) frame.
 * Used around the search bar and modal frames.
 */
export function TempleArch({
  className = "",
  width = 720,
  height = 100,
}: TempleArchProps) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Main arch */}
        <path
          d={`M 20 ${height} Q 20 20, ${width / 2} 10 Q ${width - 20} 20, ${width - 20} ${height}`}
          stroke="var(--gold-royal)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.25"
        />
        {/* Inner arch */}
        <path
          d={`M 40 ${height} Q 40 35, ${width / 2} 25 Q ${width - 40} 35, ${width - 40} ${height}`}
          stroke="var(--gold-royal)"
          strokeWidth="1"
          fill="none"
          opacity="0.15"
        />
        {/* Crown lotus */}
        <g transform={`translate(${width / 2 - 8}, 2)`}>
          <path
            d="M8 0C8 0 14 5 14 10C14 13.3 11.3 16 8 16C4.7 16 2 13.3 2 10C2 5 8 0 8 0Z"
            fill="var(--gold-royal)"
            opacity="0.3"
          />
        </g>
        {/* Left finial */}
        <circle cx="20" cy={height - 5} r="3" fill="var(--gold-royal)" opacity="0.2" />
        {/* Right finial */}
        <circle cx={width - 20} cy={height - 5} r="3" fill="var(--gold-royal)" opacity="0.2" />
      </svg>
    </div>
  );
}
