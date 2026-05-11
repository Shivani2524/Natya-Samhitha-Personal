"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface RasaFeedbackProps {
  queryId: string;
  onSubmit: (queryId: string, feedback: number) => Promise<void>;
}

/**
 * Like / Dislike feedback using cute Bharatanatyam dancer illustrations.
 * Happy dancer = liked, Sad dancer = needs improvement.
 */
export function RasaFeedback({ queryId, onSubmit }: RasaFeedbackProps) {
  const [selected, setSelected] = useState<"like" | "dislike" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = async (type: "like" | "dislike") => {
    if (selected || isSubmitting) return;
    setIsSubmitting(true);
    setSelected(type);
    try {
      await onSubmit(queryId, type === "like" ? 1 : -1);
    } catch {
      setSelected(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-4 mt-4 border-t border-[var(--gold-royal)]/20">
      {/* Label */}
      <p className="text-left text-[0.65rem] font-nav tracking-[0.1em] text-[var(--gold-bright)]/60 mb-3 px-1">
        Was this helpful?
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-start gap-4">
        {/* Like button */}
        <motion.button
          type="button"
          onClick={() => handleSelect("like")}
          disabled={selected !== null}
          whileHover={!selected ? { scale: 1.05 } : {}}
          whileTap={!selected ? { scale: 0.95 } : {}}
          className={`
            relative group flex items-center gap-2
            transition-all duration-300 cursor-pointer
            focus:outline-none rounded-lg p-1
            ${
              selected === "like"
                ? "opacity-100"
                : selected === "dislike"
                  ? "opacity-20 grayscale cursor-not-allowed"
                  : "opacity-60 hover:opacity-100"
            }
          `}
          aria-label="Helpful"
        >
          <div
            className={`
              relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden
              bg-[var(--cream-warm)]/5 backdrop-blur-sm
              border border-[var(--gold-royal)]/10
              ${selected === "like" ? "border-[var(--gold-bright)] bg-[var(--gold-bright)]/10 shadow-lg" : ""}
            `}
          >
            <Image
              src="/like-dancer.png"
              alt="Helpful"
              fill
              className="object-contain p-0.5"
              sizes="40px"
            />
          </div>
          <span className="text-[0.6rem] font-nav tracking-wider font-medium text-[var(--text-cream)]/70 group-hover:text-[var(--gold-bright)]">
            Yes
          </span>
        </motion.button>

        {/* Dislike button */}
        <motion.button
          type="button"
          onClick={() => handleSelect("dislike")}
          disabled={selected !== null}
          whileHover={!selected ? { scale: 1.05 } : {}}
          whileTap={!selected ? { scale: 0.95 } : {}}
          className={`
            relative group flex items-center gap-2
            transition-all duration-300 cursor-pointer
            focus:outline-none rounded-lg p-1
            ${
              selected === "dislike"
                ? "opacity-100"
                : selected === "like"
                  ? "opacity-20 grayscale cursor-not-allowed"
                  : "opacity-60 hover:opacity-100"
            }
          `}
          aria-label="Not helpful"
        >
          <div
            className={`
              relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden
              bg-[var(--cream-warm)]/5 backdrop-blur-sm
              border border-[var(--gold-royal)]/10
              ${selected === "dislike" ? "border-[var(--bronze-temple)] bg-[var(--bronze-temple)]/10 shadow-lg" : ""}
            `}
          >
            <Image
              src="/dislike-dancer.png"
              alt="Not helpful"
              fill
              className="object-contain p-0.5"
              sizes="40px"
            />
          </div>
          <span className="text-[0.6rem] font-nav tracking-wider font-medium text-[var(--text-cream)]/70 group-hover:text-[var(--bronze-temple)]">
            No
          </span>
        </motion.button>
      </div>

      {/* Thank-you message after selection */}
      <AnimatePresence>
        {selected && (
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-left text-[0.6rem] font-body italic text-[var(--gold-bright)]/60 mt-3 px-1"
          >
            {selected === "like" ? "🙏 Thanks!" : "🙏 Noted."}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
