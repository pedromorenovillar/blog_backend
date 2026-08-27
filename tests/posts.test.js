import supertest from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";

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
