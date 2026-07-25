import { Router } from "express";
import passport from "passport";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";
import { isAuth } from "../middleware/auth.js";
import { isCommentOwner } from "../middleware/ownership.js";
import {
  validateComment,
  validateUpdateComment,
} from "../validators/commentsValidator.js";

const commentsRouter = Router();

commentsRouter.post("/", isAuth, validateComment, createComment);

commentsRouter.put(
  "/:id",
  isAuth,
  isCommentOwner,
  validateUpdateComment,
  updateComment,
);

commentsRouter.delete("/:id", isAuth, isCommentOwner, deleteComment);

export { commentsRouter };
