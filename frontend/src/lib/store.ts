import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RecentSearch, FilterState, VoiceState, ChatMessage } from "@/types";

export interface Session {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessage[];
}

interface AppState {
  // Recent searches
  recentSearches: RecentSearch[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  // Filters (deprecated, to be removed)
  filters: FilterState;
  toggleFilter: (filter: keyof FilterState) => void;
  resetFilters: () => void;

  // Voice
  voiceState: VoiceState;
  setVoiceState: (state: VoiceState) => void;

  // Offline
  isOffline: boolean;
  setOffline: (offline: boolean) => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Sound
  soundEnabled: boolean;
  toggleSound: () => void;

  // Sessions (for sidebar history)
  activeSessionId: string | null;
  setActiveSessionId: (id: string | null) => void;
  sessions: Record<string, Session>;
  createNewSession: (id: string, initialQuery: string) => void;
  addSession: (id: string, title: string) => void;
  removeSession: (id: string) => void;
  addMessageToSession: (sessionId: string, message: ChatMessage) => void;
  updateMessageInSession: (sessionId: string, messageId: string, updates: Partial<ChatMessage>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Recent searches
      recentSearches: [],
      addRecentSearch: (query: string) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        const existing = get().recentSearches.filter(
          (s) => s.query.toLowerCase() !== trimmed.toLowerCase()
        );
        set({
          recentSearches: [
            { query: trimmed, timestamp: Date.now() },
            ...existing,
          ].slice(0, 10),
        });
      },
      clearRecentSearches: () => set({ recentSearches: [] }),

      // Filters
      filters: { rasa: false, mudra: false, chapter: false },
      toggleFilter: (filter) =>
        set((state) => ({
          filters: { ...state.filters, [filter]: !state.filters[filter] },
        })),
      resetFilters: () =>
        set({ filters: { rasa: false, mudra: false, chapter: false } }),

      // Voice
      voiceState: "idle",
      setVoiceState: (voiceState) => set({ voiceState }),

      // Offline
      isOffline: false,
      setOffline: (isOffline) => set({ isOffline }),

      // Sidebar
      sidebarOpen: false,
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      // Sound
      soundEnabled: true,
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      // Sessions
      activeSessionId: null,
      setActiveSessionId: (id) => set({ activeSessionId: id }),
      sessions: {},
      createNewSession: (id: string, initialQuery: string) =>
        set((state) => ({
          activeSessionId: id,
          sessions: {
            ...state.sessions,
            [id]: { id, title: initialQuery, updatedAt: Date.now(), messages: [] },
          },
        })),
      addSession: (id: string, title: string) =>
        set((state) => ({
          sessions: {
            ...state.sessions,
            [id]: { id, title, updatedAt: Date.now(), messages: [] },
          },
        })),
      removeSession: (id: string) =>
        set((state) => {
          const { [id]: _, ...rest } = state.sessions;
          return { sessions: rest };
        }),
      addMessageToSession: (sessionId, message) =>
        set((state) => {
          const session = state.sessions[sessionId];
          if (!session) return state;
          return {
            sessions: {
              ...state.sessions,
              [sessionId]: {
                ...session,
                updatedAt: Date.now(),
                messages: [...session.messages, message],
              },
            },
          };
        }),
      updateMessageInSession: (sessionId, messageId, updates) =>
        set((state) => {
          const session = state.sessions[sessionId];
          if (!session) return state;
          return {
            sessions: {
              ...state.sessions,
              [sessionId]: {
                ...session,
                updatedAt: Date.now(),
                messages: session.messages.map((m) =>
                  m.id === messageId ? { ...m, ...updates } : m
                ),
              },
            },
          };
        }),
    }),
    {
      name: "natya-samhitha-store",
      partialize: (state) => ({
        recentSearches: state.recentSearches,
        soundEnabled: state.soundEnabled,
        sessions: state.sessions,
      }),
    }
  )
);
