// validators/QuizValidators.js
const { body } = require("express-validator");

const generateQuizValidator = [
  body("userId").notEmpty().withMessage("userId required"),
  body("storyId").notEmpty().withMessage("storyId required")
];

const submitQuizValidator = [
  body("userId").notEmpty(),
  body("storyId").notEmpty(),
  body("answers").isArray().withMessage("answers must be array")
];

const getQuizValidator = []; // even if empty, must exist

// EXPORT ALL
module.exports = {
  generateQuizValidator,
  submitQuizValidator,
  getQuizValidator
};