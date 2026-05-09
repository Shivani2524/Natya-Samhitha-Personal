"use client";

import { useRouter } from "next/navigation";
import { HeroSection } from "@/components/hero/HeroSection";
import { SearchBar } from "@/components/search/SearchBar";
import { TopicChips } from "@/components/search/TopicChips";
import { useAppStore } from "@/lib/store";

export default function HomePage() {
  const router = useRouter();

  const handleSearchNavigation = (query: string) => {
    router.push(`/results?q=${encodeURIComponent(query)}`);
  };

  return (
    <HeroSection
      chips={
        <div className="flex flex-col items-center w-full">
          <p className="text-base font-nav tracking-[0.2em] text-[var(--gold-bright)]/70 text-center mb-6">
            Or explore a topic
          </p>
          <TopicChips onSuggestionTap={handleSearchNavigation} />
        </div>
      }
    >
      <SearchBar autoFocus onVoiceResult={handleSearchNavigation} />
    </HeroSection>
  );
}
