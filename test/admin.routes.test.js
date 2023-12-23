import { app } from "../src/app";
import request from "supertest";

const admin = {
	username: "admin",
	password: "admin",
};

const post = {
	title: "Introducción a la Programación en JavaScript",
	content:
		"Este artículo proporciona una introducción básica a la programación en JavaScript, un lenguaje de programación ampliamente utilizado en el desarrollo web. Cubriremos conceptos fundamentales como variables, funciones, bucles y mucho más.",
	tags: ["JavaScript", "Programación", "Desarrollo Web"],
};

describe("POST api/admin/login", () => {
	test("don't allow to login with fields empty", async () => {
		const response = await request(app).post("/api/admin/login").send({});
		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe("Invalid data on fields");
	});

	test("don't allow to login with wrong password and username", async () => {
		const response = await request(app)
			.post("/api/admin/login")
			.send({ username: "admin1", password: "admin1" });
		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe("Invalid data on fields");
	});

	test("allow to login with correct password and username", async () => {
		const response = await request(app).post("/api/admin/login").send(admin);
		expect(response.statusCode).toBe(200);
	});

	test("should return token in headers", async () => {
		const response = await request(app).post("/api/admin/login").send(admin);
		expect(response.statusCode).toBe(200);
		expect(response.headers["set-cookie"][0]).toMatch(/token=.+/);
	});
});

describe("GET api/admin/logout", () => {
	test("should clear token in headers", async () => {
		const responseLogin = await request(app)
			.post("/api/admin/login")
			.send(admin);
		expect(responseLogin.statusCode).toBe(200);
		const response = await request(app)
			.get("/api/admin/logout")
			.set("Cookie", [responseLogin.headers["set-cookie"][0]]);
		expect(response.statusCode).toBe(200);
		expect(response.headers["set-cookie"][0]).toMatch(/token=;/);
	});
});

describe("GET api/admin/posts", () => {
	test("don't allow to get posts without token", async () => {
		const response = await request(app).get("/api/admin/posts");
		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe("Unauthorized");
	});

	test("allow to get posts with token", async () => {
		const responseLogin = await request(app)
			.post("/api/admin/login")
			.send(admin);
		const response = await request(app)
			.get("/api/admin/posts")
			.set("Cookie", [responseLogin.headers["set-cookie"][0]]);
		expect(response.statusCode).toBe(200);
	});

	test("should return a array", async () => {
		const responseLogin = await request(app)
			.post("/api/admin/login")
			.send(admin);

		const response = await request(app)
			.get("/api/admin/posts")
			.set("Cookie", [responseLogin.headers["set-cookie"][0]]);

		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.body)).toBe(true);
	});
});

describe("POST api/admin/posts", () => {
	test("don't allow to create post without token", async () => {
		const response = await request(app).post("/api/admin/posts");
		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe("Unauthorized");
	});

	test("don't allow to create post with fields empty", async () => {
		const responseLogin = await request(app)
			.post("/api/admin/login")
			.send(admin);

		const response = await request(app)
			.post("/api/admin/posts")
			.set("Cookie", [responseLogin.headers["set-cookie"][0]])
			.send({});

		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe("Invalid data on fields");
	});

	test("allow to create post with token", async () => {
		const responseLogin = await request(app)
			.post("/api/admin/login")
			.send(admin);

		const response = await request(app)
			.post("/api/admin/posts")
			.set("Cookie", [responseLogin.headers["set-cookie"][0]])
			.send(post);

		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe("Create post successfully");
	});
});

describe("PUT api/admin/posts/:id", () => {
	test("don't allow to update post without token", async () => {
		const response = await request(app).put("/api/admin/posts/1");
		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe("Unauthorized");
	});

	test("don't allow to update post with fields empty", async () => {
		const responseLogin = await request(app)
			.post("/api/admin/login")
			.send(admin);

		const response = await request(app)
			.put("/api/admin/posts/1")
			.set("Cookie", [responseLogin.headers["set-cookie"][0]])
			.send({});

		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe("Invalid data on fields");
	});

	test("allow to update post with token", async () => {
		const responseLogin = await request(app)
			.post("/api/admin/login")
			.send(admin);

		const response = await request(app)
			.put("/api/admin/posts/clqdxqtzy0000ixtnrd3xr944")
			.set("Cookie", [responseLogin.headers["set-cookie"][0]])
			.send(post);
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe("Update post successfully");
	});
});

describe("DELETE api/admin/posts/:id", () => {
	test("don't allow to delete post without token", async () => {
		const response = await request(app).delete("/api/admin/posts/1");
		expect(response.statusCode).toBe(401);
		expect(response.body.message).toBe("Unauthorized");
	});

	test("allow to delete post with token", async () => {
		const responseLogin = await request(app)
			.post("/api/admin/login")
			.send(admin);

		const response = await request(app)
			.delete("/api/admin/posts/clqdxqtzy0000ixtnrd3xr944")
			.set("Cookie", [responseLogin.headers["set-cookie"][0]]);
		expect(response.statusCode).toBe(200);
		expect(response.body.message).toBe("Delete post successfully");
	});
});
