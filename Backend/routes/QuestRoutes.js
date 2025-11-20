// routes/QuestRoutes.js
const express = require("express");
const router = express.Router();
const { updateProgress } = require("../controllers/QuestController");

router.post("/progress", updateProgress);

module.exports = router;