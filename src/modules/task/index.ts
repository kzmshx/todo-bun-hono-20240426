import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { CreateTaskBodySchema, GetActiveTasksQuerySchema, UpdateTaskBodySchema } from "./schemas";

const app = new Hono();

app.get("/", zValidator("query", GetActiveTasksQuerySchema), (c) => {
  const query = c.req.valid("query");
  return c.text(`Get active tasks: ${JSON.stringify(query)}`, 200);
});

app.post("/", zValidator("json", CreateTaskBodySchema), (c) => {
  const body = c.req.valid("json");
  return c.text(`Create a new task: ${JSON.stringify(body)}`, 200);
});

app.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.text(`Get an active task: ${id}`, 200);
});

app.post("/:id", zValidator("json", UpdateTaskBodySchema), (c) => {
  const id = c.req.param("id");
  const body = c.req.valid("json");
  return c.text(`Update a task: ${id}; ${JSON.stringify(body)}`, 200);
});

app.post("/:id/close", (c) => {
  const id = c.req.param("id");
  return c.text(`Close a task: ${id}`, 204);
});

app.post("/:id/reopen", (c) => {
  const id = c.req.param("id");
  return c.text(`Reopen a task: ${id}`, 204);
});

app.delete("/:id", (c) => {
  const id = c.req.param("id");
  return c.text(`Delete a task: ${id}`, 204);
});

export default app;
