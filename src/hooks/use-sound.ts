"use client";

import { useRef, useCallback, useEffect } from "react";
import { useAppStore } from "@/lib/store";

/**
 * useSound — Clean, reliable audio feedback hook.
 *
 * - Single Audio instance (preloaded, no re-instantiation)
 * - Prevents overlap by resetting currentTime
 * - Respects global soundEnabled preference
 * - Handles browser autoplay restrictions gracefully
 */
export function useSound(
  src = "/sounds/anklet.mp3",
  volume = 0.3
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const soundEnabled = useAppStore((s) => s.soundEnabled);

  // Preload audio once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = Math.min(Math.max(volume, 0), 1);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src, volume]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !soundEnabled) return;

    // Reset to start — prevents overlap, reuses instance
    audio.currentTime = 0;
    audio.volume = Math.min(Math.max(volume, 0), 1);

    // Play with error handling for browser autoplay restrictions
    audio.play().catch(() => {
      // Silently ignore — browser blocked autoplay before user gesture
    });
  }, [soundEnabled, volume]);

  return { play };
}
