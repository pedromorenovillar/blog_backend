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

export async function deleteUsers(req, res) {
  return await prisma.user.deleteMany();
}

