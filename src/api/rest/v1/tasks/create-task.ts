import { type OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { TaskContentSchema, TaskDescriptionSchema, TaskSchema } from "./schema";

const NewTaskSchema = z
  .object({
    content: TaskContentSchema,
    description: TaskDescriptionSchema.optional(),
  })
  .openapi("NewTask");

const route = createRoute({
  method: "post",
  path: "/",
  description: "Creates a new task and returns it as a JSON object.",
  request: {
    body: {
      content: {
        "application/json": {
          schema: NewTaskSchema,
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TaskSchema,
        },
      },
      description: "Single task.",
    },
  },
  tags: ["Tasks"],
});

export const useCreateTask = (app: OpenAPIHono) =>
  app.openapi(route, (c) => {
    return c.json(
      {
        id: "01HWQM125WA32K8721A1V5D8TV",
        content: "Buy milk",
        description: "Buy 2% milk",
        is_completed: false,
        created_at: "2019-12-11T22:36:50.000000Z",
      },
      200,
    );
  });
