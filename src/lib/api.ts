import type { Shloka } from "@/types";

export async function submitFeedback(queryId: string, feedback: 1 | -1): Promise<void> {
  const response = await fetch("/api/v1/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query_id: queryId, feedback }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }
}

export async function getShlokaDetails(id: string): Promise<Shloka> {
  const response = await fetch(`/api/v1/shlokas/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch shloka details");
  }

  return response.json();
}
