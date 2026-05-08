"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookX, HelpCircle, ThumbsUp, ThumbsDown } from "lucide-react";
import { Header } from "@/components/header";
import { SearchBar } from "@/components/search-bar";
import { ResultCard } from "@/components/result-card";
import { ResultSkeleton } from "@/components/result-skeleton";
import { useStreamingSearch } from "@/hooks/use-streaming-search";
import { useSound } from "@/hooks/use-sound";
import { SuggestionChips } from "@/components/suggestion-chips";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { submitFeedback } from "@/lib/api";
import ReactMarkdown from "react-markdown";

function ResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { data, isLoading, isError, streamingExplanation } = useStreamingSearch(query);
  const { play: playChime } = useSound();
  const hasPlayedRef = useRef(false);
  const router = useRouter();
  const addRecentSearch = useAppStore((s) => s.addRecentSearch);
  const [feedbackGiven, setFeedbackGiven] = useState<1 | -1 | null>(null);

  // Determine what to display based on streamed or fetched data
  const explanation = data?.explanation || streamingExplanation;
  const results = data?.shlokas || [];
  const hasResults = results.length > 0;

  // Play chime once when results load successfully
  useEffect(() => {
    if (!isLoading && !isError && hasResults && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      playChime();
    }
    if (isLoading) {
      hasPlayedRef.current = false;
      setFeedbackGiven(null);
    }
  }, [isLoading, isError, hasResults, playChime]);

  const handleRelatedTopicTap = (topic: string) => {
    addRecentSearch(topic);
    router.push(`/results?q=${encodeURIComponent(topic)}`);
  };

  const handleFeedback = async (value: 1 | -1) => {
    if (!data?.query_id || feedbackGiven !== null) return;
    setFeedbackGiven(value);
    try {
      await submitFeedback(data.query_id, value);
    } catch (err) {
      console.error("Failed to submit feedback", err);
      setFeedbackGiven(null); // revert on error
    }
  };

  return (
    <div className="relative flex-1 flex flex-col min-h-screen overflow-hidden">
      {/* Nataraja background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <img
          src="/nataraja-bg.png"
          alt=""
          className="w-[708px] h-[708px] object-contain opacity-[0.06]"
          draggable={false}
        />
      </div>

      <Header showBack />

      {/* Compact search + active query */}
      <div className="px-4 pt-4 pb-2 space-y-4">
        <SearchBar defaultValue={query} compact />

        {/* Active query label */}
        {query && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-1 px-1"
          >
            <p className="text-xl font-serif text-stone-800 tracking-tight leading-snug">
              &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-stone-400 font-medium tracking-wide uppercase">
              Based on Natya Shastra
            </p>
          </motion.div>
        )}
      </div>

      {/* Results area */}
      <div className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
        {isLoading && !explanation && (
          <div className="space-y-4">
            <p className="text-sm text-stone-500 italic px-1">Searching relevant references...</p>
            <ResultSkeleton />
          </div>
        )}

        {isError && (
          <EmptyState
            icon={<BookX className="w-10 h-10 text-stone-300" />}
            title="Something went wrong"
            message="Please try your search again."
          />
        )}

        {!isLoading && !isError && !hasResults && !explanation && (
          <EmptyState
            icon={<HelpCircle className="w-12 h-12 text-stone-300 mb-2" />}
            title="No relevant reference found in Natya Shastra."
            message="Try rephrasing your question."
          />
        )}

        {/* Streaming / Overarching Explanation */}
        <AnimatePresence>
          {explanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-sm p-5 rounded-2xl border border-amber-200/50 shadow-sm shadow-amber-100/30"
            >
              <div className="explanation-content">
                <ReactMarkdown>{explanation}</ReactMarkdown>
                {isLoading && (
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="inline-block ml-1 w-2 h-4 bg-amber-400 align-middle rounded-sm"
                  />
                )}
              </div>
              
              {/* Feedback Widget at the bottom of the explanation */}
              {!isLoading && data?.query_id && (
                <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-amber-100/50">
                  <span className="text-xs text-stone-400 mr-auto font-medium">Was this answer helpful?</span>
                  <button
                    type="button"
                    onClick={() => handleFeedback(1)}
                    disabled={feedbackGiven !== null}
                    className={`
                      p-2 rounded-lg transition-all duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                      ${feedbackGiven === 1 ? "bg-green-100 text-green-700" : "text-stone-400 hover:bg-stone-100 hover:text-stone-600 disabled:opacity-50"}
                    `}
                    aria-label="Helpful"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFeedback(-1)}
                    disabled={feedbackGiven !== null}
                    className={`
                      p-2 rounded-lg transition-all duration-200
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
                      ${feedbackGiven === -1 ? "bg-red-100 text-red-600" : "text-stone-400 hover:bg-stone-100 hover:text-stone-600 disabled:opacity-50"}
                    `}
                    aria-label="Not helpful"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shlokas List */}
        {hasResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold text-stone-400 uppercase tracking-widest pl-1">
              Source Shlokas
            </h3>
            {results.map((shloka, index) => (
              <ResultCard key={shloka.id} shloka={shloka} index={index} />
            ))}
          </motion.div>
        )}

        {/* Related Topics / Questions */}
        {!isLoading && (
          <div className="mt-12 mb-8 flex flex-col items-center">
            <p className="text-xs text-stone-400 font-medium tracking-wider uppercase mb-4">
              Related Topics
            </p>
            <SuggestionChips onSuggestionTap={handleRelatedTopicTap} />
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({
  icon,
  title,
  message,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 text-center px-4"
    >
      <div className="mb-4">{icon}</div>
      <h2 className="font-serif text-lg text-stone-700 mb-2 leading-tight">{title}</h2>
      <p className="text-sm text-stone-500">{message}</p>
    </motion.div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex flex-col min-h-screen">
          <Header showBack />
          <div className="px-4 pt-4">
            <ResultSkeleton />
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
