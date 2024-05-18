import { InternalServerErrorException, NotFoundException } from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
import { ErrorResponseSchema } from "@/routes/rest/schema";
import { createRoute, z } from "@hono/zod-openapi";
import { RestTaskSchema, TaskIdPathSchema, toRestTask } from "../schema";

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
      content: { "application/json": { schema: RestTaskSchema } },
      description: "Single task.",
    },
    404: {
      content: { "application/json": { schema: ErrorResponseSchema } },
      description: "Task not found.",
    },
    500: {
      content: { "application/json": { schema: ErrorResponseSchema } },
      description: "Internal server error.",
    },
  },
  tags: ["Tasks"],
});

export default createOpenAPIApp().openapi(route, async (c) => {
  const { container } = c.var;
  const { getActiveTask } = container;

  const { id } = c.req.param();

  return getActiveTask(id).match(
    (task) => {
      if (!task) {
        throw new NotFoundException({ message: "Task not found" });
      }
      return c.json(toRestTask(task), 200);
    },
    (err) => {
      throw new InternalServerErrorException({ cause: err });
    },
  );
});
