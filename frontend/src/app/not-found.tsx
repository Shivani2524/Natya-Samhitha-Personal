"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MandalaBackground } from "@/components/hero/MandalaBackground";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <MandalaBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-md"
      >
        {/* Sanskrit numeral */}
        <span
          className="font-sanskrit text-8xl text-[var(--gold-bright)]/20 block mb-4"
          aria-hidden="true"
        >
          ४०४
        </span>

        <h1 className="font-display text-3xl text-[var(--gold-bright)] italic mb-3">
          Path Not Found
        </h1>

        <p className="font-body text-sm text-[var(--text-cream)]/50 mb-8 leading-relaxed">
          This chapter of the Natya Shastra has not yet been illuminated.
          <br />
          Return to the beginning and seek anew.
        </p>

        <Link
          href="/"
          className="
            inline-flex items-center gap-2
            px-6 py-3 rounded-xl
            font-nav text-xs tracking-[0.12em]
            text-[var(--cream-warm)]
            transition-all duration-300
            hover:scale-[1.02] hover:shadow-lg hover:shadow-[var(--glow-gold)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-bright)]
          "
          style={{ background: "var(--gradient-gold)" }}
        >
          Return Home
        </Link>
      </motion.div>

      {/* Sanskrit sloka watermark */}
      <p
        className="absolute bottom-8 font-sanskrit text-xs text-[var(--text-cream)]/8 text-center"
        aria-hidden="true"
      >
        नाट्यं भिन्नरुचेर्जनस्य बहुधाप्येकं समाराधनम्
      </p>
    </div>
  );
}
