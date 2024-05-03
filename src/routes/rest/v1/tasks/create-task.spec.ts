import { describe, expect, test } from "bun:test";
import app from ".";

describe("POST /", () => {
  test("200 OK", async () => {
    // Act
    const body = { content: "A new task" };
    const response = await app.request("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    // Assert
    expect(response.status).toBe(200);
  });
});
