"use client";

import { useState, useCallback } from "react";
import type { QueryResponse, Sloka, ChatMessage } from "@/types";
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
    // Use the current session's messages from the store to avoid stale closures
    const currentSession = useAppStore.getState().sessions[currentSessionId];
    const currentMessages = currentSession ? currentSession.messages : [];
    
    const currentHistory = currentMessages.map((m) => ({
      role: m.role,
      content: m.content,
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
    };

    const { addMessageToSession, updateMessageInSession } = useAppStore.getState();

    addMessageToSession(currentSessionId, userMessage);
    addMessageToSession(currentSessionId, assistantMessage);
    setIsTyping(true);

    try {
      const streamPromise = fetch("/api/v1/query/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, history: currentHistory }),
      });

      const dataPromise = fetch("/api/v1/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, history: currentHistory }),
      });

      streamPromise
        .then(async (res) => {
          if (!res.ok || !res.body) return;
          const reader = res.body.getReader();
          const decoder = new TextDecoder("utf-8");
          let done = false;

          let currentContent = "";
          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
              const chunk = decoder.decode(value, { stream: true });
              currentContent += chunk;
              updateMessageInSession(currentSessionId, assistantMessageId, { content: currentContent });
            }
          }
        })
        .catch((err) => console.error("Stream failed", err));

      const res = await dataPromise;
      if (res.ok) {
        const json: QueryResponse = await res.json();
        updateMessageInSession(currentSessionId, assistantMessageId, {
          slokas: json.slokas,
          isLoading: false,
          queryId: json.query_id,
        });
      } else {
        updateMessageInSession(currentSessionId, assistantMessageId, { isLoading: false });
      }
    } catch (error) {
      console.error("Chat error:", error);
      updateMessageInSession(currentSessionId, assistantMessageId, {
        isLoading: false,
        content: "I apologize, but I encountered an error communicating with the Shastra.",
      });
    } finally {
      setIsTyping(false);
    }
  }, []);

  return { messages, sendMessage, isTyping };
}
