import { Router } from "express";
import passport from "passport";
import {
  createComment,
  updateComment
} from "../controllers/commentsController.js";
import { isAuth } from "../middleware/auth.js";
// import { validateComment } from "../validators/commentsValidator.js";

const commentsRouter = Router();

commentsRouter.post("/", isAuth, createComment);

// TODO update comment
commentsRouter.put("/:id", isAuth, updateComment)

// TODO delete comment

export { commentsRouter };
