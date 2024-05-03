import type { HonoEnv } from "@/libs/hono/types";
import { getActiveTasks } from "@/modules/task/contract/query";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { TaskIdsQuerySchema, TasksSchema, createTaskModel } from "../schema";

export default new OpenAPIHono<HonoEnv>().openapi(
  createRoute({
    method: "get",
    path: "/",
    description: "Returns a JSON-encoded array containing all active tasks.",
    request: {
      query: z.object({
        ids: TaskIdsQuerySchema.optional(),
      }),
    },
    responses: {
      200: {
        content: {
          "application/json": {
            schema: TasksSchema,
          },
        },
        description: "Single task.",
      },
    },
    tags: ["Tasks"],
  }),
  async (c) => {
    const { prisma } = c.var.container;

    const tasks = await getActiveTasks(prisma)();

    return c.json(
      tasks.map((t) => createTaskModel(t)),
      200,
    );
  },
);
