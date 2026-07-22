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

export function logoutUser(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.render("status", {
      pageTitle: "Logged out",
      title: "Log out",
      message: "You have logged out correctly.",
      redirectTo: "/",
      redirectDelay: 2500,
    });
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
  return await prisma.refreshToken.create({
    data: {
      hash: refreshTokenHash,
      userId,
      expiresAt: expirationDate,
    },
  });
}
