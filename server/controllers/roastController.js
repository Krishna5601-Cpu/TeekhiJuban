const analyzeTaste = require("../services/tasteAnalyzer");

exports.roastUserTaste = async (req, res) => {
  try {
    const { parameter, items, roastType, intensity } = req.body;

    const tags = analyzeTaste(parameter, items);

    console.log("🔥 Tags Generated:", tags);

    return res.json({
      success: true,
      tags,
      message: "Taste analyzed successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server roast error",
    });
  }
};
