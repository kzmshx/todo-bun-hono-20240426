import { describe, expect, it } from "bun:test";
import app from ".";

describe("index", () => {
  describe("GET /", () => {
    it("200 OK", async () => {
      // Act
      const response = await app.request("/");
      // Assert
      expect(response.status).toBe(200);
      expect(await response.text()).toBe("Hello Hono!");
    });
  });
});
