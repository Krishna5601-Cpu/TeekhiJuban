const analyzeTaste = require("../services/tasteAnalyzer");
const buildRoastPrompt = require("../ai/promptBuiler");

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

    console.log("🔥 Prompt Generated:\n", prompt);

    return res.json({
      success: true,
      tags,
      prompt, // TEMP: for testing
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server roast error",
    });
  }
};
