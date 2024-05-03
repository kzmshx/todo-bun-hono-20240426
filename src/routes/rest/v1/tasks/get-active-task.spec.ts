import { describe, expect, test } from "bun:test";
import app from "@/index";
import { TaskFactory } from "@/lib/prisma/factories";

describe("GET /:id", () => {
  test("200 OK", async () => {
    // Arrange
    const task = await TaskFactory.create();
    console.log(task);
    // Act
    const response = await app.request(`/rest/v1/tasks/${task.id}`);
    console.log(response);
    // Assert
    expect(response.status).toBe(200);
  });
});
