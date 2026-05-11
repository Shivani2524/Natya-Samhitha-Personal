"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { QueryResponse, Shloka, ChatMessage } from "@/types";
import { useAppStore } from "@/lib/store";

export function useChat() {
  const { activeSessionId, sessions, addMessageToSession, updateMessageInSession } = useAppStore();
  const [isTyping, setIsTyping] = useState(false);

  const activeSession = activeSessionId ? sessions[activeSessionId] : null;
  const messages = activeSession ? activeSession.messages : [];

  const sendMessage = useCallback(async (query: string, overrideSessionId?: string) => {
    const currentSessionId = overrideSessionId || useAppStore.getState().activeSessionId;
    if (!query.trim() || !currentSessionId) return;

    // Snapshot history before adding the new messages
    const currentSession = useAppStore.getState().sessions[currentSessionId];
    const currentMessages = currentSession ? currentSession.messages : [];
    
    // Convert history for API (skip messages with no content)
    const currentHistory = currentMessages
      .filter((m) => m.content || m.role === "user")
      .map((m) => ({
        role: m.role,
        content: m.role === "user" ? m.content : m.content || "",
      }));

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: query,
    };

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      isLoading: true,
      slokas: [],
    };

    const store = useAppStore.getState();
    store.addMessageToSession(currentSessionId, userMessage);
    store.addMessageToSession(currentSessionId, assistantMessage);
    setIsTyping(true);

    try {
      const abortController = new AbortController();
      
      const streamPromise = fetch("/api/v1/query/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, history: currentHistory }),
        signal: abortController.signal,
      });

      const dataPromise = fetch("/api/v1/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, history: currentHistory }),
        signal: abortController.signal,
      });

      // Handle streaming response — parse the protocol
      streamPromise
        .then(async (res) => {
          if (!res.ok || !res.body) return;
          const reader = res.body.getReader();
          const decoder = new TextDecoder("utf-8");
          let done = false;
          let buffer = "";
          let phase: "init" | "shlokas" | "explanation" = "init";
          let currentContent = "";

          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
              buffer += decoder.decode(value, { stream: true });

              // Check for phase transitions
              if (phase === "init" && buffer.includes("---SHLOKAS---\n")) {
                buffer = buffer.split("---SHLOKAS---\n")[1] || "";
                phase = "shlokas";
              }

              if (phase === "shlokas" && buffer.includes("\n---EXPLANATION---\n")) {
                const parts = buffer.split("\n---EXPLANATION---\n");
                const shlokasJson = parts[0];
                try {
                  const streamedShlokas: Shloka[] = JSON.parse(shlokasJson);
                  // Deduplicate based on text
                  const seen = new Set();
                  const uniqueShlokas = streamedShlokas.filter((s) => {
                    const text = (s.shloka_iast || s.sanskrit || "").trim();
                    if (!text) return true;
                    if (seen.has(text)) return false;
                    seen.add(text);
                    return true;
                  });

                  // Update slokas in store
                  useAppStore.getState().updateMessageInSession(currentSessionId, assistantMessageId, {
                    slokas: uniqueShlokas,
                  });
                } catch (e) {
                  console.error("Failed to parse streamed shlokas:", e);
                }
                buffer = parts[1] || "";
                phase = "explanation";
              }

              // Stream explanation text as it arrives
              if (phase === "explanation" && buffer.length > 0) {
                currentContent += buffer;
                useAppStore.getState().updateMessageInSession(currentSessionId, assistantMessageId, {
                  content: currentContent,
                });
                buffer = "";
              }
            }
          }

          // Flush any remaining buffer
          if (phase === "explanation" && buffer.length > 0) {
            currentContent += buffer;
            useAppStore.getState().updateMessageInSession(currentSessionId, assistantMessageId, {
              content: currentContent,
            });
          }
        })
        .catch((err) => {
          if (err.name !== "AbortError") console.error("Stream failed", err);
        });

      // Handle structured data response (provides query_id for feedback)
      const res = await dataPromise;
      if (res.ok) {
        const json: QueryResponse = await res.json();
        
        const seen = new Set();
        const uniqueJsonShlokas = (json.shlokas || []).filter((s) => {
          const text = (s.shloka_iast || s.sanskrit || "").trim();
          if (!text) return true;
          if (seen.has(text)) return false;
          seen.add(text);
          return true;
        });

        // We check the current message to not overwrite slokas if already streamed perfectly,
        // but it's safe to update here to ensure we get everything + query_id.
        const currentMsg = useAppStore.getState().sessions[currentSessionId]?.messages.find(m => m.id === assistantMessageId);
        
        useAppStore.getState().updateMessageInSession(currentSessionId, assistantMessageId, {
          slokas: currentMsg?.slokas?.length ? currentMsg.slokas : uniqueJsonShlokas,
          content: json.explanation, // final exact explanation
          isLoading: false,
          queryId: json.query_id,
        });
      } else {
        useAppStore.getState().updateMessageInSession(currentSessionId, assistantMessageId, { isLoading: false });
      }
    } catch (error) {
      console.error("Chat error:", error);
      useAppStore.getState().updateMessageInSession(currentSessionId, assistantMessageId, {
        isLoading: false,
        content: "I apologize, but I encountered an error communicating with the Shastra.",
      });
    } finally {
      setIsTyping(false);
    }
  }, []);

  return { messages, sendMessage, isTyping };
}
