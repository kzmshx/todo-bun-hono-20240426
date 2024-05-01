import { type OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { TaskIdPathSchema } from "./schema";

const route = createRoute({
  method: "delete",
  path: "/{id}",
  description: "Deletes a task.",
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

export const useDeleteTask = (app: OpenAPIHono) =>
  app.openapi(route, (c) => {
    return c.body(null, 204);
  });
