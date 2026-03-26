const express = require("express");
const roastRouter = express.Router();

const { roastUserTaste } = require("../controllers/roastController");

roastRouter.post("/", roastUserTaste);

module.exports = roastRouter;
