import { describe, expect, test } from "bun:test";
import { app } from "@/index";

describe("POST /rest/v1/tasks", () => {
  test("200 OK", async () => {
    // Act
    const body = { content: "A new task" };
    const response = await app.request("/rest/v1/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // Assert
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      content: body.content,
      description: null,
      is_completed: false,
    });
  });

  test("400 Bad Request - Missing content", async () => {
    // Act
    const body = {};
    const response = await app.request("/rest/v1/tasks", {
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
