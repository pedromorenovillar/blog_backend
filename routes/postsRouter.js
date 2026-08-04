import { Router } from "express";
import { isAuth } from "../middleware/auth.js";
import { isWriter } from "../middleware/writer.js";
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
  validatePostId,
} from "../validators/postsValidator.js";

const postsRouter = Router();

postsRouter.post("/", isAuth, isWriter, validatePost, createPost);

postsRouter.get("/me", isAuth, getAllUserPosts);

postsRouter.get("/", getAllPublishedPosts);

postsRouter.get("/:id", getSinglePost);

postsRouter.put(
  "/:id",
  isAuth,
  isWriter,
  validateUpdatePost,
  isPostOwner,
  updatePost,
);

postsRouter.delete(
  "/:id",
  isAuth,
  isWriter,
  validatePostId,
  isPostOwner,
  deletePost,
);

postsRouter.patch(
  "/:id/publish",
  isAuth,
  isWriter,
  validatePostId,
  isPostOwner,
  publishPost,
);

postsRouter.patch(
  "/:id/unpublish",
  isAuth,
  isWriter,
  validatePostId,
  isPostOwner,
  unpublishPost,
);

postsRouter.get("/:id/comments", getPostComments);

export { postsRouter };
