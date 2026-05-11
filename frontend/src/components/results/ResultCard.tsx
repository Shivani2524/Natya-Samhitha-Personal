"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";
import type { Sloka } from "@/types";
import { GhungrooSeparator } from "@/components/ornaments/GhungrooSeparator";
import { RangoliBorder } from "@/components/ornaments/RangoliBorder";
import { cardRevealEnhanced, inkReveal } from "@/lib/animations";

interface ResultCardProps {
  sloka: Sloka;
  index: number;
}

/**
 * Sacred Manuscript Result Card — v2.0
 *
 * Features:
 * - Spun Gold gradient border (light catches top-left)
 * - Diya radial glow on hover (warm gold halo)
 * - Ink Reveal text animations (blur → sharp)
 * - Parchment manuscript texture with rangoli corners
 */
export function ResultCard({ sloka, index }: ResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      variants={cardRevealEnhanced}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.12 }}
      className="
        relative rounded-2xl overflow-hidden
        manuscript-page
        spun-gold-border diya-glow
        shadow-xl
        transition-all duration-500
        hover:-translate-y-1.5
        hover:shadow-[0_12px_48px_var(--shadow-warm),0_0_0_1px_rgba(200,146,42,0.25)]
      "
    >
      {/* Rangoli corner ornaments */}
      <RangoliBorder />

      <div className="relative p-5 sm:p-6 md:p-7 lg:p-8">
        {/* Chapter / Category header */}
        {(sloka.chapter || sloka.category) && (
          <motion.div
            variants={inkReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.12 + 0.1 }}
            className="flex items-center justify-between mb-5"
          >
            <span className="font-nav text-[0.65rem] tracking-[0.14em] text-[var(--gold-royal)]/70 uppercase">
              {sloka.chapter && `Adhyaya · ${sloka.chapter}`}
            </span>
            {sloka.category && (
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--glass-gold)] border border-[var(--gold-royal)]/15 text-[0.6rem] font-nav tracking-[0.1em] text-[var(--gold-bright)]/80 uppercase">
                <BookOpen className="w-3 h-3 text-[var(--gold-royal)]/50" />
                {sloka.category}
              </span>
            )}
          </motion.div>
        )}

        {/* Ghungroo divider */}
        <GhungrooSeparator animate={false} className="mb-5" />

        {/* Sanskrit Sloka text — treated as art */}
        {sloka.sanskrit && (
          <motion.div
            variants={inkReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.12 + 0.2 }}
            className="mb-6 p-5 sm:p-6 rounded-xl bg-black/20 border border-[var(--gold-royal)]/20 relative overflow-hidden"
          >
            {/* Subtle light effect inside the sloka box */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            
            <p
              className="
                font-sanskrit text-xl sm:text-2xl leading-[2.2]
                text-[var(--gold-bright)] font-medium
                whitespace-pre-line tracking-wide relative z-10
              "
              lang="sa"
              style={{
                textShadow:
                  "0 1px 3px rgba(200, 146, 42, 0.15), 0 0 24px rgba(244, 193, 70, 0.12)",
              }}
            >
              {sloka.sanskrit}
            </p>
          </motion.div>
        )}

        {/* IAST Transliteration */}
        {(sloka.shloka_iast || sloka.transliteration) && (
          <motion.p
            variants={inkReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.12 + 0.3 }}
            className="text-sm text-[var(--gold-royal)]/90 italic mb-5 leading-relaxed font-body whitespace-pre-line"
          >
            {(sloka.shloka_iast || sloka.transliteration || "").replace(
              / (Chapter|Adhyaya)/g,
              "\n\n$1"
            )}
          </motion.p>
        )}

        {/* Translation */}
        {sloka.translation && (
          <motion.p
            variants={inkReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.12 + 0.35 }}
            className="text-base text-[var(--text-cream)] leading-[1.8] mb-5 font-body"
          >
            {sloka.translation}
          </motion.p>
        )}

        {/* Application */}
        {sloka.application && (
          <motion.div
            variants={inkReveal}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.12 + 0.4 }}
            className="flex items-start gap-3 mb-5 p-4 rounded-xl bg-[var(--glass-gold)] border border-[var(--gold-royal)]/10"
          >
            <span className="font-nav text-[0.55rem] tracking-[0.18em] text-[var(--gold-bright)]/80 mt-0.5 flex-shrink-0 uppercase">
              PRACTICE
            </span>
            <p className="text-sm text-[var(--text-cream)]/90 leading-relaxed font-body">
              {sloka.application}
            </p>
          </motion.div>
        )}

        {/* Expand toggle */}
        {sloka.explanation && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              flex items-center gap-2
              text-sm font-body font-semibold
              text-[var(--gold-royal)] hover:text-[var(--gold-bright)]
              transition-colors duration-300
              cursor-pointer
              focus:outline-none focus-visible:underline
              group
            "
            aria-expanded={isExpanded}
            aria-controls={`explanation-${sloka.id}`}
          >
            <span>{isExpanded ? "Hide details" : "Read explanation & context"}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </motion.span>
          </button>
        )}

        {/* Expandable explanation */}
        <AnimatePresence initial={false}>
          {isExpanded && sloka.explanation && (
            <motion.div
              id={`explanation-${sloka.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5">
                <GhungrooSeparator animate={false} className="mb-5" />
                <motion.p
                  initial={{ opacity: 0, filter: "blur(3px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-sm text-[var(--text-cream)]/90 leading-[1.85] font-body"
                >
                  {sloka.explanation}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
