"use client";

import { Mic, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVoice } from "@/hooks/use-voice";

interface VoiceButtonProps {
  onResult: (transcript: string) => void;
}

export function VoiceButton({ onResult }: VoiceButtonProps) {
  const { voiceState, startRecording, stopRecording } = useVoice(onResult);

  const isRecording = voiceState === "recording";
  const isProcessing = voiceState === "processing";

  return (
    <div className="flex flex-col items-center gap-3">
      <motion.button
        type="button"
        onClick={isRecording ? stopRecording : startRecording}
        disabled={isProcessing}
        whileTap={{ scale: 0.92 }}
        className={`
          relative flex items-center justify-center
          w-16 h-16 rounded-full
          transition-colors duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50
          ${
            isRecording
              ? "bg-red-500 text-white shadow-lg shadow-red-200"
              : "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md shadow-amber-200/50"
          }
          ${isProcessing ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        `}
        aria-label={
          isRecording
            ? "Stop voice recording"
            : "Start voice search"
        }
      >
        {/* Pulse rings when recording */}
        <AnimatePresence>
          {isRecording && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full bg-red-400/30"
                initial={{ scale: 1, opacity: 0.6 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <motion.span
                className="absolute inset-0 rounded-full bg-red-400/20"
                initial={{ scale: 1, opacity: 0.4 }}
                animate={{ scale: 2.2, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.4,
                }}
              />
            </>
          )}
        </AnimatePresence>

        {isProcessing ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <Mic className="w-6 h-6 relative z-10" />
        )}
      </motion.button>

      {/* Status text */}
      <AnimatePresence mode="wait">
        {isRecording && (
          <motion.p
            key="recording"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-500 font-medium"
          >
            Listening… tap to stop
          </motion.p>
        )}
        {isProcessing && (
          <motion.p
            key="processing"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-amber-600 font-medium"
          >
            Processing…
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
