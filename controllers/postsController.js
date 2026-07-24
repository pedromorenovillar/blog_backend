import slugify from "slugify";
import { insertPost } from "../db/postsQueries.js";

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
      message: "Post saved correctly!",
      post: result,
    });
  } catch (error) {
    next(error);
  }
}
