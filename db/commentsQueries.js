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

export async function findCommentById(commentId) {
  return prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });
}

export async function findAllComments() {
  return prisma.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
