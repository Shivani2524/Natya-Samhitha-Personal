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
          className="overflow-hidden"
        >
          <div
            className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 text-xs font-medium"
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
