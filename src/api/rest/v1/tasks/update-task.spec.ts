import { describe, expect, test } from "bun:test";
import app from ".";

describe("POST /:id", () => {
  test("200 OK", async () => {
    // Act
    const body = { content: "An updated task" };
    const response = await app.request("/123", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // Assert
    expect(response.status).toBe(200);
  });
});
