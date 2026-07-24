import { Router } from "express";
import passport from "passport";
import { isAuth } from "../middleware/auth.js";
import { createPost } from "../controllers/postsController.js";
// import { validatePost } from "../validators/postsValidator.js";

const postsRouter = Router();

postsRouter.post("/", isAuth, createPost);

// TODO read post

// TODO update post

// TODO delete post

// TODO publish post

export { postsRouter };
