import type { Sloka } from "@/types";

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

export async function getSlokaDetails(id: string): Promise<Sloka> {
  const response = await fetch(`/api/v1/slokas/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch sloka details");
  }

  return response.json();
}
