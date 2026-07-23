import prisma from "../lib/prisma.js";

export async function findUserByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}
export async function insertUser(user, hash) {
  return prisma.user.create({
    data: {
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      password: hash,
    },
  });
}
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
export async function deleteUsers(req, res) {
  return await prisma.user.deleteMany();
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
