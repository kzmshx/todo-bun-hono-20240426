import { type OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { TaskIdPathSchema } from "./schema";

const route = createRoute({
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
});

export const useReopenTask = (app: OpenAPIHono) =>
  app.openapi(route, (c) => {
    return c.body(null, 204);
  });
