import { describe, expect, test } from "bun:test";
import { app } from "@/index";
import { TaskFactory } from "@/libs/prisma/factories";

describe("GET /rest/v1/tasks", () => {
  test("200 OK", async () => {
    // Arrange
    const activeTasks = await TaskFactory.createList(3);
    // Completed task should not be included
    await TaskFactory.create({ isCompleted: true });
    // Act
    const response = await app.request("/rest/v1/tasks");
    // Assert
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject(
      activeTasks
        .toSorted((a, b) => a.id.localeCompare(b.id))
        .map((task) => ({
          id: task.id,
          content: task.content,
          description: task.description,
          is_completed: task.isCompleted,
          created_at: task.createdAt.toISOString(),
        })),
    );
  });
});
