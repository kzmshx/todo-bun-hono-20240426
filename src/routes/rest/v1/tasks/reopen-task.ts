import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { TaskIdPathSchema } from "./schema";

export default new OpenAPIHono().openapi(
  createRoute({
    method: "post",
    path: "/{id}/reopen",
    description: "Reopens a task.",
    request: {
      params: z.object({
        id: TaskIdPathSchema,
      }),
    },
    responses: {
      204: {
        description: "Empty body.",
      },
    },
    tags: ["Tasks"],
  }),
  (c) => {
    return c.body(null, 204);
  },
);
