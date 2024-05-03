import { NotFoundException } from "@/libs/hono/exceptions";
import type { HonoEnv } from "@/libs/hono/types";
import { getActiveTask } from "@/modules/task/contract/query";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { TaskIdPathSchema, TaskSchema, createTaskModel } from "../schema";

export default new OpenAPIHono<HonoEnv>().openapi(
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
            schema: TaskSchema,
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

    const task = await getActiveTask(prisma)(id);
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    return c.json(createTaskModel(task), 200);
  },
);
