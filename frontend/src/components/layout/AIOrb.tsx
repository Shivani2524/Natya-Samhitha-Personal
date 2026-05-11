"use client";

import { motion } from "framer-motion";

/**
 * AI Diya — The Living Lamp
 *
 * A glowing traditional diya that sits in the bottom-right corner.
 * It floats dynamically, with a flickering flame, aura rings, and floating particles.
 */
export function AIOrb() {
  const particles = ["ॐ", "न", "त", "य", "श"];

  return (
    <div
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
      aria-hidden="true"
    >
      <motion.div 
        className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Outer aura ring */}
        <motion.div
          className="absolute inset-[-10px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 160, 60, 0.2) 0%, transparent 65%)",
          }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Ornate Brass Diya Base */}
        <div className="absolute bottom-1 w-14 h-8 sm:w-16 sm:h-10 z-10 drop-shadow-[0_5px_8px_rgba(0,0,0,0.8)]">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <defs>
              <linearGradient id="gold-body" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F4C146" />
                <stop offset="40%" stopColor="#C8922A" />
                <stop offset="100%" stopColor="#5C3A08" />
              </linearGradient>
              <linearGradient id="gold-rim" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#8B6914" />
                <stop offset="100%" stopColor="#F4C146" />
              </linearGradient>
              <radialGradient id="oil-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F4C146" />
                <stop offset="100%" stopColor="#8B4513" />
              </radialGradient>
            </defs>

            {/* Base Pedestal */}
            <path d="M 35 55 Q 50 48 65 55 L 60 60 L 40 60 Z" fill="#5C3A08" />
            <path d="M 43 45 L 57 45 L 53 55 L 47 55 Z" fill="url(#gold-body)" />

            {/* Main Bowl (Tear drop viewed from front-top) */}
            <path d="M 10 25 Q 50 65 90 25 Q 50 40 10 25 Z" fill="url(#gold-body)" />
            
            {/* Rim */}
            <path d="M 10 25 Q 50 40 90 25 Q 50 18 10 25 Z" fill="url(#gold-rim)" />
            
            {/* Inner Depth */}
            <path d="M 15 25 Q 50 35 85 25 Q 50 20 15 25 Z" fill="#3D1A0A" />

            {/* Golden Oil */}
            <path d="M 20 25 Q 50 32 80 25 Q 50 22 20 25 Z" fill="url(#oil-glow)" />
            
            {/* Wick */}
            <path d="M 46 26 Q 50 30 54 26 L 50 16 Z" fill="#2A0800" />
          </svg>
        </div>

        {/* Flickering Flame */}
        <motion.div
          className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 origin-bottom"
          animate={{
            scaleY: [1, 1.2, 0.9, 1.15, 1],
            scaleX: [1, 0.9, 1.1, 0.95, 1],
            rotate: [0, -3, 2, -1, 0],
            opacity: [0.9, 1, 0.85, 0.95, 0.9],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-5 h-8 sm:w-6 sm:h-10">
            {/* Outer flame glow */}
            <div className="absolute inset-0 bg-[var(--glow-gold)] blur-md rounded-full opacity-60" />
            
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 24 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              <path
                d="M12 0C12 0 24 14 24 24C24 30.6 18.6 36 12 36C5.4 36 0 30.6 0 24C0 14 12 0 12 0Z"
                fill="url(#flame-gradient)"
              />
              <defs>
                <radialGradient
                  id="flame-gradient"
                  cx="50%"
                  cy="70%"
                  r="50%"
                >
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="30%" stopColor="#F4C146" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#E55D20" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#8B0000" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Orbiting Sanskrit particles */}
        {particles.map((char, i) => {
          const angle = (360 / particles.length) * i;
          const duration = 12 + i * 2;
          return (
            <motion.span
              key={i}
              className="absolute font-sanskrit text-[12px] sm:text-[14px] text-[var(--gold-bright)] drop-shadow-[0_0_5px_var(--glow-gold)]"
              style={{ opacity: 0.4 }}
              animate={{ rotate: [angle, angle + 360] }}
              transition={{ duration, repeat: Infinity, ease: "linear" }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: `translateX(${35 + i * 2}px)`,
                }}
              >
                {char}
              </span>
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}
