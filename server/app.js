const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
// Importing Packages

const roastRoutes = require("./routes/roastRoutes");

dotenv.config(); // Loads Enviroment Variables

const app = express(); // Creates App Engine

app.use(cors()); // Cross Origin Resource Sharing
app.use(express.json());

app.use("/api/roast", roastRoutes);

// Connecting Frontend
app.use(express.static(path.join(__dirname, "../client")));

//Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Server
const PORT = process.env.PORT || 2626;

app.listen(PORT, () => {
  console.log(`🔥 Server is running on http://localhost:${PORT}`);
});
