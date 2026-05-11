"use client";

import { motion } from "framer-motion";
import { SanskritParticles } from "./SanskritParticles";
import { MandalaBackground } from "./MandalaBackground";
import { heroTitle, heroSubtitle, heroSearch, heroChips } from "@/lib/animations";

interface HeroSectionProps {
  children: React.ReactNode;
  chips?: React.ReactNode;
}

/**
 * HeroSection — Full viewport immersive landing experience.
 *
 * Background layers:
 * 1. Deep maroon radial gradient (via CSS body)
 * 2. Grain texture overlay
 * 3. Rotating mandala
 * 4. Nataraja watermark
 * 5. Floating Sanskrit particles
 * 6. Warm diya glow from below
 */
export function HeroSection({ children, chips }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:px-6 sm:py-24 overflow-hidden">
      {/* Layer 1: Grain texture */}
      <div className="grain-overlay absolute inset-0" />

      {/* Layer 2: Mandala */}
      <MandalaBackground />

      {/* Layer 3: Nataraja watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src="/nataraja-bg.png"
          alt=""
          className="w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] md:w-[850px] md:h-[850px] lg:w-[1000px] lg:h-[1000px] object-contain opacity-[0.04]"
          draggable={false}
        />
      </div>

      {/* Layer 4: Sanskrit particles */}
      <SanskritParticles />

      {/* Layer 5: Diya glow from below */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255, 160, 60, 0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl w-full">
        {/* OM symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <motion.span
            className="font-sanskrit text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[var(--gold-bright)]"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ textShadow: "0 0 30px var(--glow-gold)" }}
          >
            ॐ
          </motion.span>
        </motion.div>

        {/* Sanskrit title */}
        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="font-sanskrit text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[var(--gold-bright)] mb-2 leading-tight"
          style={{ textShadow: "0 0 40px rgba(244, 193, 70, 0.3)" }}
        >
          नाट्य संहिता
        </motion.h1>

        {/* English title */}
        <motion.h2
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="font-nav text-base sm:text-lg md:text-xl lg:text-2xl tracking-[0.2em] text-gradient-gold mb-4"
        >
          NATYA SAMHITHA
        </motion.h2>

        {/* Tagline */}
        <motion.p
          variants={heroSubtitle}
          initial="hidden"
          animate="visible"
          className="font-body text-xs sm:text-sm md:text-base text-[var(--text-cream)]/60 mb-8 sm:mb-10 italic"
        >
          &ldquo;Explore the Wisdom of Natya Shastra Through AI&rdquo;
        </motion.p>

        {/* Search bar slot */}
        <motion.div
          variants={heroSearch}
          initial="hidden"
          animate="visible"
          className="w-full mb-10"
        >
          {children}
        </motion.div>

        {/* Topic chips slot */}
        {chips && (
          <motion.div
            variants={heroChips}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            {chips}
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L12 20M12 20L6 14M12 20L18 14"
            stroke="var(--gold-royal)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </svg>
      </motion.div>
    </section>
  );
}
