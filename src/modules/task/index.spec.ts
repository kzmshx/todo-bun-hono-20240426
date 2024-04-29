import { describe, expect, test } from "bun:test";
import app from ".";

describe("index", () => {
  describe("GET /", () => {
    test("200 OK", async () => {
      // Act
      const response = await app.request("/");
      // Assert
      expect(response.status).toBe(200);
      expect(await response.text()).toBe("Get active tasks: {}");
    });
  });

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
      expect(await response.text()).toBe(`Create a new task: ${JSON.stringify(body)}`);
    });
  });

  describe("GET /:id", () => {
    test("200 OK", async () => {
      // Act
      const response = await app.request("/123");
      // Assert
      expect(response.status).toBe(200);
      expect(await response.text()).toBe("Get an active task: 123");
    });
  });

  describe("POST /:id", () => {
    test("200 OK", async () => {
      // Act
      const body = { content: "An updated task" };
      const response = await app.request("/123", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      // Assert
      expect(response.status).toBe(200);
      expect(await response.text()).toBe(`Update a task: 123; ${JSON.stringify(body)}`);
    });
  });

  describe("POST /:id/close", () => {
    test("204 No Content", async () => {
      // Act
      const response = await app.request("/123/close", { method: "POST" });
      // Assert
      expect(response.status).toBe(204);
      expect(await response.text()).toBe("Close a task: 123");
    });
  });

  describe("POST /:id/reopen", () => {
    test("204 No Content", async () => {
      // Act
      const response = await app.request("/123/reopen", { method: "POST" });
      // Assert
      expect(response.status).toBe(204);
      expect(await response.text()).toBe("Reopen a task: 123");
    });
  });

  describe("DELETE /:id", () => {
    test("204 No Content", async () => {
      // Act
      const response = await app.request("/123", { method: "DELETE" });
      // Assert
      expect(response.status).toBe(204);
      expect(await response.text()).toBe("Delete a task: 123");
    });
  });
});
