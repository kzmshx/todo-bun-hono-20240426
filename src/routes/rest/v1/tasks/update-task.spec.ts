import { describe, expect, test } from "bun:test";
import { ulid } from "ulid";
import app from ".";

describe("POST /:id", () => {
  test("200 OK", async () => {
    // Act
    const body = { content: "An updated task" };
    const response = await app.request(`/${ulid()}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // Assert
    expect(response.status).toBe(200);
  });
});
