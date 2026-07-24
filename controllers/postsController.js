import slugify from "slugify";
import {
  insertPost,
  findPostsByAuthorId,
  findPublishedPosts,
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
    const result = await insertPost(userId, title, slug, content);

    res.status(201).json({
      result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllUserPosts(req, res, next) {
  try {
    // Get user
    const userId = req.user.id;

    // Get all posts
    const result = await findPostsByAuthorId(userId);
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
}
export async function getAllPublishedPosts(req, res, next) {
  try {
    // Get all posts
    const result = await findPublishedPosts();
    console.log({ result });
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
}
