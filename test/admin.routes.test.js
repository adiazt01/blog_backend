import { app } from "../src/app";
import request from "supertest";

const admin = {
  username: "admin",
  password: "admin",
};

describe("POST api/admin", () => {
  test("don't allow to login with fields empty", async () => {
    const response = await request(app).post("/api/admin").send({});
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid username or password");
  })

  test("don't allow to login with wrong password and username", async () => {
    const response = await request(app)
      .post("/api/admin")
      .send({ username: "admin1", password: "admin1" });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid username or password");
  });

  test("allow to login with correct password and username", async () => {
    const response = await request(app).post("/api/admin").send(admin);
    expect(response.statusCode).toBe(200);
  })

  test("should return token in headers", async () => {
    const response = await request(app).post("/api/admin").send(admin);
    expect(response.statusCode).toBe(200);
    expect(response.headers["set-cookie"][0]).toMatch(/token=.+/);
  })
});
