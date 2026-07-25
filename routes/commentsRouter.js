import { Router } from "express";
import passport from "passport";
import {
  createComment,
  readComment,
  readAllComments
} from "../controllers/commentsController.js";
import { isAuth } from "../middleware/auth.js";
// import { validateComment } from "../validators/commentsValidator.js";

const commentsRouter = Router();

commentsRouter.post("/", isAuth, createComment);

commentsRouter.get("/:id", readComment);

commentsRouter.get("/", readAllComments);

// TODO update comment

// TODO delete comment

export { commentsRouter };
