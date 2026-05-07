"use client";

import { Menu } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Sidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);

  return (
    <>
      {/* Sidebar */}
      <Sidebar />

      {/* Hamburger menu button — fixed top-left */}
      <button
        onClick={toggleSidebar}
        className="
          fixed top-4 left-4 z-30
          flex items-center justify-center
          w-10 h-10 rounded-xl
          bg-white/80 backdrop-blur-sm
          border border-amber-200/50
          shadow-sm
          text-stone-500 hover:text-stone-700
          hover:bg-amber-50 hover:border-amber-300/60
          transition-all duration-200
          cursor-pointer
          focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
        "
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Main content */}
      {children}
    </>
  );
}
