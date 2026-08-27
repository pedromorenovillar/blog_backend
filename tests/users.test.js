import supertest from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";

const request = supertest(app);

beforeEach(() => {
  return prisma.post
    .deleteMany() // Delete posts
    .then(() => {
      return prisma.user.deleteMany(); // Delete users
    });
});

test("POST /api/users/register creates a user", async () => {
  const newUser = {
    firstName: "Peter",
    lastName: "Parker",
    email: "peter.parker@example.com",
    password: "withagreatpower",
    passwordConfirm: "withagreatpower",
  };

  const res = await request.post("/api/users/register").send(newUser);

  // HTTP response
  expect(res.status).toBe(201); // Status is 201
  expect(res.body.message).toEqual("User registered successfully"); // Success message returned

  const user = await prisma.user.findFirst({
    where: {
      email: newUser.email,
    },
  });

  // Database mutation
  expect(user).not.toBeNull();
  expect(user.email).toBe(newUser.email); // stored email matches the submitted email

  // Password handling
  expect(user.password).not.toEqual(newUser.password); // password wasn't stored as plaintext
});
