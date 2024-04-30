import { describe, expect, it } from "bun:test";
import app from ".";

describe("index", () => {
  describe("GET /rest/v1/health", () => {
    it("200 OK", async () => {
      // Act
      const response = await app.request("/rest/v1/health");
      // Assert
      expect(response.status).toBe(200);
    });
  });
});
