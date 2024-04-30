import { describe, expect, test } from "bun:test";
import app from ".";

describe("GET /:id", () => {
  test("200 OK", async () => {
    // Act
    const response = await app.request("/01HWQM125WA32K8721A1V5D8TV");
    // Assert
    expect(response.status).toBe(200);
  });
});
