import { Router } from "express";
import passport from "passport";
import { isAuth } from "../middleware/auth.js";
import {
  createPost,
  getAllUserPosts,
  getAllPublishedPosts,
} from "../controllers/postsController.js";
// import { validatePost } from "../validators/postsValidator.js";

const postsRouter = Router();

postsRouter.post("/me", isAuth, createPost);

postsRouter.get("/", getAllPublishedPosts);

postsRouter.get("/me", isAuth, getAllUserPosts);

// TODO read one post

// TODO update post

// TODO delete post

// TODO publish post

// TODO unpublish post

export { postsRouter };
