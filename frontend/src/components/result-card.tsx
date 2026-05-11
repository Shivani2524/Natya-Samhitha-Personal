"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, BookOpen, ImageIcon } from "lucide-react";
import type { Shloka } from "@/types";

interface ResultCardProps {
  shloka: Shloka;
  index: number;
}

export function ResultCard({ shloka, index }: ResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="
        rounded-2xl bg-white/80 backdrop-blur-sm
        border border-amber-100/80
        shadow-sm
        overflow-hidden
        transition-shadow duration-300
        hover:shadow-md hover:shadow-amber-50
      "
    >
      {/* Card content */}
      <div className="p-5">
        {/* Chapter Header */}
        {(shloka.chapter || shloka.category) && (
          <div className="flex items-center justify-end mb-4">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-50 border border-stone-100 text-xs text-stone-500 font-medium">
              <BookOpen className="w-3.5 h-3.5 text-amber-600/70" />
              {shloka.chapter || shloka.category}
            </span>
          </div>
        )}

        {/* Shloka text (Sanskrit) */}
        {shloka.sanskrit && (
          <div className="mb-4 pl-4 border-l-2 border-amber-400">
            <p
              className="
                font-serif text-lg leading-relaxed text-stone-900 font-medium
                whitespace-pre-line tracking-wide
              "
              lang="sa"
            >
              {shloka.sanskrit}
            </p>
          </div>
        )}

        {/* Transliteration (from shloka_iast or transliteration) */}
        {(shloka.shloka_iast || shloka.transliteration) && (
          <p className="text-sm text-stone-500 italic mb-4 leading-relaxed">
            {shloka.shloka_iast || shloka.transliteration}
          </p>
        )}

        {/* Translation */}
        {shloka.translation && (
          <p className="text-base text-stone-700 leading-relaxed mb-4">
            {shloka.translation}
          </p>
        )}

        {/* Application line */}
        {shloka.application && (
          <div className="flex items-start gap-3 mb-4 p-3.5 rounded-xl bg-amber-50/60 border border-amber-100/50">
            <span className="text-amber-700 text-xs font-bold uppercase tracking-widest mt-0.5 flex-shrink-0">
              Apply
            </span>
            <p className="text-sm text-stone-800 leading-relaxed font-medium">
              {shloka.application}
            </p>
          </div>
        )}

        {/* Expand toggle (only if explanation exists) */}
        {shloka.explanation && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              flex items-center gap-1.5
              text-sm text-amber-600 font-semibold
              hover:text-amber-700
              transition-colors duration-200
              cursor-pointer
              focus:outline-none focus-visible:underline
            "
            aria-expanded={isExpanded}
            aria-controls={`explanation-${shloka.id}`}
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
          {isExpanded && shloka.explanation && (
            <motion.div
              id={`explanation-${shloka.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-4 border-t border-amber-100/60">
                {/* Image Placeholder */}
                <div className="w-full h-32 bg-stone-100/80 rounded-xl mb-4 border border-stone-200 flex items-center justify-center flex-col gap-2 text-stone-400">
                  <ImageIcon className="w-6 h-6 opacity-50" />
                  <span className="text-xs font-medium uppercase tracking-wider opacity-60">Visual Reference</span>
                </div>
                
                <p className="text-sm text-stone-600 leading-relaxed">
                  {shloka.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
