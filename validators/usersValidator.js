import { body } from "express-validator";
import { handleValidationErrors } from "./handleValidationerrors.js";
import { findUserByEmail } from "../db/usersQueries.js";

const registrationValidation = [
  body("firstName").trim().notEmpty().withMessage("First name is required."),

  body("lastName").trim().notEmpty().withMessage("Last name is required."),

  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email.")
    .bail()
    .custom(async (value) => {
      const user = await findUserByEmail(value);
      if (user) {
        throw new Error("E-mail already in use");
      }
      return true;
    }),

  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters."),
  body("passwordConfirm")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];

const loginValidation = [
  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Enter a valid email."),

  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters."),
];

export const validateRegistration = [
  ...registrationValidation,
  handleValidationErrors,
];
export const validateLogin = [...loginValidation, handleValidationErrors];
