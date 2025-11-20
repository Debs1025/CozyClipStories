// controllers/QuizController.js
const { validationResult } = require("express-validator");
const QuizModel = require("../models/QuizModel");
const axios = require("axios");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const QuizController = {
  // POST /api/quiz/generate
  async generateQuiz(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
      });
    }

    try {
      const { userId, storyId } = req.body;

      // === FETCH FROM GUTENBERG ===
      let title = "Unknown";
      let content = "";

      if (storyId.startsWith("GB")) {
        const gutenbergId = storyId.slice(2);
        try {
          const metaRes = await axios.get(`https://gutendex.com/books/${gutenbergId}`, { timeout: 5000 });
          title = metaRes.data.title || "Unknown";
          const txtUrl = metaRes.data.formats["text/plain; charset=utf-8"] || 
                         metaRes.data.formats["text/plain"];
          if (txtUrl) {
            const txtRes = await axios.get(txtUrl, { timeout: 10000 });
            content = txtRes.data;
          }
        } catch (err) {
          return res.status(404).json({ success: false, message: "Story not found in archive" });
        }
      } else {
        return res.status(400).json({ success: false, message: "Invalid storyId format" });
      }

      if (!content) {
        return res.status(404).json({ success: false, message: "Story content not available" });
      }

      // === CHECK CACHE ===
      let quiz = await QuizModel.getQuiz(userId, storyId);
      if (quiz) {
        return res.json({
          success: true,
          quiz: {
            storyId,
            type: "truefalse",
            numQuestions: 10,
            questions: quiz.questions.map(q => ({
              question: q.question,
              choices: q.choices
            }))
          }
        });
      }

      // === GENERATE QUESTIONS ===
     const prompt = `
You are a literature teacher creating a **comprehension quiz** for students who just read "${title}".

Generate **exactly 10 True/False statements** that test **deep understanding**, **inference**, and **context**.

Text excerpt (first 3000 chars):
${content.substring(0, 3000)}

Rules:
1. Statements must be **True or False** based on the text.
2. **No direct quotes** — rephrase in your own words.
3. Test **comprehension**, not memorization.
4. Include **1 explanation** per question.
5. Output **ONLY valid JSON**:

[
  {
    "question": "Clausewitz believes war is primarily about personal honor.",
    "choices": ["true", "false"],
    "correctAnswer": "false",
    "explanation": "Clausewitz sees war as a political instrument, not personal."
  }
]
`.trim();

      const response = await axios.post(
        `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 1500,
            responseMimeType: "application/json",
          },
        },
        { headers: { "Content-Type": "application/json" }, timeout: 30000 }
      );

      const raw = response.data.candidates[0].content.parts[0].text;
      const clean = raw.replace(/```json/i, "").replace(/```/g, "").trim();
      let questions = JSON.parse(clean);

      if (!Array.isArray(questions) || questions.length < 10) {
        return res.status(500).json({ success: false, message: "AI failed to generate 10 questions" });
      }

      // === FIX UNDEFINED VALUES ===
      questions = questions.slice(0, 10).map(q => ({
        question: q.question?.trim() || "No question available.",
        choices: q.choices || ["true", "false"],
        correctAnswer: (q.correctAnswer?.toString().toLowerCase() === "true") ? "true" : "false",
        explanation: q.explanation?.trim() || "No explanation provided."
      }));

      // === CLEAN FOR FIRESTORE (NO UNDEFINED) ===
      const cleanQuestions = questions.map(q => ({
        question: q.question,
        choices: q.choices,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation
      }));

      const quizData = {
        type: "truefalse",
        numQuestions: 10,
        questions: cleanQuestions,
        generatedAt: new Date().toISOString(),
        title
      };

      await QuizModel.saveQuiz(userId, storyId, quizData);

      res.json({
        success: true,
        quiz: {
          storyId,
          type: "truefalse",
          numQuestions: 10,
          questions: cleanQuestions.map(q => ({
            question: q.question,
            choices: q.choices
          }))
        }
      });

    } catch (err) {
      console.error("Generate quiz error:", err.message);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET /api/quiz/:storyId
  async getQuiz(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
      });
    }

    try {
      const { storyId } = req.params;
      const { userId } = req.query;

      const quiz = await QuizModel.getQuiz(userId, storyId);
      if (!quiz) {
        return res.status(404).json({ success: false, message: "Quiz not generated yet" });
      }

      res.json({
        success: true,
        quiz: {
          storyId,
          type: "truefalse",
          numQuestions: 10,
          questions: quiz.questions.map(q => ({
            question: q.question,
            choices: q.choices
          }))
        }
      });

    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/quiz/submit
  async submitQuiz(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
      });
    }

    try {
      const { userId, storyId, answers, timeTaken } = req.body;

      const quiz = await QuizModel.getQuiz(userId, storyId);
      if (!quiz || quiz.submitted) {
        return res.status(400).json({ success: false, message: "Invalid or already submitted" });
      }

      if (!Array.isArray(answers) || answers.length !== 10) {
        return res.status(400).json({ success: false, message: "Exactly 10 answers required" });
      }

      let correct = 0;
      const results = quiz.questions.map((q, i) => {
        const userAnswer = answers[i]?.toLowerCase();
        const isCorrect = userAnswer === q.correctAnswer;
        if (isCorrect) correct++;
        return {
          question: q.question,
          userAnswer,
          correctAnswer: q.correctAnswer,
          isCorrect,
          explanation: q.explanation
        };
      });

      const score = correct;
      const accuracy = (correct / 10) * 100;
      let bonus = 0;
      if (accuracy === 100 && timeTaken < 120) bonus = 10;
      const totalPoints = score * 5 + bonus;

      await QuizModel.saveQuiz(userId, storyId, {
        ...quiz,
        submitted: true,
        lastScore: score,
        lastAccuracy: accuracy,
        lastTime: timeTaken,
        lastBonus: bonus,
        results,
        submittedAt: new Date().toISOString()
      });

      res.json({
        success: true,
        result: {
          score,
          accuracy,
          bonus,
          totalPoints,
          timeTaken,
          results
        }
      });

    } catch (err) {
      console.error("Submit error:", err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = QuizController;