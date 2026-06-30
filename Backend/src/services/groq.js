import { buildSystemPrompt } from "../data/storeKnowledge.js";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-8b-instant";

export async function getChatReply({ apiKey, message, history = [] }) {
  const sanitizedHistory = history
    .filter(
      (entry) =>
        entry &&
        (entry.role === "user" || entry.role === "assistant") &&
        typeof entry.content === "string" &&
        entry.content.trim(),
    )
    .slice(-10)
    .map((entry) => ({
      role: entry.role,
      content: entry.content.trim(),
    }));

  const response = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      temperature: 0.3,
      max_tokens: 512,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...sanitizedHistory,
        { role: "user", content: message.trim() },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    const error = new Error("Groq API request failed");
    error.status = response.status;
    error.details = errorBody;
    throw error;
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content?.trim();

  if (!reply) {
    throw new Error("Groq API returned an empty response");
  }

  return reply;
}
