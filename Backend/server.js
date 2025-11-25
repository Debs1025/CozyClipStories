require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { validationResult } = require("express-validator");
const firebase = require("firebase-admin");

// Routes
const HomeRoutes = require("./routes/HomeRoutes");
const LibraryRoutes = require("./routes/LibraryRoutes");
const StoryRoutes = require("./routes/StoryRoutes");
const ShopRoutes = require("./routes/ShopRoutes");
const QuizRoutes = require("./routes/QuizRoutes");
const BookmarkRoutes = require("./routes/BookmarkRoutes");
const QuestRoutes = require("./routes/QuestRoutes");
const userRoute = require("./routes/userRoute");
const studentRoute = require("./routes/studentRoute");
const teacherRoute = require("./routes/teacherRoute");
const settingsRoute = require("./routes/settingsRoute");
const streakRoute = require("./routes/streakRoute");
const wordHelperRoute = require("./routes/wordHelperRoute");
const paymentRoute = require("./routes/paymentRoute");
const rankingRoute = require("./routes/rankingRoute");

// Services
const paymentService = require("./services/paymentService");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use("/api/webhook/paymaya", express.raw({ type: "application/json" }));
app.use(express.json({ limit: "5mb" }));

app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.path || err.param,
        message: err.msg,
      })),
    });
  }
  next();
});

// CozyClip Main Features
app.use("/api/home", HomeRoutes);
app.use("/api/library", LibraryRoutes);
app.use("/api/stories", StoryRoutes);
app.use("/api/shop", ShopRoutes);
app.use("/api/quiz", QuizRoutes);
app.use("/api/bookmarks", BookmarkRoutes);
app.use("/api/quests", QuestRoutes);

app.use(userRoute);
app.use(studentRoute);
app.use(teacherRoute);
app.use(settingsRoute);
app.use(streakRoute);
app.use(wordHelperRoute);
app.use(paymentRoute);
app.use("/api", rankingRoute); 

// Root
app.get("/", (req, res) => {
  res.json({ 
    success: true, 
    message: "CozyClip Stories API — Running Perfectly",
    version: "1.0",
    features: "Library • Quiz • Shop • Quests • Firebase • Payments"
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: "Route not found" 
  });
});

// Firebase Connection 
const connectFirebase = () =>
  new Promise((resolve, reject) => {
    if (firebase.apps.length) {
      console.log("Firebase already initialized");
      return resolve(firebase.firestore());
    }
    try {
      if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
        if (serviceAccount.private_key && serviceAccount.private_key.includes("\\n")) {
          serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
        }
        firebase.initializeApp({
          credential: firebase.credential.cert(serviceAccount),
        });
        console.log("Firebase initialized from FIREBASE_SERVICE_ACCOUNT_JSON");
        return resolve(firebase.firestore());
      }

      // If env is missing, fail fast so deploy logs show clear reason
      throw new Error("FIREBASE_SERVICE_ACCOUNT_JSON not set. Set the full service account JSON in env.");
    } catch (err) {
      reject(err);
    }
  });

module.exports = { app, connectFirebase };

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  connectFirebase()
    .then((db) => {
      app.locals.db = db; 
      console.log("Firestore connected");

      if (paymentService && typeof paymentService.startExpiryChecker === "function") {
        try {
          paymentService.startExpiryChecker(db);
          console.log("Payment expiry checker started");
        } catch (e) {
          console.warn("Payment expiry checker failed to start:", e.message || e);
        }
      }

      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log(`CozyClip Stories API is LIVE`);
      });
    })
    .catch((err) => {
      console.error("Failed to initialize Firebase:", err && err.message ? err.message : err);
      console.warn("Starting server without Firestore — limited functionality. Set FIREBASE credentials to enable full features.");

      app.locals.db = null;
      try {
        if (paymentService && typeof paymentService.startExpiryChecker === "function") {
          paymentService.startExpiryChecker(null);
          console.log("Payment expiry checker started (no DB)");
        }
      } catch (e) {
        console.warn("Payment expiry checker not started:", e && e.message ? e.message : e);
      }

      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT} (Firestore NOT connected)`);
        console.log(`CozyClip Stories API is LIVE (limited mode)`);
      });
    });
}
