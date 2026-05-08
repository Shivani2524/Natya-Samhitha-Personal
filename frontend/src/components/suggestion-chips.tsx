"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";

interface SuggestionChipsProps {
  onSuggestionTap: (label: string) => void;
  suggestions?: string[];
}

const defaultSuggestions = [
  "How to express anger in dance?",
  "What is abhinaya?",
  "How is sorrow represented?",
  "Rules of stage design",
];

export function SuggestionChips({ onSuggestionTap, suggestions }: SuggestionChipsProps) {
  const displaySuggestions = suggestions && suggestions.length > 0 ? suggestions : defaultSuggestions;

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-lg">
      {displaySuggestions.map((suggestion, index) => (
        <motion.button
          key={suggestion}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          type="button"
          onClick={() => onSuggestionTap(suggestion)}
          className="
            w-full flex items-center justify-between
            px-5 py-3 rounded-xl
            bg-white/60 backdrop-blur-sm
            border border-amber-100/50
            text-left text-sm text-stone-600 font-medium
            transition-all duration-300
            hover:bg-white/90 hover:border-amber-200 hover:shadow-sm hover:shadow-amber-100/50
            hover:-translate-y-0.5
            focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
          "
        >
          <span>{suggestion}</span>
          <MessageSquareQuote className="w-4 h-4 text-amber-500/50" />
        </motion.button>
      ))}
    </div>
  );
}
