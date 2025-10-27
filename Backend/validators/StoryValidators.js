// validators/StoryValidator.js
const { param, body } = require("express-validator");

const StoryValidator = {
  // ✅ Validate story ID for fetching a story
  validateGetStoryById: [
    param("id")
      .notEmpty()
      .withMessage("Story ID is required")
      .isString()
      .withMessage("Story ID must be a string"),
  ],

  // ✅ Validate saving reading progress
  validateSaveProgress: [
    body("userId")
      .notEmpty()
      .withMessage("User ID is required")
      .isString()
      .withMessage("User ID must be a string"),

    body("storyId")
      .notEmpty()
      .withMessage("Story ID is required")
      .isString()
      .withMessage("Story ID must be a string"),

    body("currentPage")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Current page must be a positive integer"),

    body("scrollPosition")
      .optional()
      .isNumeric()
      .withMessage("Scroll position must be numeric"),

    body("readingTime")
      .optional()
      .isNumeric()
      .withMessage("Reading time must be numeric"),

    body("completed")
      .optional()
      .isBoolean()
      .withMessage("Completed must be true or false"),
  ],
};

module.exports = StoryValidator;
