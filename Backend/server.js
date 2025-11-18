// server.js
require('dotenv').config();  


const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { validationResult } = require("express-validator");

// Import Routes
const HomeRoutes = require("./routes/HomeRoutes");
const LibraryRoutes = require("./routes/LibraryRoutes");
const StoryRoutes = require("./routes/StoryRoutes");
const QuizRoutes = require("./routes/QuizRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Global validation handler
app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
});

// Mount routes
app.use("/api/home", HomeRoutes);
app.use("/api/library", LibraryRoutes);
app.use("/api/stories", StoryRoutes);
app.use("/api/quiz", QuizRoutes);

// Root
app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to CozyClip Stories API" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));