import {
  insertComment,
  deleteCommentById,
  updateCommentById,
} from "../db/commentsQueries.js";
import { findPostById } from "../db/postsQueries.js";
const now = new Date().toISOString();

export async function createComment(req, res, next) {
  try {
    // Get data
    const authorId = req.user.id;
    const postId = Number(req.body.postId);
    const content = req.body.content;
    await ensureCommentablePost(postId);
    // Save comment
    const comment = await insertComment(authorId, postId, content);
    console.log(
      `[${now}] [COMMENT] Comment ${comment.id} created by user ${req.user.id}`,
    );
    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
}

export async function updateComment(req, res, next) {
  try {
    // Get post
    const commentId = req.comment.id;
    // Get content
    const { content } = req.body;

    // Store comment
    const comment = await updateCommentById(commentId, content);
    console.log(
      `[${now}] [COMMENT] Comment ${commentId} updated by user ${req.user.id}`,
    );
    res.json(comment);
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req, res, next) {
  try {
    // Get comment
    const commentId = req.comment.id;
    // Delete comment
    const deletedComment = await deleteCommentById(commentId);
    console.log(
      `[${now}] [COMMENT] Comment ${commentId} deleted by user ${req.user.id}`,
    );
    res.json(deletedComment);
  } catch (error) {
    next(error);
  }
}

async function ensureCommentablePost(postId) {
  const post = await findPostById(postId);
  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    throw error;
  }
  if (!post.isPublished) {
    const error = new Error("Comments unavailable for this post");
    error.status = 403;
    throw error;
  }
}
