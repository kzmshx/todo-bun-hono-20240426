import { describe, expect, test } from "bun:test";
import app from "@/index";
import { TaskFactory } from "@/libs/prisma/factories";

describe("DELETE /rest/v1/tasks/{id}", () => {
  test("204 No Content", async () => {
    // Arrange
    const task = await TaskFactory.create();
    // Act
    const response = await app.request(`/rest/v1/tasks/${task.id}`, { method: "DELETE" });
    // Assert
    expect(response.status).toBe(204);
  });
});
