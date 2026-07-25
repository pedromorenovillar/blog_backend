import { Router } from "express";
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
  validatePostId,
} from "../validators/postsValidator.js";

const postsRouter = Router();

postsRouter.post("/", isAuth, validatePost, createPost);

postsRouter.get("/me", isAuth, getAllUserPosts);

postsRouter.get("/", getAllPublishedPosts);

postsRouter.get("/:id", getSinglePost);

postsRouter.put("/:id", isAuth, validateUpdatePost, isPostOwner, updatePost);

postsRouter.delete("/:id", isAuth, validatePostId, isPostOwner, deletePost);

postsRouter.patch("/:id/publish", isAuth, validatePostId, isPostOwner, publishPost);

postsRouter.patch("/:id/unpublish", isAuth, validatePostId, isPostOwner, unpublishPost);

postsRouter.get("/:id/comments", getPostComments);

export { postsRouter };
