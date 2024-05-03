import { type OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { TaskContentSchema, TaskDescriptionSchema, TaskIdPathSchema, TaskSchema } from "./schema";

const UpdateTaskSchema = z
  .object({
    content: TaskContentSchema.optional(),
    description: TaskDescriptionSchema.optional(),
  })
  .openapi("UpdateTask");

const route = createRoute({
  method: "post",
  path: "/{id}",
  description: "Update a task.",
  request: {
    params: z.object({
      id: TaskIdPathSchema,
    }),
    body: {
      content: {
        "application/json": {
          schema: UpdateTaskSchema,
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

export const useUpdateTask = (app: OpenAPIHono) =>
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
