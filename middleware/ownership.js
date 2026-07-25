import { findPostById } from "../db/postsQueries.js";
import { findCommentById } from "../db/commentsQueries.js";

function isResourceOwner(findResource, ownerField, resourceName) {
  return async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      if (Number.isNaN(id)) {
        const error = new Error(`Invalid ${resourceName} id`);
        error.status = 400;
        throw error;
      }
      const resource = await findResource(id);

      if (!resource) {
        const error = new Error(`${resourceName} not found`);
        error.status = 404;
        throw error;
      }

      if (resource[ownerField] !== req.user.id) {
        const error = new Error("Forbidden");
        error.status = 403;
        throw error;
      }

      req[resourceName] = resource;
      next();
    } catch (error) {
      next(error);
    }
  };
}

export const isPostOwner = isResourceOwner(findPostById, "authorId", "post");

export const isCommentOwner = isResourceOwner(
  findCommentById,
  "authorId",
  "comment",
);
