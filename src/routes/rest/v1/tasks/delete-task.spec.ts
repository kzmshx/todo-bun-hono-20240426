import { describe, expect, test } from "bun:test";
import { ulid } from "ulid";
import app from ".";

describe("DELETE /:id", () => {
  test("204 No Content", async () => {
    // Act
    const response = await app.request(`/${ulid()}`, { method: "DELETE" });
    // Assert
    expect(response.status).toBe(204);
  });
});
