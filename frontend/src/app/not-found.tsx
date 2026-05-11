"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="none"
          className="mx-auto mb-6 text-amber-300"
          aria-hidden="true"
        >
          <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="32" cy="28" r="4" fill="currentColor" opacity="0.4" />
          <path
            d="M32 32v8M24 48l8-8 8 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <h1 className="font-serif text-2xl font-bold text-stone-700 mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-stone-400 mb-8">
          This path does not lead to any shloka.
        </p>

        <Link
          href="/"
          className="
            inline-flex items-center gap-2
            px-6 py-3 rounded-full
            bg-gradient-to-r from-amber-500 to-amber-600
            text-white text-sm font-medium
            shadow-md shadow-amber-200/50
            hover:shadow-lg hover:shadow-amber-200/60
            transition-all duration-300
          "
        >
          Return Home
        </Link>
      </motion.div>
    </main>
  );
}
