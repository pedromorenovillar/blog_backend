import { Router } from "express";
import passport from "passport";
import { isAuth } from "../middleware/auth.js";
import {
  createPost,
  getAllUserPosts,
  getAllPublishedPosts,
  getSinglePost,
} from "../controllers/postsController.js";
// import { validatePost } from "../validators/postsValidator.js";

const postsRouter = Router();

postsRouter.post("/me", isAuth, createPost);

postsRouter.get("/me", isAuth, getAllUserPosts);

postsRouter.get("/", getAllPublishedPosts);

postsRouter.get("/:id", getSinglePost)

// TODO update post

// TODO delete post

// TODO publish post

// TODO unpublish post

export { postsRouter };
