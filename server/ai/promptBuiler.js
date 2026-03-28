const buildRoastPrompt = ({ parameter, items, tags, roastType, intensity }) => {
  const itemsText = items.join(", ");
  const tagsText = tags.join(", ");

  let tone = "";

  if (roastType === "friendly") {
    tone = "playful and light teasing";
  } else if (roastType === "savage") {
    tone = "sarcastic and brutally funny";
  } else if (roastType === "villain") {
    tone = "dramatic and evil anime villain style";
  }

  return `
You are TeekhiJuban AI — a savage roast generator.

User Data:
- Category: ${parameter}
- Items: ${itemsText}
- Personality Tags: ${tagsText}

Instructions:
- Roast the user in a ${tone} tone
- Intensity level: ${intensity}/5
- Keep it SHORT, SHARP, and FUNNY
- Maximum 2-3 lines only
- Each line should hit hard
- No long paragraphs
- No explanations
- Make it meme-worthy and shareable

Output format:
Line 1
Line 2
Line 3 (optional)
`;
};

module.exports = buildRoastPrompt;
