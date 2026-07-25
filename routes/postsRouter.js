import { Router } from "express";
import passport from "passport";
import { isAuth } from "../middleware/auth.js";
import { isPostOwner } from "../middleware/ownership.js";
import {
  createPost,
  getAllUserPosts,
  getAllPublishedPosts,
  getSinglePost,
  updatePost,
  deletePost,
  publishPost,
  unpublishPost,
  getPostComments,
} from "../controllers/postsController.js";

import {
  validateUpdatePost,
  validatePost,
} from "../validators/postsValidator.js";

const postsRouter = Router();

postsRouter.post("/me", isAuth, validatePost, createPost);

postsRouter.get("/me", isAuth, getAllUserPosts);

postsRouter.get("/", getAllPublishedPosts);

postsRouter.get("/:id", getSinglePost);

postsRouter.put("/:id", isAuth, validateUpdatePost, isPostOwner, updatePost);

postsRouter.delete("/:id", isAuth, isPostOwner, deletePost);

postsRouter.patch("/:id/publish", isAuth, isPostOwner, publishPost);

postsRouter.patch("/:id/unpublish", isAuth, isPostOwner, unpublishPost);

postsRouter.get("/:id/comments", getPostComments);

export { postsRouter };
