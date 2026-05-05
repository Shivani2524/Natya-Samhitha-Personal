"use client";

import { useQuery } from "@tanstack/react-query";
import type { QueryResponse } from "@/types";

async function fetchQuery(query: string): Promise<QueryResponse> {
  const response = await fetch("/api/v1/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, history: [] }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch query results");
  }

  return response.json();
}

export function useSearch(query: string) {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => fetchQuery(query),
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

