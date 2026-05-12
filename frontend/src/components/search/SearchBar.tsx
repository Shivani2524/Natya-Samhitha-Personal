"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Mic, Loader2, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { useSound } from "@/hooks/use-sound";
import { useVoice } from "@/hooks/use-voice";
import { RangoliBorder } from "@/components/ornaments/RangoliBorder";

const searchSchema = z.object({
  query: z.string().min(1, "Please enter a search term"),
});

type SearchForm = z.infer<typeof searchSchema>;

interface SearchBarProps {
  defaultValue?: string;
  compact?: boolean;
  autoFocus?: boolean;
  onVoiceResult?: (transcript: string) => void;
  onSubmitQuery?: (query: string) => void;
}

/**
 * Sacred Portal Search Bar — v2.0
 *
 * Features:
 * - Magnetic Cursor Glow: A soft gold radial gradient follows
 *   the mouse position over the search bar (only element with this effect).
 * - Spun Gold border with glass-maroon-premium backdrop.
 * - Diya focus state with pulsating glow.
 */
export function SearchBar({
  defaultValue = "",
  compact = false,
  autoFocus = false,
  onVoiceResult,
  onSubmitQuery,
}: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Magnetic glow state (only for non-compact mode)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (compact || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGlowPos({ x, y });
    },
    [compact]
  );

  const { register, handleSubmit, reset, watch } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: defaultValue },
  });

  const queryValue = watch("query");

  const { play: playChime } = useSound();

  const onSubmit = (data: SearchForm) => {
    playChime();
    if (onSubmitQuery) {
      onSubmitQuery(data.query);
      if (compact) {
        reset({ query: "" });
      }
    } else {
      router.push(`/results?q=${encodeURIComponent(data.query)}`);
    }
  };

  const handleVoiceResult = useCallback(
    (transcript: string) => {
      if (onVoiceResult) {
        onVoiceResult(transcript);
      } else {
        router.push(`/results?q=${encodeURIComponent(transcript)}`);
      }
    },
    [onVoiceResult, router]
  );

  const { voiceState, startRecording, stopRecording } =
    useVoice(handleVoiceResult);
  const isRecording = voiceState === "recording";
  const isProcessing = voiceState === "processing";

  const { ref, ...rest } = register("query");

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative w-full ${compact ? "max-w-sm" : "max-w-[520px]"} mx-auto`}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`
          relative flex items-center
          rounded-2xl overflow-visible
          transition-all duration-500
          ${
            compact
              ? "px-3 py-2 glass-card rounded-2xl"
              : `px-4 py-2.5 bg-white/5 backdrop-blur-xl rounded-full
                 border border-[var(--gold-royal)]
                 shadow-xl shadow-black/20
                 focus-within:border-[var(--gold-bright)]
                 focus-within:shadow-[0_0_0_4px_var(--glow-gold),0_0_32px_var(--glow-diya)]`
          }
        `}
      >
        {/* Magnetic cursor glow (non-compact only) */}
        {!compact && (
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              opacity: isHovering ? 1 : 0,
              background: `radial-gradient(
                250px circle at ${glowPos.x}% ${glowPos.y}%,
                rgba(244, 193, 70, 0.12) 0%,
                transparent 70%
              )`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Ornamental corners (only in non-compact mode) */}
        {!compact && <RangoliBorder />}

        <Search
          className={`flex-shrink-0 relative z-10 ${
            compact
              ? "w-4 h-4 text-[var(--gold-royal)]/60"
              : "w-5 h-5 text-[var(--bronze-temple)]"
          }`}
          aria-hidden="true"
        />

        <input
          {...rest}
          ref={(e) => {
            ref(e);
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = e;
          }}
          type="text"
          autoFocus={autoFocus}
          placeholder={
            compact
              ? "Refine your question..."
              : "Ask about a mudra, rasa, abhinaya…"
          }
          autoComplete="off"
          aria-label="Ask anything about Natya Shastra"
          className={`
            w-full bg-transparent outline-none relative z-10
            font-body
            ${
              compact
                ? "ml-2 text-sm text-[var(--text-cream)] placeholder:text-[var(--text-cream)]/30"
                : "ml-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted-gold)]/50"
            }
          `}
        />

        {/* Voice mic button */}
        {!queryValue?.trim() ? (
          <button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isProcessing}
            aria-label={isRecording ? "Stop voice recording" : "Start voice search"}
            className={`
              relative flex-shrink-0 flex items-center justify-center z-10
              rounded-full transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-royal)]
              ${compact ? "w-8 h-8 ml-1" : "w-10 h-10 ml-2"}
              ${
                isRecording
                  ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                  : compact
                    ? "text-[var(--gold-royal)]/60 hover:text-[var(--gold-bright)] hover:bg-[var(--glass-gold)]"
                    : "bg-[var(--saffron)] text-[var(--maroon-black)] hover:bg-[var(--gold-bright)] shadow-md shadow-[var(--saffron)]/20"
              }
              ${isProcessing ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {/* Pulse ring when recording */}
            {isRecording && (
              <span className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" />
            )}
            {isProcessing ? (
              <Loader2
                className={`animate-spin ${compact ? "w-3.5 h-3.5" : "w-4.5 h-4.5"}`}
              />
            ) : (
              <Mic
                className={`relative z-10 ${compact ? "w-3.5 h-3.5" : "w-4.5 h-4.5"}`}
              />
            )}
          </button>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            type="submit"
            aria-label="Submit search"
            className={`
              relative flex-shrink-0 flex items-center justify-center z-10
              rounded-full transition-all duration-300
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-royal)]
              ${compact ? "w-8 h-8 ml-1" : "w-10 h-10 ml-2"}
              bg-[var(--saffron)] text-[var(--maroon-black)] hover:bg-[var(--gold-bright)] shadow-md shadow-[var(--saffron)]/20
            `}
          >
            <Send className={`relative z-10 ${compact ? "w-3.5 h-3.5" : "w-4 h-4"} ml-0.5`} />
          </motion.button>
        )}
      </div>

      {/* Recording status text */}
      {(isRecording || isProcessing) && (
        <p
          className={`text-center mt-3 text-xs font-body tracking-wide ${
            isRecording
              ? "text-red-400"
              : "text-[var(--gold-bright)]"
          }`}
        >
          {isRecording ? "Listening… tap mic to stop" : "Processing…"}
        </p>
      )}
    </motion.form>
  );
}
