"use client";

/**
 * Slowly rotating SVG mandala background.
 * Pure CSS animation, no JS overhead.
 */
export function MandalaBackground() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="animate-mandala" style={{ opacity: 0.06 }}>
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px]"
        >
          {/* Outer ring */}
          <circle cx="400" cy="400" r="380" stroke="var(--gold-royal)" strokeWidth="1" opacity="0.6" />
          <circle cx="400" cy="400" r="360" stroke="var(--gold-royal)" strokeWidth="0.5" opacity="0.4" />

          {/* Middle ring with petals */}
          <circle cx="400" cy="400" r="280" stroke="var(--gold-royal)" strokeWidth="0.8" opacity="0.5" />

          {/* 16 radial petals */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (360 / 16) * i;
            return (
              <g key={i} transform={`rotate(${angle} 400 400)`}>
                {/* Petal */}
                <ellipse
                  cx="400"
                  cy="180"
                  rx="20"
                  ry="60"
                  fill="var(--gold-royal)"
                  opacity="0.15"
                />
                {/* Radial line */}
                <line
                  x1="400"
                  y1="120"
                  x2="400"
                  y2="280"
                  stroke="var(--gold-royal)"
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </g>
            );
          })}

          {/* Inner ring with 8 petals */}
          <circle cx="400" cy="400" r="180" stroke="var(--gold-royal)" strokeWidth="0.6" opacity="0.4" />

          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (360 / 8) * i + 22.5;
            return (
              <g key={`inner-${i}`} transform={`rotate(${angle} 400 400)`}>
                <ellipse
                  cx="400"
                  cy="280"
                  rx="15"
                  ry="40"
                  fill="var(--gold-royal)"
                  opacity="0.1"
                />
              </g>
            );
          })}

          {/* Inner circles */}
          <circle cx="400" cy="400" r="100" stroke="var(--gold-royal)" strokeWidth="0.5" opacity="0.35" />
          <circle cx="400" cy="400" r="60" stroke="var(--gold-royal)" strokeWidth="0.5" opacity="0.25" />

          {/* Center lotus */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (360 / 8) * i;
            return (
              <g key={`center-${i}`} transform={`rotate(${angle} 400 400)`}>
                <ellipse
                  cx="400"
                  cy="370"
                  rx="8"
                  ry="20"
                  fill="var(--gold-royal)"
                  opacity="0.2"
                />
              </g>
            );
          })}

          {/* Center dot */}
          <circle cx="400" cy="400" r="8" fill="var(--gold-royal)" opacity="0.3" />
        </svg>
      </div>
    </div>
  );
}
