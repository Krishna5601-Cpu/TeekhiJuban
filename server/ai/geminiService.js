const axios = require("axios");

const DEFAULT_MODEL = "gemini-flash-latest";
const DEFAULT_TIMEOUT_MS = 15000;
const MAX_RETRIES = 2;

/**
 * Generates a roast (or any text completion) using the Gemini API.
 *
 * @param {string} prompt - The prompt to send to Gemini.
 * @param {Object} [options]
 * @param {string} [options.model] - Gemini model to use.
 * @param {number} [options.temperature] - Sampling temperature (0-2).
 * @param {number} [options.maxOutputTokens] - Max tokens in response.
 * @param {number} [options.timeoutMs] - Request timeout in ms.
 * @param {number} [options.retries] - Number of retry attempts on transient failure.
 * @returns {Promise<string>} The generated text.
 */
async function generateRoastFromGemini(prompt, options = {}) {
  if (typeof prompt !== "string" || !prompt.trim()) {
    throw new Error("Prompt must be a non-empty string");
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }

  const {
    model = DEFAULT_MODEL,
    temperature = 1,
    maxOutputTokens = 512,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retries = MAX_RETRIES,
  } = options;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;

  const payload = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      temperature,
      maxOutputTokens,
    },
  };

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(url, payload, {
        timeout: timeoutMs,
        headers: { "Content-Type": "application/json" },
      });

      const candidate = response.data?.candidates?.[0];

      // Handle cases where generation was blocked or empty
      if (candidate?.finishReason === "SAFETY") {
        return "Couldn't generate a roast for that one 😅 (blocked by safety filters)";
      }

      const text = candidate?.content?.parts?.[0]?.text;
      return text?.trim() || "No roast generated 😅";
    } catch (error) {
      lastError = error;
      const status = error.response?.status;
      const isRetryable =
        !status || status === 429 || (status >= 500 && status < 600);

      console.error(
        `🔥 Gemini error (attempt ${attempt + 1}/${retries + 1}):`,
        error.response?.data || error.message,
      );

      if (!isRetryable || attempt === retries) {
        break;
      }

      // Exponential backoff before retrying
      const delay = 500 * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  const status = lastError.response?.status;
  const detail = lastError.response?.data?.error?.message || lastError.message;
  throw new Error(
    `Failed to generate roast from Gemini (${status ?? "network error"}): ${detail}`,
  );
}

module.exports = generateRoastFromGemini;
