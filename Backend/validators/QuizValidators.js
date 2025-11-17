// validators/QuizValidators.js
const { body, query, param } = require("express-validator");

const generateQuizValidator = [
  body("userId").trim().notEmpty().isString(),
  body("storyId").trim().notEmpty().matches(/^(GB|OL)\d+$/)
];

const getQuizValidator = [
  param("storyId").trim().notEmpty().matches(/^(GB|OL)\d+$/),
  query("userId").trim().notEmpty().isString()
];

const submitQuizValidator = [
  body("userId").trim().notEmpty().isString(),
  body("storyId").trim().notEmpty().matches(/^(GB|OL)\d+$/),
  body("answers").isArray({ min: 10, max: 10 }),
  body("answers.*").isIn(["true", "false"]),
  body("timeTaken").isInt({ min: 1 })
];

module.exports = { generateQuizValidator, getQuizValidator, submitQuizValidator };