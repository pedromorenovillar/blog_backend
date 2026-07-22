import prisma from "./lib/prisma.js";

console.log("Prisma client initialized!");

await prisma.$disconnect();
