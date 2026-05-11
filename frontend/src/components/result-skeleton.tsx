"use client";

import { motion } from "framer-motion";

export function ResultSkeleton() {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-3 py-8"
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-amber-400"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
        <p className="text-sm text-stone-400 font-medium">
          Searching relevant shlokas…
        </p>
      </motion.div>
      {[0, 1].map((i) => (
        <div
          key={i}
          className="rounded-2xl bg-white/60 border border-amber-100/50 p-5 space-y-3 animate-pulse"
        >
          <div className="flex justify-between">
            <div className="h-5 w-16 bg-stone-200/60 rounded-full" />
            <div className="h-4 w-24 bg-stone-100/60 rounded" />
          </div>
          <div className="space-y-2 pl-4 border-l-2 border-amber-200/40">
            <div className="h-4 w-full bg-stone-200/50 rounded" />
            <div className="h-4 w-3/4 bg-stone-200/50 rounded" />
          </div>
          <div className="h-3 w-full bg-stone-100/50 rounded" />
          <div className="h-3 w-5/6 bg-stone-100/50 rounded" />
          <div className="h-12 w-full bg-amber-50/40 rounded-xl" />
        </div>
      ))}
    </div>
  );
}
