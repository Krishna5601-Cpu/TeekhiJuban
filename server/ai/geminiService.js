const axios = require("axios");

async function generateRoastFromGemini(prompt) {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
    );
    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    return text || "No roast generated 😅";
  } catch (error) {
    console.error(
      "🔥 Gemini FINAL Error:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to generate roast from Gemini");
  }
}

module.exports = generateRoastFromGemini;
