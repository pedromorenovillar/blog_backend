import { body, param } from "express-validator";
import { handleValidationErrors } from "./handleValidationerrors.js";

const createPostValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("A title is required.")
    .isLength({ max: 100 })
    .withMessage("Title cannot be longer than 100 characters."),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required.")
    .isLength({ max: 3000 })
    .withMessage("Content cannot be longer than 3000 characters."),
];

const postIdValidation = [
  param("id").isInt({ min: 1 }).withMessage("Invalid post id."),
];

export const validatePost = [...createPostValidation, handleValidationErrors];

export const validateUpdatePost = [
  ...postIdValidation,
  ...createPostValidation,
  handleValidationErrors,
];

export const validatePostId = [...postIdValidation, handleValidationErrors];
