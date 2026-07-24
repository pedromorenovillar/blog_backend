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
