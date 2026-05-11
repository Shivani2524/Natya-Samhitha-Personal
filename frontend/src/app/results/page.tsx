"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";
import { ResultCard } from "@/components/results/ResultCard";
import { RasaFeedback } from "@/components/results/RasaFeedback";
import { GhungrooSeparator } from "@/components/ornaments/GhungrooSeparator";
import { useChat } from "@/hooks/use-chat";
import { useAppStore } from "@/lib/store";
import { submitFeedback } from "@/lib/api";
import { parseAIResponse } from "@/lib/parseResult";
import type { ChatMessage } from "@/types";

function ChatMessageBubble({ msg }: { msg: ChatMessage }) {
  if (msg.role === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-end mb-6"
      >
        <div
          className="
            px-5 py-3 rounded-2xl rounded-tr-sm
            border border-[var(--gold-royal)]/50
            bg-[var(--glass-gold)]
            font-body text-[0.95rem]
            text-[var(--gold-bright)]
            shadow-lg shadow-[var(--shadow-warm)]
            max-w-[85%] sm:max-w-[70%]
            flex gap-3 items-start
          "
        >
          <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start mb-8 w-full"
    >
      <div className="relative w-full max-w-4xl group">
        <div
          className="
            w-full
            glass-card rounded-2xl p-6 sm:p-8
            border border-[var(--gold-royal)]/20
            shadow-xl shadow-[var(--shadow-warm)]
          "
        >
          {/* 1. Source Shlokas on TOP */}
          {msg.slokas && msg.slokas.length > 0 && (
            <div className="mb-8 space-y-6">
              <h3 className="font-nav text-[0.65rem] tracking-[0.15em] uppercase text-[var(--gold-royal)]/70">
                Source Shlokas
              </h3>
              {msg.slokas.map((shloka, index) => (
                <div key={shloka.id || index}>
                  {index > 0 && <GhungrooSeparator className="mb-6" />}
                  <ResultCard sloka={shloka} index={index} />
                </div>
              ))}
              <GhungrooSeparator className="mt-8 opacity-50" />
            </div>
          )}

          {/* 2. AI Explanation */}
          <div>
            <h3 className="font-nav text-[0.65rem] tracking-[0.15em] uppercase text-[var(--gold-royal)]/70 mb-4">
              Explanation
            </h3>
            <div
              className="ai-response font-body text-[0.95rem] leading-relaxed text-[var(--text-primary)]"
              dangerouslySetInnerHTML={{ __html: parseAIResponse(msg.content) }}
            />
            {msg.isLoading && (
              <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block mt-2 w-2 h-5 bg-[var(--gold-bright)] align-middle rounded-sm"
              />
            )}
          </div>

          {/* 3. Feedback at the bottom */}
          {!msg.isLoading && msg.queryId && (
            <div className="mt-8 pt-6 border-t border-[var(--gold-royal)]/15 flex justify-end">
              <RasaFeedback
                queryId={msg.queryId}
                onSubmit={(qid, fb) => submitFeedback(qid, fb as 1 | -1)}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ChatUI() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const initialQuery = searchParams.get("q");
  const router = useRouter();

  const { messages, sendMessage, isTyping } = useChat();
  const { setActiveSessionId, sessions } = useAppStore();
  const hasSentInitialRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Set active session from URL
  useEffect(() => {
    if (sessionId) {
      setActiveSessionId(sessionId);
    }
  }, [sessionId, setActiveSessionId]);

  // Handle initial query if coming from home page
  useEffect(() => {
    if (sessionId && initialQuery && !hasSentInitialRef.current) {
      hasSentInitialRef.current = true;
      const session = useAppStore.getState().sessions[sessionId];
      
      // Only send if the session is brand new and has no messages yet
      if (session && session.messages.length === 0) {
        sendMessage(initialQuery, sessionId);
      }
      
      // Clean up the URL to remove the 'q' parameter so it doesn't re-trigger on refresh
      window.history.replaceState({}, "", `/results?sessionId=${sessionId}`);
    }
  }, [sessionId, initialQuery, sendMessage]);

  // Auto-scroll to bottom when messages change or typing
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isTyping]);

  return (
    <div className="relative flex-1 flex flex-col min-h-screen">
      {/* Nataraja background watermark */}
      <div
        className="fixed inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <img
          src="/nataraja-bg.png"
          alt=""
          className="w-[708px] h-[708px] object-contain opacity-[0.04]"
          draggable={false}
        />
      </div>

      {/* Chat Messages */}
      <div className="relative z-10 flex-1 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pt-8 pb-4 overflow-y-auto">
        {messages.length === 0 && !isTyping && (
          <div className="flex justify-center items-center h-full opacity-50">
            <p className="font-nav text-sm tracking-widest text-[var(--gold-royal)]">
              Waiting for inquiry...
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <ChatMessageBubble key={msg.id} msg={msg} />
        ))}

        <div ref={bottomRef} className="h-24" />
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-50 pointer-events-none flex justify-center w-full px-4">
        <div className="w-full max-w-sm pointer-events-auto">
          <div className="bg-[var(--maroon-black)] border border-[var(--gold-royal)]/20 p-1.5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
            <SearchBar
              compact
              autoFocus
              onVoiceResult={(query) => {
                if (query.trim() && sessionId && !isTyping) {
                  sendMessage(query, sessionId);
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex flex-col min-h-screen items-center justify-center">
          <p className="font-nav text-sm tracking-widest text-[var(--gold-royal)] animate-pulse">
            Loading Sacred Space...
          </p>
        </div>
      }
    >
      <ChatUI />
    </Suspense>
  );
}
