// validators/QuestValidator.js
const { body, param, query } = require("express-validator");

const updateProgressValidator = [
  body("userId")
    .trim()
    .notEmpty()
    .withMessage("userId is required")
    .isString()
    .withMessage("userId must be string"),

  body("eventType")
    .trim()
    .notEmpty()
    .withMessage("eventType is required")
    .isIn(["chapter_read", "book_completed", "daily_login", "challenge_completed"])
    .withMessage("Invalid eventType"),

  body("value")
    .optional()
    .isInt({ min: 1 })
    .withMessage("value must be positive integer")
];

const completeQuestValidator = [
  param("questId")
    .trim()
    .notEmpty()
    .withMessage("questId required in URL"),

  body("userId")
    .trim()
    .notEmpty()
    .withMessage("userId required in body")
];

const userIdParamValidator = [
  param("userId")
    .trim()
    .notEmpty()
    .withMessage("userId required in URL")
    .isString()
];

module.exports = {
  updateProgressValidator,
  completeQuestValidator,
  userIdParamValidator
};