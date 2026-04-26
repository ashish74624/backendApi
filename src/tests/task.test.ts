// tests/task.test.ts
import request from "supertest";
import app from "../app";

let token = "";
let taskId = "";

beforeAll(async () => {
    const email = "taskuser@gmail.com";
    const password = "123456";

    // Register user first
    await request(app)
        .post("/auth/register")
        .send({
            name: "Task User",
            email,
            password
        });

    // Then login to get token
    const loginRes = await request(app)
        .post("/auth/login")
        .send({
            email,
            password
        });

    token = loginRes.body.token;
});

describe("Task APIs", () => {
    it("should create task", async () => {
        const res = await request(app)
            .post("/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Build Backend",
                description: "Complete task module",
                status: "todo",
                priority: "high",
                dueDate: "2026-05-10"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("Build Backend");

        taskId = res.body._id;
    });

    it("should get all tasks", async () => {
        const res = await request(app)
            .get("/tasks")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should get task by id", async () => {
        const res = await request(app)
            .get(`/tasks/${taskId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });

    it("should update task", async () => {
        const res = await request(app)
            .put(`/tasks/${taskId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                status: "done"
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("done");
    });

    it("should delete task", async () => {
        const res = await request(app)
            .delete(`/tasks/${taskId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
    });
});