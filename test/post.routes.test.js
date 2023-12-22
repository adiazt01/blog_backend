import request from "supertest";
import { app } from "../src/app";

describe("POST api/posts", () => {
	test("should return 200 status code", async () => {
		const response = await request(app).post("/api/posts");
		expect(response.statusCode).toBe(200);
	});
});
