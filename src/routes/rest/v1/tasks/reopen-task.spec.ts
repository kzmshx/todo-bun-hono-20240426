import { describe, expect, test } from "bun:test";
import { ulid } from "ulid";
import app from ".";

describe("POST /:id/reopen", () => {
  test("204 No Content", async () => {
    // Act
    const response = await app.request(`/${ulid()}/reopen`, { method: "POST" });
    // Assert
    expect(response.status).toBe(204);
  });
});
