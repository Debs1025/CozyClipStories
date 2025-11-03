// routes/StoryRoutes.js
const express = require("express");
const router = express.Router();
const StoryController = require("../controllers/StoryController");
const StoryService = require("../services/StoryService");
const { validate } = require("../validators/StoryValidator");

// Health check
router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Story API is running" });
});

// Fetch story content
router.get("/:id", StoryController.getStoryById);

// Save reading progress
router.post("/progress", validate("validateSaveProgress"), async (req, res) => {
  try {
    const { userId, storyId, currentPage, scrollPosition, readingTime, completed } = req.body;

    const progressData = {
      currentPage,
      scrollPosition,
      readingTime,
      completed: completed || false,
    };

    const result = await StoryService.saveProgress(userId, storyId, progressData);

    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get progress
router.get("/progress/:storyId", async (req, res) => {
  try {
    const { storyId } = req.params;
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ success: false, message: "userId required" });

    const progress = await StoryService.getProgress(userId, storyId);
    res.json({ success: true, progress });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;