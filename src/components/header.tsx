"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  showBack?: boolean;
  title?: string;
}

export function Header({ showBack = false, title }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        sticky top-0 z-50
        flex items-center gap-3
        px-4 py-3
        bg-stone-50/90 backdrop-blur-md
        border-b border-amber-100/50
      "
    >
      {showBack && (
        <Link
          href="/"
          className="
            p-2 -ml-2 rounded-xl
            text-stone-500 hover:text-stone-700
            hover:bg-amber-50
            transition-colors duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
          "
          aria-label="Go back to home"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
      )}

      {/* Nataraja icon (subtle SVG) */}
      <div className="flex items-center gap-2">
        <span className="font-serif text-sm font-semibold text-stone-600 tracking-wide">
          {title || "Natya Samhitha"}
        </span>
      </div>
    </motion.header>
  );
}
