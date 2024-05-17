import { createOpenAPIApp } from "@/libs/hono/factory";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import {
  RestTaskSchema,
  TaskContentSchema,
  TaskDescriptionSchema,
  TaskIdPathSchema,
} from "./schema";

const UpdateTaskSchema = z
  .object({
    content: TaskContentSchema.optional(),
    description: TaskDescriptionSchema.optional(),
  })
  .openapi("UpdateTask");

export default createOpenAPIApp().openapi(
  createRoute({
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
            schema: RestTaskSchema,
          },
        },
        description: "Single task.",
      },
    },
    tags: ["Tasks"],
  }),
  (c) => {
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
  },
);
