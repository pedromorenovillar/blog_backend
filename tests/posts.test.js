import supertest from "supertest";
import app from "../app.js";

const request = supertest(app);

test("GET /api/posts returns published posts", async () => {
  const res = await request.get("/api/posts");
  expect(res.status).toBe(200);
});
