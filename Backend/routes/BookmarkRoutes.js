// routes/BookmarkRoutes.js
const express = require("express");
const router = express.Router();
const BookmarkController = require("../controllers/BookmarkController");

// Health check — same as your LibraryRoutes
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Bookmark API is working",
  });
});

// POST /api/bookmarks → Add or update bookmark
router.post("/", BookmarkController.addBookmark);

// GET /api/bookmarks/all → Get all bookmarks (by userId in body/query)
router.get("/all", BookmarkController.getBookmarks);

// DELETE /api/bookmarks/:bookmarkId → Remove bookmark
router.delete("/:bookmarkId", BookmarkController.deleteBookmark);

module.exports = router;