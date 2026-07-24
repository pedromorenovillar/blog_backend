import prisma from "../lib/prisma.js";


export async function insertComment(authorId, postId, content) {
  return prisma.comment.create({
    data: {
      authorId,
      postId,
      content,
    },
  });
}