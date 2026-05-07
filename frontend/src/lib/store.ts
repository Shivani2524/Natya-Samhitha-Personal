import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RecentSearch, FilterState, VoiceState } from "@/types";

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
    }),
    {
      name: "natya-samhitha-store",
      partialize: (state) => ({
        recentSearches: state.recentSearches,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
