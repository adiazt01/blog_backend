import { app } from "../src/app";
import request from "supertest";

describe("POST api/posts/search", () => {
  test("should return an array", async () => {
    const response = await request(app).get("/api/posts/search/test");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET api/posts", () => {
  test("should return an array", async () => {
    const response = await request(app).get("/api/posts?page=1&limit=10");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
