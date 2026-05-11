"use client";

import { useCallback, useRef, useEffect } from "react";
import { useAppStore } from "@/lib/store";

/* eslint-disable @typescript-eslint/no-explicit-any */
type SpeechRecognitionInstance = any;

export function useVoice(onResult: (transcript: string) => void) {
  const { voiceState, setVoiceState } = useAppStore();
  const recognitionRef = useRef<SpeechRecognitionInstance>(null);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startRecording = useCallback(() => {
    const SR =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SR) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onstart = () => setVoiceState("recording");

    recognition.onresult = (event: any) => {
      setVoiceState("processing");
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      setTimeout(() => setVoiceState("idle"), 500);
    };

    recognition.onerror = () => {
      setVoiceState("idle");
    };

    recognition.onend = () => {
      if (useAppStore.getState().voiceState === "recording") {
        setVoiceState("idle");
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  }, [onResult, setVoiceState]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return { voiceState, startRecording, stopRecording };
}
