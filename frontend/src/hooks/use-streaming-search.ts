"use client";

import { useState, useEffect } from "react";
import type { QueryResponse, Shloka } from "@/types";

export function useStreamingSearch(query: string) {
  const [data, setData] = useState<QueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [streamingExplanation, setStreamingExplanation] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setData(null);
      setStreamingExplanation("");
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    let abortController = new AbortController();

    const fetchStreamAndData = async () => {
      setIsLoading(true);
      setIsError(false);
      setStreamingExplanation("");
      setData(null);

      try {
        // Parallel requests: one for the stream (if SSE is supported) and one for structured data.
        // Or if the streaming endpoint streams EVERYTHING, we parse it.
        // Assuming /api/v1/query/stream just streams the explanation string.
        
        const streamPromise = fetch("/api/v1/query/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
          signal: abortController.signal,
        });

        const dataPromise = fetch("/api/v1/query", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, history: [] }),
          signal: abortController.signal,
        });

        // Handle streaming response
        streamPromise
          .then(async (res) => {
            if (!res.ok || !res.body) return;
            const reader = res.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let done = false;

            while (!done) {
              const { value, done: doneReading } = await reader.read();
              done = doneReading;
              if (value) {
                const chunk = decoder.decode(value, { stream: true });
                if (isMounted) {
                  setStreamingExplanation((prev) => prev + chunk);
                }
              }
            }
          })
          .catch((err) => {
            if (err.name !== "AbortError") console.error("Stream failed", err);
          });

        // Handle structured data response
        const res = await dataPromise;
        if (!res.ok) throw new Error("Failed to fetch query results");
        const json: QueryResponse = await res.json();
        
        if (isMounted) {
          setData(json);
        }
      } catch (err: any) {
        if (err.name !== "AbortError" && isMounted) {
          setIsError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchStreamAndData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [query]);

  return { data, isLoading, isError, streamingExplanation };
}
