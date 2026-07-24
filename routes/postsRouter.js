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
} from "../controllers/postsController.js";
// import { validatePost } from "../validators/postsValidator.js";

const postsRouter = Router();

postsRouter.post("/me", isAuth, createPost);

postsRouter.get("/me", isAuth, getAllUserPosts);

postsRouter.get("/", getAllPublishedPosts);

postsRouter.get("/:id", getSinglePost);

postsRouter.put("/:id", isAuth, isPostOwner, updatePost);

postsRouter.delete("/:id", isAuth, isPostOwner, deletePost);

postsRouter.patch("/:id/publish", isAuth, isPostOwner, publishPost);

postsRouter.patch("/:id/unpublish", isAuth, isPostOwner, unpublishPost);

export { postsRouter };
