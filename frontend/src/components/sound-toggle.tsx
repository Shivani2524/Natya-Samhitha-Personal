"use client";

import { Volume2, VolumeOff } from "lucide-react";
import { useAppStore } from "@/lib/store";

/**
 * SoundToggle — Compact toggle for sound effects preference.
 * Displays current state with icon and ON/OFF badge.
 * Persists via Zustand store → localStorage.
 */
export function SoundToggle() {
  const { soundEnabled, toggleSound } = useAppStore();

  return (
    <button
      type="button"
      onClick={toggleSound}
      className={`
        flex items-center gap-2.5
        w-full px-3 py-2.5 rounded-lg
        text-left text-sm
        transition-colors duration-150
        cursor-pointer
        focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
        ${
          soundEnabled
            ? "text-amber-700 bg-amber-50/60"
            : "text-stone-500 hover:bg-amber-50/40 hover:text-stone-700"
        }
      `}
      aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
      aria-pressed={soundEnabled}
    >
      {soundEnabled ? (
        <Volume2 className="w-4 h-4 flex-shrink-0" />
      ) : (
        <VolumeOff className="w-4 h-4 flex-shrink-0" />
      )}
      <span>Sound Effects</span>
      <span
        className={`
          ml-auto text-[10px] font-semibold uppercase tracking-wider
          px-1.5 py-0.5 rounded
          ${
            soundEnabled
              ? "bg-amber-500/15 text-amber-600"
              : "bg-stone-200/50 text-stone-400"
          }
        `}
      >
        {soundEnabled ? "ON" : "OFF"}
      </span>
    </button>
  );
}
