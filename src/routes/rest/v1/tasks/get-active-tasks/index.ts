import { InternalServerErrorException } from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
import { type TaskModel, getActiveTasks } from "@/modules/task";
import { createRoute, z } from "@hono/zod-openapi";
import { RestTaskListSchema, TaskIdsQuerySchema, toRestTask } from "../schema";

export default createOpenAPIApp().openapi(
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
            schema: RestTaskListSchema,
          },
        },
        description: "Single task.",
      },
      500: {
        content: {
          "application/json": {
            schema: z.object({
              error: z.string(),
            }),
          },
        },
        description: "Internal Server Error.",
      },
    },
    tags: ["Tasks"],
  }),
  async (c) => {
    const { prisma } = c.var.container;

    return getActiveTasks({ prisma })().match(
      (tasks: TaskModel[]) => c.json(tasks.map(toRestTask)),
      (err) => {
        throw new InternalServerErrorException({ cause: err });
      },
    );
  },
);
