import { createOpenAPIApp } from "@/libs/hono/factory";
import { createRoute, z } from "@hono/zod-openapi";
import { TaskIdPathSchema } from "./schema";

export default createOpenAPIApp().openapi(
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
