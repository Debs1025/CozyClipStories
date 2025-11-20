// services/QuizService.js
const axios = require("axios");
const QuizModel = require("../models/QuizModel");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

class QuizService {
  static async generateTrueFalseQuiz(userId, storyId, storyContent, title) {
    const prompt = `
Generate exactly 10 True/False questions from this excerpt of "${title}":

Text: ${storyContent.substring(0, 3000)}

Rules:
- Exactly 10 questions
- Each is a clear statement
- Output ONLY valid JSON array:
[
  {
    "question": "War is a duel on an extensive scale.",
    "choices": ["true", "false"],
    "correctAnswer": "true",
    "explanation": "Clausewitz defines war as 'nothing but a duel on an extensive scale'."
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
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000,
      }
    );

    const raw = response.data.candidates[0].content.parts[0].text;
    const clean = raw.replace(/```json/i, "").replace(/```/i, "").trim();
    let questions = JSON.parse(clean);

    if (!Array.isArray(questions) || questions.length < 10) {
      throw new Error("AI failed to generate 10 questions");
    }

    questions = questions.slice(0, 10).map(q => ({
      question: q.question.trim(),
      choices: q.choices || ["true", "false"],
      correctAnswer: q.correctAnswer.toLowerCase() === "true" ? "true" : "false",
      explanation: q.explanation || "No explanation provided."
    }));

    const quizData = {
      type: "truefalse",
      numQuestions: 10,
      questions,
      generatedAt: new Date().toISOString(),
    };

    await QuizModel.saveQuiz(userId, storyId, quizData);

  }

  static async getQuizForUser(userId, storyId) {
    const quiz = await QuizModel.getQuiz(userId, storyId);
    if (!quiz) return null;

    return {
      storyId: quiz.storyId,
      type: quiz.type,
      numQuestions: quiz.numQuestions,
      questions: quiz.questions.map(q => ({
        question: q.question,
        choices: q.choices
      }))
    };
  }
}

module.exports = QuizService;