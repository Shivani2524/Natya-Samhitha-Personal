"use client";

import { motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export function RecentSearches() {
  const router = useRouter();
  const { recentSearches, clearRecentSearches } = useAppStore();

  if (recentSearches.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="w-full max-w-lg"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          Recent Searches
        </h2>
        <button
          type="button"
          onClick={clearRecentSearches}
          className="text-xs text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
          aria-label="Clear recent searches"
        >
          Clear
        </button>
      </div>
      <ul className="space-y-1" role="list">
        {recentSearches.slice(0, 5).map((search, index) => (
          <motion.li
            key={`${search.query}-${search.timestamp}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
          >
            <button
              type="button"
              onClick={() =>
                router.push(`/results?q=${encodeURIComponent(search.query)}`)
              }
              className="
                flex items-center gap-3 w-full
                px-3 py-2.5 rounded-xl
                text-left text-sm text-stone-600
                hover:bg-amber-50/60
                transition-colors duration-200
                cursor-pointer
                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
              "
            >
              <Clock className="w-3.5 h-3.5 text-stone-300 flex-shrink-0" />
              <span className="truncate">{search.query}</span>
            </button>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
