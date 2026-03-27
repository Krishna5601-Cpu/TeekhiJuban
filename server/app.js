require("dotenv").config(); // Load Enviroment Variables

const express = require("express");
const cors = require("cors");
const path = require("path");

const roastRoutes = require("./routes/roastRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/roast", roastRoutes);

// Static frontend
app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

const PORT = process.env.PORT || 2626;

app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});
