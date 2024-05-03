import { describe, expect, it } from "bun:test";
import app from ".";

describe("GET /health", () => {
  it("200 OK", async () => {
    // Act
    const response = await app.request("/health");
    // Assert
    expect(response.status).toBe(200);
  });
});
