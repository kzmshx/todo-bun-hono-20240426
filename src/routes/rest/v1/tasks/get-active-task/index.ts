import { InternalServerErrorException, NotFoundException } from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
import { getActiveTask } from "@/modules/task";
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
      content: { "application/json": { schema: z.object({ message: z.string() }) } },
      description: "Task not found.",
    },
    500: {
      content: { "application/json": { schema: z.object({ message: z.string() }) } },
      description: "Internal server error.",
    },
  },
  tags: ["Tasks"],
});

export default createOpenAPIApp().openapi(route, async (c) => {
  const { container } = c.var;
  const { prisma } = container;
  const { id } = c.req.param();

  return getActiveTask({ prisma })(id).match(
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
