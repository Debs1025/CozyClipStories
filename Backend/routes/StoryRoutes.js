// routes/StoryRoutes.js
const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/StoryController");

// ✅ Check API health
router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Story API is running 🚀" });
});

// ✅ Fetch story content by ID
router.get("/:id", StoryController.getStoryById);

module.exports = router;
