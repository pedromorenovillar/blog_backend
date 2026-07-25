import { Router } from "express";
import passport from "passport";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";
import { isAuth } from "../middleware/auth.js";
import { isCommentOwner } from "../middleware/ownership.js";
// import { validateComment } from "../validators/commentsValidator.js";

const commentsRouter = Router();

commentsRouter.post("/", isAuth, createComment);

commentsRouter.put("/:id", isAuth, isCommentOwner, updateComment);

commentsRouter.delete("/:id", isAuth, isCommentOwner, deleteComment);

export { commentsRouter };
