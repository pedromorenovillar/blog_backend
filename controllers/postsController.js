import slugify from "slugify";
import {
  insertPost,
  findPostsByAuthorId,
  findPublishedPosts,
  findPostById,
  updatePostById,
  deletePostById,
  updatePostPublishedStatus,
  findAllPostComments,
} from "../db/postsQueries.js";

export async function createPost(req, res, next) {
  try {
    // Get user
    const userId = req.user.id;
    // Get title and content
    const { title, content } = req.body;
    // Create slug from title
    const slug = slugify(title, { lower: true, strict: true });

    // Store post
    const post = await insertPost(userId, title, slug, content);

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
}

export async function getAllUserPosts(req, res, next) {
  try {
    // Get user
    const userId = req.user.id;

    // Get all posts
    const posts = await findPostsByAuthorId(userId);
    res.json(posts);
  } catch (error) {
    next(error);
  }
}

export async function getAllPublishedPosts(req, res, next) {
  try {
    // Get all posts
    const posts = await findPublishedPosts();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
}

export async function getSinglePost(req, res, next) {
  try {
    // Retrieve id from params and convert it to int
    const postId = Number(req.params.id);
    // Get single post
    const post = await findPostById(postId);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
}

export async function updatePost(req, res, next) {
  try {
    // Get post
    const postId = req.post.id;
    // Get title and content
    const { title, content } = req.body;
    // Create slug from title
    const slug = slugify(title, { lower: true, strict: true });

    // Store post
    const post = await updatePostById(postId, title, slug, content);

    res.json(post);
  } catch (error) {
    next(error);
  }
}

export async function deletePost(req, res, next) {
  try {
    // Get post
    const postId = req.post.id;
    // Delete post
    const deletedPost = await deletePostById(postId);
    res.json(deletedPost);
  } catch (error) {
    next(error);
  }
}

export async function publishPost(req, res, next) {
  try {
    // Get post
    const postId = req.post.id;
    // Change isPublished status
    const publishedPost = await updatePostPublishedStatus(postId, true);
    res.json(publishedPost);
  } catch (error) {
    next(error);
  }
}
export async function unpublishPost(req, res, next) {
  try {
    // Get post
    const postId = req.post.id;
    // Change isPublished status
    const publishedPost = await updatePostPublishedStatus(postId, false);
    res.json(publishedPost);
  } catch (error) {
    next(error);
  }
}

export async function getPostComments(req, res, next) {
  try {
    // Get post
    const postId = Number(req.params.id);
    const post = await findPostById(postId);

    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      throw error;
    }
    // Change isPublished status
    const comments = await findAllPostComments(postId);

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}
