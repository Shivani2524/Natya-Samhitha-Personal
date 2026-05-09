import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ChatSession, FilterState, VoiceState, SavedSloka, Sloka, ChatMessage } from "@/types";

interface AppState {
  // Chat Sessions
  sessions: Record<string, ChatSession>;
  activeSessionId: string | null;
  createSession: (id: string, title: string) => void;
  addMessageToSession: (sessionId: string, message: ChatMessage) => void;
  updateMessageInSession: (sessionId: string, messageId: string, updates: Partial<ChatMessage>) => void;
  setActiveSession: (id: string | null) => void;
  deleteSession: (id: string) => void;
  clearAllSessions: () => void;

  // Filters
  filters: FilterState;
  toggleFilter: (filter: keyof FilterState) => void;
  resetFilters: () => void;

  // Voice
  voiceState: VoiceState;
  setVoiceState: (state: VoiceState) => void;

  // Offline
  isOffline: boolean;
  setOffline: (offline: boolean) => void;

  // Sound
  soundEnabled: boolean;
  toggleSound: () => void;

  // Saved Slokas
  savedSlokas: SavedSloka[];
  saveSloka: (sloka: Sloka) => void;
  removeSloka: (id: string) => void;

  // Sidebar / Dashboard
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Chat Sessions
      sessions: {},
      activeSessionId: null,
      
      createSession: (id: string, title: string) => {
        set((state) => ({
          sessions: {
            ...state.sessions,
            [id]: {
              id,
              title,
              messages: [],
              updatedAt: Date.now(),
            },
          },
          activeSessionId: id,
        }));
      },
      
      addMessageToSession: (sessionId: string, message: ChatMessage) => {
        set((state) => {
          const session = state.sessions[sessionId];
          if (!session) return state;
          return {
            sessions: {
              ...state.sessions,
              [sessionId]: {
                ...session,
                messages: [...session.messages, message],
                updatedAt: Date.now(),
              },
            },
          };
        });
      },

      updateMessageInSession: (sessionId: string, messageId: string, updates: Partial<ChatMessage>) => {
        set((state) => {
          const session = state.sessions[sessionId];
          if (!session) return state;
          return {
            sessions: {
              ...state.sessions,
              [sessionId]: {
                ...session,
                messages: session.messages.map((m) => 
                  m.id === messageId ? { ...m, ...updates } : m
                ),
                updatedAt: Date.now(),
              },
            },
          };
        });
      },

      setActiveSession: (id: string | null) => set({ activeSessionId: id }),
      
      deleteSession: (id: string) => {
        set((state) => {
          const newSessions = { ...state.sessions };
          delete newSessions[id];
          return {
            sessions: newSessions,
            activeSessionId: state.activeSessionId === id ? null : state.activeSessionId,
          };
        });
      },

      clearAllSessions: () => set({ sessions: {}, activeSessionId: null }),

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

      // Sound
      soundEnabled: true,
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      // Saved Slokas
      savedSlokas: [],
      saveSloka: (sloka: Sloka) => {
        const existing = get().savedSlokas;
        if (existing.find((s) => s.id === sloka.id)) return;
        set({
          savedSlokas: [
            { ...sloka, savedAt: Date.now() },
            ...existing,
          ],
        });
      },
      removeSloka: (id: string) =>
        set((state) => ({
          savedSlokas: state.savedSlokas.filter((s) => s.id !== id),
        })),

      // Sidebar / Dashboard
      sidebarOpen: true, // Default open on desktop
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
    }),
    {
      name: "natya-samhitha-store",
      partialize: (state) => ({
        sessions: state.sessions,
        soundEnabled: state.soundEnabled,
        savedSlokas: state.savedSlokas,
      }),
    }
  )
);
