import supertest from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";

const request = supertest(app);

beforeEach(()=> {
  return prisma.post.deleteMany().then(() => {
    return prisma.post.createMany({
    data: [{
      authorId: 1,
      title: "Test post",
      slug: "test-post",
      content: "post content",
      isPublished: true
    },
    {
      authorId: 1,
      title: "Test post 2",
      slug: "test-post-2",
      content: "post content",
      isPublished: true
    },
    {
      authorId: 1,
      title: "Test post 3",
      slug: "test-post-3",
      content: "post content",
      isPublished: false
    }],
  });
  })
})

test("GET /api/posts returns published posts", async () => {
  const res = await request.get("/api/posts");
  expect(res.status).toBe(200);
});
