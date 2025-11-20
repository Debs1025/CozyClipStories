const QuizController = require("../controllers/QuizController");
const QuizModel = require("../models/QuizModel");
const axios = require("axios");

jest.mock("../models/QuizModel");
jest.mock("axios");

function mockRes() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

describe("QuizController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("generateQuiz returns cached quiz when exists", async () => {
    const req = { body: { userId: "u1", storyId: "GB123" } };
    const res = mockRes();
    const cached = {
      questions: Array.from({ length: 10 }).map((_, i) => ({ question: `q${i}`, choices: ["true", "false"] }))
    };
    QuizModel.getQuiz.mockResolvedValue(cached);

    await QuizController.generateQuiz(req, res);

    expect(QuizModel.getQuiz).toHaveBeenCalledWith("u1", "GB123");
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      quiz: expect.objectContaining({ storyId: "GB123", numQuestions: 10 })
    }));
  });

  test("getQuiz returns 404 when not found", async () => {
    const req = { params: { storyId: "GB123" }, query: { userId: "u1" } };
    const res = mockRes();
    QuizModel.getQuiz.mockResolvedValue(null);

    await QuizController.getQuiz(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ success: false, message: "Quiz not generated yet" });
  });

  test("submitQuiz scores and saves results", async () => {
    const sampleQuestions = Array.from({ length: 10 }).map((_, i) => ({
      question: `q${i}`,
      correctAnswer: (i % 2 === 0) ? "true" : "false",
      choices: ["true", "false"],
      explanation: `ex${i}`
    }));
    const quiz = { questions: sampleQuestions, submitted: false };
    QuizModel.getQuiz.mockResolvedValue(quiz);
    QuizModel.saveQuiz.mockResolvedValue();

    const answers = sampleQuestions.map(q => q.correctAnswer);
    const req = { body: { userId: "u1", storyId: "GB123", answers, timeTaken: 100 } };
    const res = mockRes();

    await QuizController.submitQuiz(req, res);

    expect(QuizModel.getQuiz).toHaveBeenCalledWith("u1", "GB123");
    expect(QuizModel.saveQuiz).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      result: expect.objectContaining({ score: 10, accuracy: 100 })
    }));
  });
});
