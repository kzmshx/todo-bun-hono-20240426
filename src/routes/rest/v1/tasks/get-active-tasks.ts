import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { TaskIdsQuerySchema, TasksSchema } from "./schema";

export default new OpenAPIHono().openapi(
  createRoute({
    method: "get",
    path: "/",
    description: "Returns a JSON-encoded array containing all active tasks.",
    request: {
      query: z.object({
        ids: TaskIdsQuerySchema.optional(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: TasksSchema,
          },
        },
        description: "Single task.",
      },
    },
    tags: ["Tasks"],
  }),
  (c) => {
    return c.json(
      [
        {
          id: "01HWQM125WA32K8721A1V5D8TV",
          content: "Buy milk",
          description: "Buy 2% milk",
          is_completed: false,
          created_at: "2019-12-11T22:36:50.000000Z",
        },
      ],
      200,
    );
  },
);
