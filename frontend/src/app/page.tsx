"use client";

import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/hero/HeroSection";
import { SearchBar } from "@/components/search/SearchBar";
import { TopicChips } from "@/components/search/TopicChips";
import { useAppStore } from "@/lib/store";

export default function HomePage() {
  const router = useRouter();
  const addRecentSearch = useAppStore((s) => s.addRecentSearch);

  const handleSearchNavigation = (query: string) => {
    const sessionId = Date.now().toString();
    useAppStore.getState().createNewSession(sessionId, query);
    router.push(`/results?sessionId=${sessionId}&q=${encodeURIComponent(query)}`);
  };

  return (
    <HeroSection
      chips={<TopicChips onSuggestionTap={handleSearchNavigation} />}
    >
      <SearchBar autoFocus onVoiceResult={handleSearchNavigation} onSubmitQuery={handleSearchNavigation} />
    </HeroSection>
  );
}
