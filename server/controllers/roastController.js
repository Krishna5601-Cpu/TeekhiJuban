const analyzeTaste = require("../services/tasteAnalyzer");
const buildRoastPrompt = require("../ai/promptBuiler");
const generateRoastFromGemini = require("../ai/geminiService");

exports.roastUserTaste = async (req, res) => {
  try {
    const { parameter, items, roastType, intensity } = req.body;

    const tags = analyzeTaste(parameter, items);

    const prompt = buildRoastPrompt({
      parameter,
      items,
      tags,
      roastType,
      intensity,
    });

    const roast = await generateRoastFromGemini(prompt);

    return res.json({
      success: true,
      roast,
      tags,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "AI roast generation failed",
    });
  }
};
