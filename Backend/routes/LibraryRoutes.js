// routes/LibraryRoutes.js
const express = require("express");
const router = express.Router();
const LibraryController = require("../controllers/LibraryController");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Library API is working 🚀",
  });
});

// Main endpoint to get books
router.get("/stories", LibraryController.getStories);

module.exports = router;
