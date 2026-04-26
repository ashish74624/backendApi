// tests/auth.test.ts
import request from "supertest";
import app from "../app"

describe("Auth APIs", () => {
  

    it("should login user", async () => {
        await request(app)
            .post("/auth/register")
            .send({
                name: "Login User",
                email: "login@gmail.com",
                password: "123456"
            });

        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "login@gmail.com",
                password: "123456"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it("should fail login with wrong password", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "login@gmail.com",
                password: "wrongpass"
            });

        expect(res.statusCode).toBe(401);
    });

    it("should fail login with unregistered email", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "nouser@gmail.com",
                password: "123456"
            });

        expect(res.statusCode).toBe(401);
    });
});