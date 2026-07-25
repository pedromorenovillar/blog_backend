import { body, param } from "express-validator";
import { handleValidationErrors } from "./handleValidationerrors.js";

const createCommentValidation = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ max: 3000 })
    .withMessage("Content cannot be longer than 3000 characters."),
];

const updateCommentValidation = [
  param("id").isInt({ min: 1 }).withMessage("Invalid comment id."),
];

export const validateComment = [
  ...createCommentValidation,
  handleValidationErrors,
];

export const validateUpdateComment = [
  ...updateCommentValidation,
  ...createCommentValidation,
  handleValidationErrors,
];
