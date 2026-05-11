"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SearchBar } from "@/components/search-bar";
import { SuggestionChips } from "@/components/suggestion-chips";
import { useAppStore } from "@/lib/store";

export default function HomePage() {
  const router = useRouter();
  const addRecentSearch = useAppStore((s) => s.addRecentSearch);

  const handleSearchNavigation = (query: string) => {
    addRecentSearch(query);
    router.push(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <main className="relative flex-1 flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      {/* Nataraja background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src="/nataraja-bg.png"
          alt=""
          className="w-[708px] h-[708px] object-contain opacity-[0.06]"
          draggable={false}
        />
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-8"
      >
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-800 tracking-tight">
          Natya Samhitha
        </h1>
        <p className="mt-2 text-sm text-stone-400 font-medium">
          Explore the wisdom of Natya Shastra
        </p>
      </motion.div>

      {/* Search (with integrated voice mic) */}
      <div className="w-full flex flex-col items-center gap-6 mb-12">
        <SearchBar autoFocus onVoiceResult={handleSearchNavigation} />
      </div>

      {/* Suggested topics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="w-full flex flex-col items-center"
      >
        <p className="text-xs text-stone-400 text-center mb-4 uppercase tracking-wider font-semibold">
          Or try asking
        </p>
        <SuggestionChips onSuggestionTap={handleSearchNavigation} />
      </motion.div>
    </main>
  );
}

