import { ValidationError } from "@/libs/error";
import { BadRequestException, InternalServerErrorException } from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
import { ErrorResponseSchema } from "@/routes/rest/schema";
import { createRoute, z } from "@hono/zod-openapi";
import { TaskIdPathSchema } from "../schema";

const route = createRoute({
  method: "delete",
  path: "/{id}",
  description: "Deletes a task.",
  request: {
    params: z.object({
      id: TaskIdPathSchema,
    }),
  },
  responses: {
    204: {
      description: "Empty body.",
    },
    500: {
      content: { "application/json": { schema: ErrorResponseSchema } },
      description: "Internal server error.",
    },
  },
  tags: ["Tasks"],
});

export default createOpenAPIApp().openapi(route, (c) => {
  const { container } = c.var;
  const { deleteTask } = container;

  return deleteTask(c.req.param("id")).match(
    (_) => c.body(null, 204),
    (err) => {
      if (err instanceof ValidationError) {
        throw new BadRequestException(err);
      }
      throw new InternalServerErrorException({ cause: err });
    },
  );
});
