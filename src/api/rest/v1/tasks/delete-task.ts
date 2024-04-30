import { type OpenAPIHono, createRoute } from "@hono/zod-openapi";

const route = createRoute({
  method: "delete",
  path: "/:id",
  description: "Deletes a task.",
  responses: {
    204: {
      description: "An empty body.",
    },
  },
});

export const useDeleteTask = (app: OpenAPIHono) =>
  app.openapi(route, (c) => {
    return c.body(null, 204);
  });
