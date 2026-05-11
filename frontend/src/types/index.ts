export interface Shloka {
  id: string;
  sanskrit?: string;
  shloka_iast?: string;
  transliteration?: string;
  translation?: string;
  explanation?: string;
  application?: string;
  chapter?: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface QueryResponse {
  query_id: string;
  shlokas: Shloka[];
  explanation: string;
  image_refs: string[];
}

export type ShlokaCategory = "rasa" | "mudra" | "abhinaya" | "general";

export interface SearchResult {
  query: string;
  results: Shloka[];
  totalCount: number;
}

export interface FilterState {
  rasa: boolean;
  mudra: boolean;
  chapter: boolean;
}

export interface RecentSearch {
  query: string;
  timestamp: number;
  category?: ShlokaCategory;
}

export type VoiceState = "idle" | "recording" | "processing";

/** Alias — teammate's components use `Sloka`, backend uses `Shloka` */
export type Sloka = Shloka;

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
  slokas?: Shloka[];
  queryId?: string;
}
