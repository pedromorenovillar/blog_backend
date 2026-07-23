import prisma from "../lib/prisma.js";

export async function getUserToken(userId) {
  return prisma.refreshToken.findFirst({
    where: {
      userId,
    },
  });
}
export async function deleteRefreshToken(userId) {
  return prisma.refreshToken.deleteMany({
    where: {
      userId,
    },
  });
}
export async function addRefreshToken(
  userId,
  refreshTokenHash,
  expirationDate,
) {
  await prisma.refreshToken.deleteMany({
    where: {
      userId: userId,
    },
  });
  return await prisma.refreshToken.create({
    data: {
      hash: refreshTokenHash,
      userId,
      expiresAt: expirationDate,
    },
  });
}
