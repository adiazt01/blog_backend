import { app } from "../src/app";
import request from "supertest";

const admin = {
  username: "admin",
  password: "admin",
};

describe("POST api/admin/login", () => {
  test("don't allow to login with fields empty", async () => {
    const response = await request(app).post("/api/admin/login").send({});
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid username or password");
  });

  test("don't allow to login with wrong password and username", async () => {
    const response = await request(app)
      .post("/api/admin/login")
      .send({ username: "admin1", password: "admin1" });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid username or password");
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
    console.log(console.log(response.headers["set-cookie"][0]));
    expect(response.statusCode).toBe(200);
    expect(response.headers["set-cookie"][0]).toMatch(/token=;/);
  });
});
