import supertest from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";
import { hashString } from "../utils/hashString.js";

const request = supertest(app);

beforeEach(() => {
  return prisma.post
    .deleteMany() // Delete posts
    .then(() => {
      return prisma.user.deleteMany(); // Delete users
    })
    .then(() => {
      return prisma.user.create({
        // Create test user
        data: {
          firstname: "Peter",
          lastname: "Parker",
          email: "spidey@example.com",
          password: "withagreatpower",
        },
      });
    })
    .then((user) => {
      // Chaining: the result of create() arrives in user
      return user.id; // get user.id
    })
    .then((userId) => {
      return prisma.post.createMany({
        // create 3 test posts
        data: [
          {
            authorId: userId,
            title: "Test post",
            slug: "test-post",
            content: "post content",
            isPublished: true,
          },
          {
            authorId: userId,
            title: "Test post 2",
            slug: "test-post-2",
            content: "post content",
            isPublished: true,
          },
          {
            authorId: userId,
            title: "Test post 3",
            slug: "test-post-3",
            content: "post content",
            isPublished: false,
          },
        ],
      });
    });
});

test("GET /api/posts returns published posts", async () => {
  const res = await request.get("/api/posts");
  expect(res.status).toBe(200); // Status is 200
  expect(res.body.length).toBe(2); // There are 2 posts
  expect(res.body).toContainEqual(
    expect.objectContaining({
      title: "Test post", // "Test post" is present
    }),
  );
  expect(res.body).toContainEqual(
    expect.objectContaining({
      title: "Test post 2", // "Test post 2" is present
    }),
  );
  expect(res.body.some((post) => post.title === "Test post 3")).toBe(false); // no post has title "Test post 3"
});

test("Unauthenticated POST /api/posts returns 401", async () => {
  const res = await request.post("/api/posts").send({
    title: "Test post",
    content: "Test post content",
  });
  expect(res.status).toBe(401); // Status is 401
});

test("Authenticated user can create a post", async () => {
  // Create hash
  const password = "withagreatpower";
  const hash = await hashString(password);

  // Create author
  const author = await prisma.user.create({
    data: {
      firstname: "Peter",
      lastname: "Porker",
      email: "porky@example.com",
      password: hash,
      isAuthor: true,
    },
  });

  // Create post
  const newPost = {
    title: "Test post",
    content: "Test post content",
  };

  // Login author
  const loginRes = await request.post("/api/users/login").send({
    email: author.email,
    password: password,
  });
  expect(loginRes.status).toBe(200); // Login successful

  const accessToken = loginRes.body.accessToken;
  expect(accessToken).toEqual(expect.any(String)); // Token is a string

  const postRes = await request
    .post("/api/posts")
    .set("Authorization", `Bearer ${accessToken}`)
    .send(newPost);
  expect(postRes.status).toBe(201);

  // Database mutation
  const createdPost = await prisma.post.findFirst({
    where: {
      authorId: author.id,
      title: newPost.title,
    },
  });
  // Database mutation
  expect(createdPost).not.toBeNull();
  expect(createdPost.title).toBe(newPost.title);
  expect(createdPost.content).toBe(newPost.content);
  expect(createdPost.authorId).toBe(author.id);
});
