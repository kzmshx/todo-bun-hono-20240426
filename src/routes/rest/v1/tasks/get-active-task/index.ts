import { InternalServerErrorException, NotFoundException } from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
import { getActiveTask } from "@/modules/task";
import { createRoute, z } from "@hono/zod-openapi";
import { RestTaskSchema, TaskIdPathSchema, toRestTask } from "../schema";

export default createOpenAPIApp().openapi(
  createRoute({
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
        content: {
          "application/json": {
            schema: RestTaskSchema,
          },
        },
        description: "Single task.",
      },
    },
    tags: ["Tasks"],
  }),
  async (c) => {
    const { prisma } = c.var.container;
    const { id } = c.req.param();

    return getActiveTask({ prisma })(id).match(
      (task) => {
        if (!task) {
          throw new NotFoundException({ message: "Task not found" });
        }
        return c.json(toRestTask(task));
      },
      (err) => {
        throw new InternalServerErrorException({ cause: err });
      },
    );
  },
);
