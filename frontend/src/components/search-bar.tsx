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

export function SearchBar({
  defaultValue = "",
  compact = false,
  autoFocus = false,
  onVoiceResult,
}: SearchBarProps) {
  const router = useRouter();
  const addRecentSearch = useAppStore((s) => s.addRecentSearch);
  const inputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit } = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: defaultValue },
  });

  const { play: playChime } = useSound();

  const onSubmit = (data: SearchForm) => {
    playChime();
    addRecentSearch(data.query);
    router.push(`/results?q=${encodeURIComponent(data.query)}`);
  };

  const handleVoiceResult = useCallback(
    (transcript: string) => {
      if (onVoiceResult) {
        onVoiceResult(transcript);
      } else {
        addRecentSearch(transcript);
        router.push(`/results?q=${encodeURIComponent(transcript)}`);
      }
    },
    [onVoiceResult, addRecentSearch, router]
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
      className={`relative w-full ${compact ? "max-w-md" : "max-w-lg"}`}
    >
      <div
        className={`
          relative flex items-center rounded-2xl
          bg-white/80 backdrop-blur-sm
          border border-amber-200/60
          shadow-sm
          transition-all duration-300
          focus-within:border-amber-400/80
          focus-within:shadow-md focus-within:shadow-amber-100/50
          ${compact ? "px-3 py-2" : "px-4 py-3"}
        `}
      >
        <Search
          className={`text-amber-600/60 flex-shrink-0 ${
            compact ? "w-4 h-4" : "w-5 h-5"
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
          placeholder="Ask anything about Natya Shastra..."
          autoComplete="off"
          aria-label="Ask anything about Natya Shastra"
          className={`
            w-full bg-transparent outline-none
            text-stone-800 placeholder:text-stone-400
            font-sans
            ${compact ? "ml-2 text-sm" : "ml-3 text-base"}
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
            focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
            ${compact ? "w-8 h-8 ml-1" : "w-9 h-9 ml-2"}
            ${
              isRecording
                ? "bg-red-500 text-white shadow-sm shadow-red-200"
                : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
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
              className={`animate-spin ${compact ? "w-3.5 h-3.5" : "w-4 h-4"}`}
            />
          ) : (
            <Mic
              className={`relative z-10 ${compact ? "w-3.5 h-3.5" : "w-4 h-4"}`}
            />
          )}
        </button>
      </div>

      {/* Recording status text */}
      {(isRecording || isProcessing) && (
        <p
          className={`text-center mt-2 text-xs font-medium ${
            isRecording ? "text-red-500" : "text-amber-600"
          }`}
        >
          {isRecording ? "Listening… tap mic to stop" : "Processing…"}
        </p>
      )}
    </motion.form>
  );
}
