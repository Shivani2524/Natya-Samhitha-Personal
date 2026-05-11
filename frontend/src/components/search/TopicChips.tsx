"use client";

import { motion } from "framer-motion";
import { staggerFast, chipReveal } from "@/lib/animations";

interface TopicChipsProps {
  onSuggestionTap: (label: string) => void;
}

const topics = [
  "What are the Navarasas?",
  "Tell me about Shringara Rasa",
  "How to perform Hasta Mudras?",
  "What is the Tandava dance?",
  "Explain Lasya in dance",
  "What is Angika Abhinaya?",
  "Explain Sattvik Abhinaya",
  "What are the Drishti Bhedas?",
  "Explain Charis & Mandala",
  "What are the Tala Systems?",
  "What is Natyadharmi?",
  "What is Lokadharmi?",
];

/**
 * Sacred topic suggestion chips.
 * Cinzel font, glass-gold background, gold border, floating bob animation.
 */
export function TopicChips({ onSuggestionTap }: TopicChipsProps) {
  return (
    <motion.div
      variants={staggerFast}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-2.5 max-w-4xl px-4"
    >
      {topics.map((topic, i) => (
        <motion.button
          key={topic}
          variants={chipReveal}
          type="button"
          onClick={() => onSuggestionTap(topic)}
          className="
            px-4 py-2 sm:px-5 sm:py-2.5 rounded-full
            bg-[var(--maroon-deep)]/80 backdrop-blur-sm
            border border-[var(--gold-bright)]/40
            font-body text-[0.7rem] sm:text-[0.8rem] font-semibold tracking-wide
            text-[var(--gold-bright)]
            transition-all duration-300
            hover:bg-[var(--gold-bright)] hover:text-[var(--maroon-deep)]
            hover:-translate-y-[3px] hover:scale-105
            hover:shadow-[0_8px_24px_rgba(244,193,70,0.35)]
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-bright)]
            cursor-pointer
            animate-bob
          "
          style={{
            ["--bob-delay" as string]: `${i * 0.4}s`,
          }}
        >
          {topic}
        </motion.button>
      ))}
    </motion.div>
  );
}
