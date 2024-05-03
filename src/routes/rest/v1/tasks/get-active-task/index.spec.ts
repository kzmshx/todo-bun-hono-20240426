import { describe, expect, test } from "bun:test";
import { app } from "@/index";
import { TaskFactory } from "@/libs/prisma/factories";
import { ulid } from "ulid";

describe("GET /rest/v1/tasks/:id", () => {
  test("200 OK", async () => {
    // Arrange
    const activeTask = await TaskFactory.create({ isCompleted: false });
    // Act
    const response = await app.request(`/rest/v1/tasks/${activeTask.id}`);
    // Assert
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      id: activeTask.id,
      content: activeTask.content,
      description: activeTask.description,
      is_completed: activeTask.isCompleted,
      created_at: activeTask.createdAt.toISOString(),
    });
  });

  test("404 Not Found - Completed Task", async () => {
    // Arrange
    const completedTask = await TaskFactory.create({ isCompleted: true });
    // Act
    const response = await app.request(`/rest/v1/tasks/${completedTask.id}`);
    // Assert
    expect(response.status).toBe(404);
    expect(await response.json()).toMatchObject({
      message: "Task not found",
    });
  });

  test("404 Not Found - Non Existent Task", async () => {
    // Act
    const response = await app.request(`/rest/v1/tasks/${ulid()}`);
    // Assert
    expect(response.status).toBe(404);
    expect(await response.json()).toMatchObject({
      message: "Task not found",
    });
  });
});
