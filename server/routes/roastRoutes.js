const express = require("express");
const roastRouter = express.Router(); // Creates Router

const { roastUserTaste } = require("../controllers/roastController");

roastRouter.post("/", roastUserTaste);

module.exports = roastRouter;
