import { Router } from "express";
import { loadEnv } from "../config/env.js";
import { getChatReply } from "../services/groq.js";

const router = Router();

function validateHistory(history) {
  if (history === undefined) return [];
  if (!Array.isArray(history)) return null;

  return history.filter(
    (entry) =>
      entry &&
      (entry.role === "user" || entry.role === "assistant") &&
      typeof entry.content === "string" &&
      entry.content.trim(),
  );
}

router.post("/", async (req, res) => {
  const message = String(req.body?.message || "").trim();

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "message is required",
    });
  }

  if (message.length > 1000) {
    return res.status(400).json({
      success: false,
      message: "message must be 1000 characters or fewer",
    });
  }

  const history = validateHistory(req.body?.history);
  if (history === null) {
    return res.status(400).json({
      success: false,
      message: "history must be an array of messages",
    });
  }

  const env = loadEnv();

  if (!env.GROQ_API_KEY) {
    return res.status(500).json({
      success: false,
      message: "Server configuration error",
    });
  }

  try {
    const reply = await getChatReply({
      apiKey: env.GROQ_API_KEY,
      message,
      history,
    });

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Chat error:", error.message);

    if (error.status === 401 || error.status === 403) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    return res.status(502).json({
      success: false,
      message: "Failed to get AI response. Please try again.",
    });
  }
});

export default router;
