import { describe, expect, test } from "bun:test";
import app from ".";

describe("GET /", () => {
  test("200 OK", async () => {
    // Act
    const response = await app.request("/");
    // Assert
    expect(response.status).toBe(200);
  });
});
