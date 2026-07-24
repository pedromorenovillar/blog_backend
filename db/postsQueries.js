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
