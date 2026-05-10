"use client";

import { useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Mic, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
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
}

/**
 * Sacred Portal Search Bar
 * Ornamental framed search with diya glow focus state.
 */
export function SearchBar({
  defaultValue = "",
  compact = false,
  autoFocus = false,
  onVoiceResult,
}: SearchBarProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: defaultValue },
  });

  const { play: playChime } = useSound();

  const onSubmit = (data: SearchForm) => {
    playChime();
    router.push(`/results?q=${encodeURIComponent(data.query)}`);
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
      className={`relative w-full ${compact ? "max-w-md" : "max-w-[680px]"} mx-auto`}
    >
      <div
        className={`
          relative flex items-center
          rounded-2xl overflow-visible
          transition-all duration-400
          ${
            compact
              ? "px-3 py-2 glass-card"
              : `px-5 py-3.5 bg-[var(--cream-warm)]
                 border-2 border-[var(--gold-royal)]/60
                 shadow-lg shadow-[var(--shadow-warm)]
                 focus-within:border-[var(--gold-bright)]
                 focus-within:shadow-[0_0_0_4px_var(--glow-gold),0_0_32px_var(--glow-diya)]`
          }
        `}
      >
        {/* Ornamental corners (only in non-compact mode) */}
        {!compact && <RangoliBorder />}

        <Search
          className={`flex-shrink-0 ${
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
            w-full bg-transparent outline-none
            font-body
            ${
              compact
                ? "ml-2 text-sm text-[var(--text-cream)] placeholder:text-[var(--text-cream)]/30"
                : "ml-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-muted-gold)]/60"
            }
          `}
        />



        {/* Voice mic button */}
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          aria-label={isRecording ? "Stop voice recording" : "Start voice search"}
          className={`
            relative flex-shrink-0 flex items-center justify-center
            rounded-full transition-all duration-300
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-royal)]
            ${compact ? "w-8 h-8 ml-1" : "w-10 h-10 ml-2"}
            ${
              isRecording
                ? "bg-red-600 text-white shadow-lg shadow-red-500/30"
                : compact
                  ? "text-[var(--gold-royal)]/60 hover:text-[var(--gold-bright)] hover:bg-[var(--glass-gold)]"
                  : "bg-[var(--glass-gold)] text-[var(--bronze-temple)] hover:bg-[var(--gold-royal)]/20 hover:text-[var(--gold-royal)]"
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
