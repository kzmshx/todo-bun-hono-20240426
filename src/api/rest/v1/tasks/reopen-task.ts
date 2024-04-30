import { type OpenAPIHono, createRoute } from "@hono/zod-openapi";

const route = createRoute({
  method: "post",
  path: "/:id/reopen",
  description: "Reopens a task.",
  responses: {
    204: {
      description: "An empty body.",
    },
  },
});

export const useReopenTask = (app: OpenAPIHono) =>
  app.openapi(route, (c) => {
    return c.body(null, 204);
  });
