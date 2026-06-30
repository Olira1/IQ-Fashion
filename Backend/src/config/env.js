import dotenv from "dotenv";

dotenv.config();

const requiredEnv = ["PORT", "CORS_ORIGIN"];

function validateRequiredEnv() {
  const missing = requiredEnv.filter(
    (key) => !process.env[key] || String(process.env[key]).trim() === "",
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }
}

export function loadEnv() {
  validateRequiredEnv();

  return {
    PORT: Number(process.env.PORT),
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN || "",
    TELEGRAM_GROUP_ID: process.env.TELEGRAM_GROUP_ID || "",
    GROQ_API_KEY: process.env.GROQ_API_KEY || "",
  };
}
