import { describe, expect, test } from "bun:test";
import app from "@/index";
import { TaskFactory } from "@/libs/prisma/factories";

describe("POST /rest/v1/tasks/{id}", () => {
  test("200 OK", async () => {
    // Arrange
    const task = await TaskFactory.create({
      content: "New task content",
      description: "New task description",
    });
    // Act
    const body = { content: "Updated task content" };
    const response = await app.request(`/rest/v1/tasks/${task.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // Assert
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      id: task.id,
      content: body.content,
      description: task.description,
      is_completed: task.isCompleted,
      created_at: task.createdAt.toISOString(),
    });
  });

  test("400 Bad Request - Too long content", async () => {
    // Arrange
    const task = await TaskFactory.create();
    // Act
    const body = { content: "a".repeat(501) };
    const response = await app.request(`/rest/v1/tasks/${task.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // Assert
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      message: "Validation Failed",
    });
  });
});
