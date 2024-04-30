import { describe, expect, test } from "bun:test";
import app from ".";

describe("POST /:id/close", () => {
  test("204 No Content", async () => {
    // Act
    const response = await app.request("/123/close", { method: "POST" });
    // Assert
    expect(response.status).toBe(204);
  });
});
