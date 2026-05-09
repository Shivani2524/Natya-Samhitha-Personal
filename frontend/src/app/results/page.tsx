"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ResultCard } from "@/components/results/ResultCard";
import { ResultSkeleton } from "@/components/results/ResultSkeleton";
import { RasaFeedback } from "@/components/results/RasaFeedback";
import { DiyaIcon } from "@/components/ui/DiyaIcon";
import { useSound } from "@/hooks/use-sound";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { submitFeedback } from "@/lib/api";
import { parseAIResponse } from "@/lib/parseResult";
import { useChat } from "@/hooks/use-chat";

function ChatContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const sessionIdParam = searchParams.get("sessionId");
  
  const { messages, sendMessage, isTyping } = useChat();
  const { play: playChime } = useSound();
  const router = useRouter();
  
  const { createSession, setActiveSession, activeSessionId } = useAppStore();

  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const hasInitialized = useRef(false);

  // Initialize Chat Session
  useEffect(() => {
    if (hasInitialized.current) return;
    
    if (sessionIdParam) {
      // Load existing session
      setActiveSession(sessionIdParam);
      hasInitialized.current = true;
    } else if (initialQuery) {
      // Create new session
      const newSessionId = Date.now().toString();
      createSession(newSessionId, initialQuery);
      hasInitialized.current = true;
      sendMessage(initialQuery, newSessionId);
      
      // Update URL without reloading
      const url = new URL(window.location.href);
      url.searchParams.delete("q");
      url.searchParams.set("sessionId", newSessionId);
      window.history.replaceState({}, "", url.toString());
    }
  }, [initialQuery, sessionIdParam, createSession, setActiveSession, sendMessage]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleRelatedTopicTap = (topic: string) => {
    sendMessage(topic);
  };

  const handleFeedback = async (queryId: string, value: number) => {
    await submitFeedback(queryId, value as 1 | -1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping || !activeSessionId) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="relative flex-1 flex flex-col h-[100dvh] pt-4">
      {/* Subtle background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)", zIndex: -1 }}
      />

      {/* Transparent Header */}
      <div className="shrink-0 px-4 sm:px-6 lg:px-8 py-4 sm:pt-6 pb-2 max-w-4xl lg:max-w-6xl mx-auto w-full z-10 flex items-center bg-transparent">
        <div className="w-12 shrink-0" /> {/* Spacer for floating toggle */}
        <Link
          href="/"
          className="
            inline-flex items-center gap-2 px-3 py-1.5 rounded-lg
            text-[var(--text-cream)]/50 hover:text-[var(--gold-bright)]
            hover:bg-[var(--glass-gold)]
            transition-all duration-200
            text-sm font-nav tracking-[0.1em]
            focus:outline-none
          "
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 max-w-4xl lg:max-w-6xl mx-auto w-full scrollbar-hide">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              {msg.role === "user" ? (
                <div className="max-w-[85%] sm:max-w-[75%] bg-[var(--glass-gold)] border border-[var(--gold-royal)]/30 px-5 py-3 rounded-2xl rounded-tr-sm text-[var(--gold-bright)] font-body text-base shadow-lg shadow-[var(--shadow-warm)]">
                  <p className="italic">&ldquo;{msg.content}&rdquo;</p>
                </div>
              ) : (
                <div className="w-full relative manuscript-page rounded-2xl p-5 sm:p-6 shadow-xl">
                  {/* AI Explanation Content */}
                  <div 
                    className="result-text"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      const suggestion = target.closest('.next-suggestion');
                      if (suggestion) {
                        const topic = suggestion.getAttribute('data-topic');
                        if (topic) handleRelatedTopicTap(topic);
                      }
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: parseAIResponse(msg.content) }} />
                    {msg.isLoading && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="inline-block ml-2 w-5 h-5 align-middle"
                      >
                        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_3px_rgba(255,255,255,0.4)]">
                          {[0, 72, 144, 216, 288].map((angle) => (
                            <path
                              key={angle}
                              d="M50 50 C60 40 70 50 50 20 C30 50 40 40 50 50"
                              transform={`rotate(${angle} 50 50)`}
                              fill="white"
                              className="opacity-80"
                            />
                          ))}
                          <circle cx="50" cy="50" r="5" fill="var(--gold-bright)" />
                        </svg>
                      </motion.div>
                    )}
                  </div>

                  {/* Feedback */}
                  {!msg.isLoading && msg.queryId && (
                    <RasaFeedback
                      queryId={msg.queryId}
                      onSubmit={handleFeedback}
                    />
                  )}

                  {/* Slokas rendered inline if returned */}
                  {msg.slokas && msg.slokas.length > 0 && (
                    <div className="mt-8 space-y-5 border-t border-[var(--gold-royal)]/20 pt-6">
                      <h3 className="text-[0.65rem] font-nav tracking-[0.15em] text-[var(--gold-bright)]/50 pl-1">
                        SOURCE SLOKAS
                      </h3>
                      {msg.slokas.map((sloka, index) => (
                        <ResultCard key={sloka.id} sloka={sloka} index={index} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Dummy div to scroll to bottom */}
        <div ref={bottomRef} className="h-4" />
      </div>

      {/* Sticky Chat Input */}
      <div className="shrink-0 p-4 sm:p-6 bg-[var(--maroon-black)]/95 backdrop-blur-xl border-t border-[var(--gold-royal)]/20 z-10 w-full">
        <div className="max-w-4xl lg:max-w-6xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="
              flex items-center gap-2 p-2 rounded-2xl
              bg-[var(--glass-maroon)] border border-[var(--gold-royal)]/30
              focus-within:border-[var(--gold-bright)] focus-within:ring-1 focus-within:ring-[var(--gold-bright)]
              transition-all duration-300 shadow-xl
            "
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a follow-up inquiry..."
              disabled={isTyping}
              className="
                flex-1 bg-transparent border-none outline-none px-4 py-2
                text-[var(--text-cream)] font-body text-base placeholder:text-[var(--text-cream)]/30
                disabled:opacity-50
              "
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="
                p-2 rounded-xl bg-transparent
                hover:bg-[var(--glass-gold)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <DiyaIcon />
            </button>
          </form>
          <p className="text-center text-[0.6rem] font-nav tracking-[0.15em] text-[var(--gold-bright)]/40 mt-3">
            CONSULT THE NATYA SHASTRA
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center min-h-screen">
          <ResultSkeleton />
        </div>
      }
    >
      <ChatContent />
    </Suspense>
  );
}
