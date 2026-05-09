export interface Sloka {
  id: string;
  sanskrit?: string;
  sloka_iast?: string;
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
  slokas: Sloka[];
  explanation: string;
  image_refs: string[];
}

export type SlokaCategory = "rasa" | "mudra" | "abhinaya" | "general";

export interface SearchResult {
  query: string;
  results: Sloka[];
  totalCount: number;
}

export interface FilterState {
  rasa: boolean;
  mudra: boolean;
  chapter: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  slokas?: Sloka[];
  isLoading?: boolean;
  queryId?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
}

export interface SavedSloka extends Sloka {
  savedAt: number;
}

export type VoiceState = "idle" | "recording" | "processing";
