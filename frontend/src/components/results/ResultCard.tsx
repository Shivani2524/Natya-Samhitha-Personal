"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen } from "lucide-react";
import type { Sloka } from "@/types";
import { GhungrooSeparator } from "@/components/ornaments/GhungrooSeparator";
import { RangoliBorder } from "@/components/ornaments/RangoliBorder";
import { cardReveal } from "@/lib/animations";

interface ResultCardProps {
  sloka: Sloka;
  index: number;
}

/**
 * Sacred Manuscript Result Card
 *
 * Parchment-textured card with rangoli corner ornaments,
 * ghungroo dividers, and temple-inspired typography.
 */
export function ResultCard({ sloka, index }: ResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      variants={cardReveal}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.15 }}
      className="
        relative rounded-2xl overflow-hidden
        manuscript-page
        border border-[var(--gold-royal)]/20
        shadow-xl
        transition-all duration-400
        hover:-translate-y-1 hover:shadow-[0_8px_40px_var(--shadow-warm),0_0_0_1px_var(--gold-royal)/30]
      "
    >
      {/* Rangoli corner ornaments */}
      <RangoliBorder />

      <div className="relative p-4 sm:p-5 md:p-6 lg:p-7">
        {/* Chapter / Category header */}
        {(sloka.chapter || sloka.category) && (
          <div className="flex items-center justify-between mb-4">
            <span className="font-nav text-[0.65rem] tracking-[0.12em] text-[var(--gold-royal)]/70">
              {sloka.chapter && `Adhyaya · ${sloka.chapter}`}
            </span>
            {sloka.category && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--glass-gold)] border border-[var(--gold-royal)]/20 text-[0.65rem] font-nav tracking-[0.08em] text-[var(--gold-bright)]/80">
                <BookOpen className="w-3 h-3 text-[var(--gold-royal)]/60" />
                {sloka.category}
              </span>
            )}
          </div>
        )}

        {/* Ghungroo divider */}
        <GhungrooSeparator animate={false} className="mb-4" />

        {/* Sanskrit Sloka text */}
        {sloka.sanskrit && (
          <div className="mb-4 pl-4 border-l-2 border-[var(--gold-royal)]/50">
            <p
              className="
                font-sanskrit text-lg sm:text-xl leading-[2]
                text-[var(--gold-bright)] font-medium
                whitespace-pre-line tracking-wide
              "
              lang="sa"
              style={{ textShadow: "0 0 20px rgba(200, 146, 42, 0.2)" }}
            >
              {sloka.sanskrit}
            </p>
          </div>
        )}

        {/* IAST Transliteration */}
        {(sloka.sloka_iast || sloka.transliteration) && (
          <p className="text-sm text-[var(--gold-royal)] italic mb-4 leading-relaxed font-body whitespace-pre-line">
            {(sloka.sloka_iast || sloka.transliteration || "").replace(/ (Chapter|Adhyaya)/g, '\n\n$1')}
          </p>
        )}

        {/* Translation */}
        {sloka.translation && (
          <p className="text-base text-[var(--text-cream)]/90 leading-relaxed mb-4 font-body">
            {sloka.translation}
          </p>
        )}

        {/* Application */}
        {sloka.application && (
          <div className="flex items-start gap-3 mb-4 p-4 rounded-xl bg-[var(--glass-gold)] border border-[var(--gold-royal)]/15">
            <span className="font-nav text-[0.6rem] tracking-[0.15em] text-[var(--gold-bright)]/60 mt-0.5 flex-shrink-0">
              PRACTICE
            </span>
            <p className="text-sm text-[var(--text-cream)]/80 leading-relaxed font-body">
              {sloka.application}
            </p>
          </div>
        )}

        {/* Expand toggle */}
        {sloka.explanation && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              flex items-center gap-1.5
              text-sm font-body font-semibold
              text-[var(--gold-royal)] hover:text-[var(--gold-bright)]
              transition-colors duration-200
              cursor-pointer
              focus:outline-none focus-visible:underline
            "
            aria-expanded={isExpanded}
            aria-controls={`explanation-${sloka.id}`}
          >
            <span>{isExpanded ? "Hide details" : "Read explanation & context"}</span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown className="w-4 h-4" />
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
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-4">
                <GhungrooSeparator animate={false} className="mb-4" />
                <p className="text-sm text-[var(--text-cream)]/80 leading-relaxed font-body">
                  {sloka.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
