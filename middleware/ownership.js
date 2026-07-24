import { findPostById } from "../db/postsQueries.js";

export async function isPostOwner(req, res, next) {
  try {
    const postId = Number(req.params.id);
    if (Number.isNaN(postId)) {
      const error = new Error("Invalid post id");
      error.status = 400;
      throw error;
    }
    const post = await findPostById(postId);

    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      throw error;
    }

    if (post.authorId !== req.user.id) {
      const error = new Error("Forbidden");
      error.status = 403;
      throw error;
    }

    req.post = post;
    next();
  } catch (error) {
    next(error);
  }
}
