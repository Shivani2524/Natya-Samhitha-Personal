"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loadingTexts = [
  "Consulting the Shastra…",
  "Seeking the Sloka…",
  "Illuminating the Rasa…",
];

/**
 * Parchment-styled skeleton loader with gold shimmer
 * and cycling sacred loading text.
 */
export function ResultSkeleton() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 gap-6 w-full"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="relative w-24 h-24 flex items-center justify-center"
      >
        {/* Central Glow */}
        <div className="absolute inset-0 bg-[var(--gold-bright)]/10 blur-2xl rounded-full" />
        
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]">
          <defs>
            <radialGradient id="jasmine-center" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F4C146" />
              <stop offset="100%" stopColor="#8B6914" />
            </radialGradient>
          </defs>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <motion.path
              key={angle}
              d="M50 50 C65 35 75 45 50 15 C25 45 35 35 50 50"
              transform={`rotate(${angle} 50 50)`}
              fill="white"
              stroke="#FAF3E0"
              strokeWidth="0.5"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, delay: angle / 360 }}
            />
          ))}
          <circle cx="50" cy="50" r="6" fill="url(#jasmine-center)" />
        </svg>
      </motion.div>

      <div className="text-center space-y-2">
        <AnimatePresence mode="wait">
          <motion.p
            key={textIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-sm font-nav tracking-[0.2em] uppercase text-[var(--gold-bright)]"
          >
            {loadingTexts[textIndex]}
          </motion.p>
        </AnimatePresence>
        <p className="text-[0.6rem] font-body italic text-[var(--text-muted-gold)]/60">
          Scanning the sacred palm leaves…
        </p>
      </div>
    </motion.div>
  );
}
