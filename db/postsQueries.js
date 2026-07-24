import prisma from "../lib/prisma.js";

export async function insertPost(userId, title, slug, content) {
  return prisma.post.create({
    data: {
      authorId: userId,
      title,
      slug,
      content,
    },
  });
}

export async function findPostsByAuthorId(userId) {
  return prisma.post.findMany({
    where: { authorId: userId },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findPublishedPosts() {
  return prisma.post.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findPostById(postId) {
  return prisma.post.findFirst({
    where: { id: postId },
  });
}

export async function updatePostById(postId, title, slug, content) {
  return prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      title,
      slug,
      content,
    },
  });
}

export async function deletePostById(postId) {
  return prisma.post.delete({
    where: {
      id: postId,
    },
  });
}
