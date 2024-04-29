import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { TaskContentSchema, TaskDescriptionSchema, TaskIdSchema } from "./domain/task";

const app = new Hono();

export const GetActiveTasksQuerySchema = z.object({
  ids: z
    .string()
    .transform((v) => v.split(","))
    .pipe(z.array(TaskIdSchema))
    .optional(),
});

app.get("/", zValidator("query", GetActiveTasksQuerySchema), (c) => {
  const query = c.req.valid("query");
  return c.text(`Get active tasks: ${JSON.stringify(query)}`, 200);
});

export const CreateTaskBodySchema = z.object({
  content: TaskContentSchema,
  description: TaskDescriptionSchema.optional(),
});

app.post("/", zValidator("json", CreateTaskBodySchema), (c) => {
  const body = c.req.valid("json");
  return c.text(`Create a new task: ${JSON.stringify(body)}`, 200);
});

app.get("/:id", (c) => {
  const id = c.req.param("id");
  return c.text(`Get an active task: ${id}`, 200);
});

export const UpdateTaskBodySchema = z.object({
  content: TaskContentSchema.optional(),
  description: TaskDescriptionSchema.optional(),
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
