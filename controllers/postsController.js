import slugify from "slugify";
import {
  insertPost,
  findPostsByAuthorId,
  findPublishedPosts,
  findPostByPostId,
  updatePostByPostId,
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
    const post = await findPostByPostId(postId);
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
    const post = await updatePostByPostId(postId, title, slug, content);

    res.json(post);
  } catch (error) {
    next(error);
  }
}


