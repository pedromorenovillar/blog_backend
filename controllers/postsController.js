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
const now = new Date().toISOString();

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
    console.log(
      `[${now}] [POST] Post ${post.id} created by user ${req.user.id}`,
    );
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
    res.json(posts);
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
    if (!post) {
      const error = new Error("Post not found");
      error.status = 404;
      throw error;
    }
    res.json(post);
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
    console.log(
      `[${now}] [POST] Post ${postId} updated by user ${req.user.id}`,
    );
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
    console.log(
      `[${now}] [POST] Post ${postId} deleted by user ${req.user.id}`,
    );
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
    const post = await updatePostPublishedStatus(postId, true);
    console.log(
      `[${now}] [POST] Post ${postId} published by user ${req.user.id}`,
    );
    res.json(post);
  } catch (error) {
    next(error);
  }
}
export async function unpublishPost(req, res, next) {
  try {
    // Get post
    const postId = req.post.id;
    // Change isPublished status
    const post = await updatePostPublishedStatus(postId, false);
    console.log(
      `[${now}] [POST] Post ${postId} published by user ${req.user.id}`,
    );
    res.json(post);
  } catch (error) {
    next(error);
  }
}

export async function getPostComments(req, res, next) {
  try {
    // Get post
    const postId = Number(req.params.id);
    const post = await findPostById(postId);

    if (!post || !post.isPublished) {
      const error = new Error("Post not found");
      error.status = 404;
      throw error;
    }
    // Change isPublished status
    const comments = await findAllPostComments(postId);

    res.json(comments);
  } catch (error) {
    next(error);
  }
}
