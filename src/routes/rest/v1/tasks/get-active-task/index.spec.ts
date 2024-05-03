import { describe, expect, test } from "bun:test";
import { app } from "@/index";
import { TaskFactory } from "@/lib/prisma/factories";
import { ulid } from "ulid";

describe("GET /rest/v1/tasks/:id", () => {
  test("200 OK", async () => {
    // Arrange
    const task = await TaskFactory.create();
    // Act
    const response = await app.request(`/rest/v1/tasks/${task.id}`);
    // Assert
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      id: task.id,
      content: task.content,
      description: task.description,
      is_completed: task.isCompleted,
      created_at: task.createdAt.toISOString(),
    });
  });

  test("404 Not Found", async () => {
    // Act
    const response = await app.request(`/rest/v1/tasks/${ulid()}`);
    // Assert
    expect(response.status).toBe(404);
    expect(await response.json()).toMatchObject({
      message: "Task not found",
    });
  });
});
