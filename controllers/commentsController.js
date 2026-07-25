import {
  insertComment,
  findCommentById,
  findAllComments,
  deleteCommentById
} from "../db/commentsQueries.js";
import { findPostById } from "../db/postsQueries.js";

export async function createComment(req, res, next) {
  try {
    // Get data
    const authorId = req.user.id;
    const postId = Number(req.body.postId);
    const content = req.body.content;
    await ensureCommentablePost(postId);
    // Save comment
    const comment = await insertComment(authorId, postId, content);
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function updateComment(params) {}

export async function deleteComment(req, res, next) {
  try {
      // Get comment
      const commentId = req.comment.id;
      // Delete comment
      const deletedComment = await deleteCommentById(commentId);
      res.json(deletedComment);
    } catch (error) {
      next(error);
    }
}

async function ensureCommentablePost(postId) {
  const post = await findPostById(postId);
  if (!post) {
    const error = new Error("Invalid post id");
    error.status = 400;
    throw error;
  }
  if (!post.isPublished) {
    const error = new Error("Comments unavailable for this post");
    error.status = 403;
    throw error;
  }
}
