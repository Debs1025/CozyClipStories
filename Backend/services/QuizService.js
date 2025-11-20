// services/QuizService.js
const axios = require("axios");
const QuizModel = require("../models/QuizModel");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

class QuizService {
  static async generateTrueFalseQuiz(userId, storyId, content, title) {
    const prompt = `You are a perfect quiz generator.

Generate EXACTLY 10 True/False questions for the book "${title}".

Use this text:
${content}

OUTPUT ONLY THIS JSON (no extra text, no markdown, no explanations):

[
  {
    "question": "Alice follows a white rabbit down a hole.",
    "choices": ["true", "false"],
    "correctAnswer": "true",
    "explanation": "This is how the story begins."
  }
]`;

    try {
      const response = await axios.post(
        `${GEMINI_URL}?key=${GEMINI_API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
            responseMimeType: "application/json"
          },
          safetySettings: [
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" }
          ]
        },
        { timeout: 50000 }
      );

      let rawText = "";
      try {
        rawText = response.data.candidates[0].content.parts[0].text;
      } catch {
        throw new Error("No response from AI");
      }

      // SUPER BULLETPROOF JSON EXTRACTOR
      rawText = rawText.trim();
      rawText = rawText.replace(/```json|```/gi, "").trim();

      // Find the first [ and last ]
      const start = rawText.indexOf("[");
      const end = rawText.lastIndexOf("]") + 1;
      if (start === -1 || end === 0) throw new Error("No JSON array found");

      const jsonStr = rawText.substring(start, end);

      let questions;
      try {
        questions = JSON.parse(jsonStr);
      } catch (e) {
        console.log("JSON parse failed, raw:", jsonStr);
        throw new Error("Invalid JSON from AI");
      }

      if (!Array.isArray(questions) || questions.length < 5) {
        throw new Error("Not enough questions");
      }

      // FINAL CLEANUP — 100% safe
      questions = questions.slice(0, 10).map((q, i) => ({
        question: String(q.question || `Question ${i + 1}`).trim(),
        choices: ["true", "false"],
        correctAnswer: String(q.correctAnswer || "false").toLowerCase().includes("true") ? "true" : "false",
        explanation: String(q.explanation || "No explanation available.").trim()
      }));

      await QuizModel.saveQuiz(userId, storyId, {
        storyId,
        title,
        type: "truefalse",
        numQuestions: 10,
        questions,
        generatedAt: new Date().toISOString()
      });

    } catch (err) {
      console.error("Gemini error:", err.message);
      // LAST RESORT: Use fallback questions
      const fallback = [
        { question: "The story takes place in a real location.", choices: ["true", "false"], correctAnswer: "false", explanation: "It's a fictional dream world." },
        { question: "Alice meets a talking rabbit.", choices: ["true", "false"], correctAnswer: "true", explanation: "The White Rabbit speaks." },
        { question: "The Queen of Hearts loves croquet.", choices: ["true", "false"], correctAnswer: "true", explanation: "She plays croquet with flamingos." },
        { question: "Alice drinks a potion to grow bigger.", choices: ["true", "false"], correctAnswer: "true", explanation: "She drinks to change size." },
        { question: "The Cheshire Cat can disappear.", choices: ["true", "false"], correctAnswer: "true", explanation: "It vanishes leaving only a grin." },
        { question: "The Mad Hatter hosts a tea party.", choices: ["true", "false"], correctAnswer: "true", explanation: "It's a famous scene." },
        { question: "Alice wakes up at the end.", choices: ["true", "false"], correctAnswer: "true", explanation: "It was all a dream." },
        { question: "The story is set in winter.", choices: ["true", "false"], correctAnswer: "false", explanation: "No season is specified." },
        { question: "Alice becomes queen.", choices: ["true", "false"], correctAnswer: "false", explanation: "She remains a visitor." },
        { question: "The caterpillar smokes a hookah.", choices: ["true", "false"], correctAnswer: "true", explanation: "It's a famous character trait." }
      ];

      await QuizModel.saveQuiz(userId, storyId, {
        storyId,
        title,
        type: "truefalse",
        numQuestions: 10,
        questions: fallback,
        generatedAt: new Date().toISOString(),
        isFallback: true
      });
    }
  }
}

module.exports = QuizService;