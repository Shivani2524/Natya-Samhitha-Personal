"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";
import { useAppStore } from "@/lib/store";

export function OfflineIndicator() {
  const isOffline = useAppStore((s) => s.isOffline);

  return (
    <AnimatePresence>
      {isOffline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden fixed top-0 left-0 right-0 z-[60]"
        >
          <div
            className="
              flex items-center justify-center gap-2
              px-4 py-2
              bg-[var(--maroon-deep)]
              border-b border-[var(--gold-royal)]/20
              text-[var(--gold-bright)] text-xs font-nav tracking-[0.1em]
            "
            role="status"
            aria-live="polite"
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>Showing cached results</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
