import { app, prisma } from "../src/app";
import request from "supertest";

const admin = {
  username: "admin",
  password: "admin",
};

const post = {
  title: "test",
  content: "test",
  tags: ["test", "test1", "test2"],
};

beforeEach(async () => {
  await prisma.tag.deleteMany();
  await prisma.post.deleteMany();
  prisma.$disconnect();
});

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

// Deberia de validar si tiene token
// y luego traer los posts
describe("GET api/admin/posts", () => {
  test("dont allow to get posts without token", async () => {
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
  test("dont allow to create post without token", async () => {
    const response = await request(app).post("/api/admin/posts");
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  test("don't allow to create post with fields empty", async () => {
    const responseLogin = await request(app)
      .post("/api/admin/login")
      .send(admin);

    const response = await request(app)
      .post("/api/admin/posts").set("Cookie", [responseLogin.headers["set-cookie"][0]]).send({});

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid data on fields");
  });

  test("allow to create post with token", async () => {
    const responseLogin = await request(app)
      .post("/api/admin/login")
      .send(admin);

    const response = await request(app)
      .post("/api/admin/posts").set("Cookie", [responseLogin.headers["set-cookie"][0]]).send(post);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Create post successfully");
  });
});