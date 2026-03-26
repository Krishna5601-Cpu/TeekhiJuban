exports.roastUserTaste = async (req, res) => {
  try {
    const { parameter, items, roastType, intensity } = req.body;

    console.log("🔥 Incoming Roast Request:", req.body);

    return res.json({
      success: true,
      demo: true,
      message: "Backend roast endpoint working",
      receivedData: { parameter, items, roastType, intensity },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server roast error",
    });
  }
};
