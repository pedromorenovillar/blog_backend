import { Router } from "express";
import passport from "passport";
import {
  createComment,
  readComment,
} from "../controllers/commentsController.js";
import { isAuth } from "../middleware/auth.js";
// import { validateComment } from "../validators/commentsValidator.js";

const commentsRouter = Router();

commentsRouter.post("/", isAuth, createComment);

// TODO read comment
commentsRouter.get("/:id", readComment);

// TODO read all comments

// TODO update comment

// TODO delete comment

export { commentsRouter };
