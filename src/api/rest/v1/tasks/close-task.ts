import { type OpenAPIHono, createRoute } from "@hono/zod-openapi";

const route = createRoute({
  method: "post",
  path: "/:id/close",
  description: "Closes a task.",
  responses: {
    204: {
      description: "An empty body.",
    },
  },
});

export const useCloseTask = (app: OpenAPIHono) =>
  app.openapi(route, (c) => {
    return c.body(null, 204);
  });
