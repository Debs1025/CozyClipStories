// controllers/QuizController.js
const { validationResult } = require("express-validator");
const QuizModel = require("../models/QuizModel");
const QuizService = require("../services/QuizService");
const axios = require("axios");

const QuizController = {
  async generateQuiz(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { userId, storyId } = req.body;

    // Check cache first
    const existing = await QuizModel.getQuiz(userId, storyId);
    if (existing) {
      return res.json({
        success: true,
        quiz: {
          storyId,
          title: existing.title || "Quiz",
          type: "truefalse",
          numQuestions: 10,
          questions: existing.questions.map(q => ({ question: q.question, choices: q.choices }))
        }
      });
    }

    if (!storyId.startsWith("GB")) {
      return res.status(400).json({ success: false, message: "storyId must start with GB" });
    }

    const gutenbergId = storyId.slice(2);

    try {
      // Step 1: Get book metadata
      const metaRes = await axios.get(`https://gutendex.com/books/${gutenbergId}`, { timeout: 15000 });
      const book = metaRes.data;
      const title = book.title || "Unknown Book";

      // Step 2: Get text URL
      const txtUrl = book.formats["text/plain; charset=us-ascii"] ||
                     book.formats["text/plain; charset=utf-8"] ||
                     book.formats["text/plain"] ||
                     book.formats["application/octet-stream"];

      if (!txtUrl) {
        return res.status(404).json({ success: false, message: "No readable text version" });
      }

      // Step 3: Download text (with fallback mirror)
      let content;
      try {
        const txtRes = await axios.get(txtUrl, { timeout: 45000, maxRedirects: 10 });
        content = txtRes.data;
      } catch (err) {
        // Fallback to official Gutenberg mirror
        const mirror = `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.txt`;
        const mirrorRes = await axios.get(mirror, { timeout: 30000 });
        content = mirrorRes.data;
      }

      const excerpt = content.substring(0, 18000);

      // Step 4: Generate quiz via Gemini
      await QuizService.generateTrueFalseQuiz(userId, storyId, excerpt, title);

      // Step 5: Return fresh quiz
      const freshQuiz = await QuizModel.getQuiz(userId, storyId);

      res.json({
        success: true,
        quiz: {
          storyId,
          title,
          type: "truefalse",
          numQuestions: 10,
          questions: freshQuiz.questions.map(q => ({ question: q.question, choices: q.choices }))
        }
      });

    } catch (err) {
      console.error("Quiz generation failed:", err.message);
      res.status(500).json({ success: false, message: "Failed to generate quiz. Try again." });
    }
  },

  async getQuiz(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { storyId } = req.params;
    const { userId } = req.query;

    const quiz = await QuizModel.getQuiz(userId, storyId);
    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not ready. Generate first." });
    }

    res.json({
      success: true,
      quiz: {
        storyId,
        title: quiz.title || "Quiz",
        type: "truefalse",
        numQuestions: 10,
        questions: quiz.questions.map(q => ({ question: q.question, choices: q.choices }))
      }
    });
  },

  async submitQuiz(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { userId, storyId, answers, timeTaken } = req.body;

    const quiz = await QuizModel.getQuiz(userId, storyId);
    if (!quiz || quiz.submitted) {
      return res.status(400).json({ success: false, message: "Quiz not found or already submitted" });
    }

    if (!Array.isArray(answers) || answers.length !== 10) {
      return res.status(400).json({ success: false, message: "Exactly 10 answers required" });
    }

    let correct = 0;
    const results = quiz.questions.map((q, i) => {
      const userAns = answers[i]?.toString().toLowerCase();
      const isCorrect = userAns === q.correctAnswer;
      if (isCorrect) correct++;
      return { question: q.question, userAnswer: userAns, correctAnswer: q.correctAnswer, isCorrect, explanation: q.explanation };
    });

    const accuracy = (correct / 10) * 100;
    const bonus = accuracy === 100 && timeTaken < 120 ? 10 : 0;
    const totalPoints = correct * 5 + bonus;

    await QuizModel.saveQuiz(userId, storyId, {
      ...quiz,
      submitted: true,
      submittedAt: new Date().toISOString(),
      lastScore: correct,
      lastAccuracy: accuracy,
      lastTime: timeTaken,
      lastBonus: bonus,
      results
    });

    res.json({
      success: true,
      result: { score: correct, accuracy, bonus, totalPoints, timeTaken, results }
    });
  }
};

module.exports = QuizController;