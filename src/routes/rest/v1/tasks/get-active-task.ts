import { type OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { TaskIdPathSchema, TaskSchema } from "./schema";

const route = createRoute({
  method: "get",
  path: "/{id}",
  description: "Returns a single active (non-completed) task by ID as a JSON object.",
  request: {
    params: z.object({
      id: TaskIdPathSchema,
    }),
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

export const useGetActiveTask = (app: OpenAPIHono) =>
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
