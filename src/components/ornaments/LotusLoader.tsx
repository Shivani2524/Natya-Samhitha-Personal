"use client";

import { motion } from "framer-motion";

interface LotusLoaderProps {
  size?: number;
  className?: string;
  text?: string;
}

/**
 * 8-petal lotus spinner with staggered petal reveal.
 * Used as the loading indicator throughout the app.
 */
export function LotusLoader({
  size = 48,
  className = "",
  text,
}: LotusLoaderProps) {
  const petals = Array.from({ length: 8 });
  const petalAngle = 360 / 8;

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div
        className="relative animate-lotus"
        style={{ width: size, height: size }}
        role="status"
        aria-label="Loading"
      >
        {petals.map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex justify-center"
            style={{
              transform: `rotate(${i * petalAngle}deg)`,
              transformOrigin: "center center",
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          >
            {/* Petal shape */}
            <svg
              width={size * 0.3}
              height={size * 0.45}
              viewBox="0 0 12 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 0C6 0 12 6 12 12C12 15.3137 9.31371 18 6 18C2.68629 18 0 15.3137 0 12C0 6 6 0 6 0Z"
                fill="var(--gold-royal)"
                opacity="0.8"
              />
              <path
                d="M6 3C6 3 9.5 7 9.5 11C9.5 13.7614 7.93299 16 6 16C4.06701 16 2.5 13.7614 2.5 11C2.5 7 6 3 6 3Z"
                fill="var(--gold-bright)"
                opacity="0.4"
              />
            </svg>
          </motion.div>
        ))}

        {/* Center circle */}
        <div
          className="absolute rounded-full bg-[var(--gold-bright)]"
          style={{
            width: size * 0.2,
            height: size * 0.2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 12px var(--glow-gold)",
          }}
        />
      </div>

      {text && (
        <motion.p
          className="text-sm font-body text-[var(--text-muted-gold)] tracking-wide"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
