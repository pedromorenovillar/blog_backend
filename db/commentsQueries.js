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

export async function findCommentById(id) {
  return prisma.comment.findUnique({
    where: {
      id,
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

export async function deleteCommentById(id) {
  return prisma.comment.delete({
    where: {
      id,
    },
  });
}

export async function updateCommentById(id, content) {
  return prisma.comment.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });
}
