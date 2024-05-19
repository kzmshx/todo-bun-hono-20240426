import { describe, expect, test } from "bun:test";
import app from "@/index";
import { TaskFactory } from "@/libs/prisma/factories";
import { ulid } from "ulid";

describe("POST /rest/v1/tasks/{id}/close", () => {
  test("204 No Content", async () => {
    // Arrange
    const task = await TaskFactory.create({ isCompleted: false });
    // Act
    const response = await app.request(`/rest/v1/tasks/${task.id}/close`, { method: "POST" });
    // Assert
    expect(response.status).toBe(204);
  });

  test("404 Not Found", async () => {
    // Act
    const response = await app.request(`/rest/v1/tasks/${ulid()}/close`, { method: "POST" });
    // Assert
    expect(response.status).toBe(404);
    expect(await response.json()).toMatchObject({
      message: "Task not found",
    });
  });
});
