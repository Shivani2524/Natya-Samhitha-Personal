"use client";

import { motion } from "framer-motion";

interface GhungrooSeparatorProps {
  className?: string;
  animate?: boolean;
}

/**
 * Ghungroo (ankle bell) chain horizontal divider.
 * A series of connected circular bells in a delicate chain pattern.
 */
export function GhungrooSeparator({
  className = "",
  animate = true,
}: GhungrooSeparatorProps) {
  const bells = Array.from({ length: 9 });

  return (
    <div
      className={`flex items-center justify-center gap-0 py-2 ${className}`}
      aria-hidden="true"
    >
      {/* Left chain line */}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--gold-royal)] to-[var(--gold-royal)] opacity-30" />

      {/* Bell chain */}
      <div className="flex items-center gap-1 px-2">
        {bells.map((_, i) => (
          <motion.div
            key={i}
            className="relative"
            initial={false}
            animate={
              animate
                ? {
                    rotate: [0, i % 2 === 0 ? 3 : -3, 0],
                  }
                : undefined
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.12,
              ease: "easeInOut",
            }}
          >
            {/* Bell body */}
            <svg
              width="10"
              height="12"
              viewBox="0 0 10 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Bell dome */}
              <ellipse
                cx="5"
                cy="5"
                rx="4.5"
                ry="4.5"
                fill="var(--gold-royal)"
                opacity="0.5"
              />
              {/* Bell highlight */}
              <ellipse
                cx="4"
                cy="3.5"
                rx="1.5"
                ry="1.2"
                fill="var(--gold-bright)"
                opacity="0.4"
              />
              {/* Clapper dot */}
              <circle cx="5" cy="10" r="1.2" fill="var(--gold-royal)" opacity="0.7" />
              {/* String */}
              <line
                x1="5"
                y1="9"
                x2="5"
                y2="10"
                stroke="var(--gold-royal)"
                strokeWidth="0.5"
                opacity="0.6"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Right chain line */}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[var(--gold-royal)] to-[var(--gold-royal)] opacity-30" />
    </div>
  );
}
