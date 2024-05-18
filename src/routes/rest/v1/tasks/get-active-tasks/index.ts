import { InternalServerErrorException } from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
import type { TaskModel } from "@/modules/task";
import { ErrorResponseSchema } from "@/routes/rest/schema";
import { createRoute, z } from "@hono/zod-openapi";
import { RestTaskListSchema, TaskIdsQuerySchema, toRestTask } from "../schema";

const route = createRoute({
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
      content: { "application/json": { schema: RestTaskListSchema } },
      description: "Single task.",
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
  const { getActiveTasks } = container;

  return getActiveTasks().match(
    (tasks: TaskModel[]) => c.json(tasks.map(toRestTask), 200),
    (err) => {
      throw new InternalServerErrorException({ cause: err });
    },
  );
});
