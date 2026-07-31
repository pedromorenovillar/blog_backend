import { Router } from "express";
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
  validateCommentId,
} from "../validators/commentsValidator.js";

const commentsRouter = Router();

commentsRouter.post("/", isAuth, validateComment, createComment);

commentsRouter.put(
  "/:id",
  isAuth,
  validateCommentId,
  validateUpdateComment,
  isCommentOwner,
  updateComment,
);

commentsRouter.delete(
  "/:id",
  isAuth,
  validateCommentId,
  isCommentOwner,
  deleteComment,
);

export { commentsRouter };
