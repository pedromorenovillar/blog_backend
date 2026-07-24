import { Router } from "express";
import passport from "passport";
import { createComment } from "../controllers/commentsController.js";
import { isAuth } from "../middleware/auth.js";
// import { validateComment } from "../validators/commentsValidator.js";

const commentsRouter = Router();

// TODO create comment
commentsRouter.post("/", isAuth, createComment);
// TODO read comment
// TODO read all comments
// TODO update comment
// TODO delete comment

export { commentsRouter };
