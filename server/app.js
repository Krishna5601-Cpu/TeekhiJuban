const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// Importing Packages

dotenv.config(); // Loads Enviroment Variables

const app = express(); // Creates App Engine

app.use(cors()); //
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🌶️ TeekhiJuban Running ");
});

const PORT = process.env.PORT || 2626;

app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});
