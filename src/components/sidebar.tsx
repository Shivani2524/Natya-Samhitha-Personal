"use client";

import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Clock, X, MessageSquare } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SoundToggle } from "@/components/sound-toggle";

export function Sidebar() {
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen, recentSearches, clearRecentSearches } =
    useAppStore();

  const handleNewChat = () => {
    setSidebarOpen(false);
    router.push("/");
  };

  const handleRecentTap = (query: string) => {
    setSidebarOpen(false);
    router.push(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Sidebar panel */}
          <motion.aside
            key="sidebar-panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="
              fixed top-0 left-0 bottom-0 z-50
              w-72 flex flex-col
              bg-[#FAF7F0] border-r border-amber-200/50
              shadow-xl shadow-stone-900/10
            "
          >
            {/* Sidebar header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-amber-100/60">
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-sm font-semibold text-stone-700 tracking-wide">
                  Natya Samhitha
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="
                  p-1.5 rounded-lg
                  text-stone-400 hover:text-stone-600
                  hover:bg-amber-100/50
                  transition-colors duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                "
                aria-label="Close sidebar"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* New Chat button */}
            <div className="px-4 pt-4 pb-2">
              <button
                onClick={handleNewChat}
                className="
                  w-full flex items-center gap-3
                  px-4 py-3 rounded-xl
                  bg-gradient-to-r from-amber-500 to-amber-600
                  text-white text-sm font-medium
                  shadow-sm shadow-amber-200/50
                  hover:shadow-md hover:shadow-amber-200/60
                  active:scale-[0.98]
                  transition-all duration-200
                  cursor-pointer
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2
                "
              >
                <Plus className="w-4.5 h-4.5" />
                New Chat
              </button>
            </div>

            {/* Recent Chats */}
            <div className="flex-1 flex flex-col min-h-0 px-4 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span className="text-xs text-stone-400 uppercase tracking-wider font-semibold">
                    Recent Chats
                  </span>
                </div>
                {recentSearches.length > 0 && (
                  <button
                    onClick={clearRecentSearches}
                    className="
                      text-xs text-stone-400 hover:text-amber-600
                      transition-colors duration-200
                      cursor-pointer
                    "
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Chat list */}
              <div className="flex-1 overflow-y-auto scrollbar-hide space-y-1 pb-6">
                {recentSearches.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <MessageSquare className="w-8 h-8 text-stone-200 mb-3" />
                    <p className="text-xs text-stone-400">No recent chats yet</p>
                    <p className="text-xs text-stone-300 mt-1">Start a new search to begin</p>
                  </div>
                ) : (
                  recentSearches.map((search, index) => (
                    <motion.button
                      key={`${search.query}-${search.timestamp}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.25 }}
                      onClick={() => handleRecentTap(search.query)}
                      className="
                        w-full flex items-center gap-3
                        px-3 py-2.5 rounded-lg
                        text-left text-sm text-stone-600
                        hover:bg-amber-50/80 hover:text-stone-800
                        transition-colors duration-150
                        cursor-pointer
                        group
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                      "
                    >
                      <MessageSquare className="w-4 h-4 text-stone-300 group-hover:text-amber-500 transition-colors flex-shrink-0" />
                      <span className="truncate">{search.query}</span>
                      <span className="ml-auto text-[10px] text-stone-300 flex-shrink-0">
                        {formatTimestamp(search.timestamp)}
                      </span>
                    </motion.button>
                  ))
                )}
              </div>
            </div>

            {/* Sound toggle */}
            <div className="px-4 pb-2">
              <SoundToggle />
            </div>

            {/* Sidebar footer */}
            <div className="px-5 py-3 border-t border-amber-100/60">
              <p className="text-[10px] text-stone-300 text-center">
                Wisdom of the Natya Shastra
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/** Format timestamp to a human-friendly relative string */
function formatTimestamp(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}
