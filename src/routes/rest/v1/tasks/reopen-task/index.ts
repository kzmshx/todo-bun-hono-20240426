import { EntityNotFoundError, ValidationError } from "@/libs/error";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
import { ErrorResponseSchema } from "@/routes/rest/schema";
import { createRoute, z } from "@hono/zod-openapi";
import { TaskIdPathSchema } from "../schema";

const route = createRoute({
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

export default createOpenAPIApp().openapi(route, (c) => {
  const { container } = c.var;
  const { reopenTask } = container;

  return reopenTask(c.req.param("id")).match(
    (_) => c.body(null, 204),
    (err) => {
      if (err instanceof ValidationError) {
        throw new BadRequestException(err);
      }
      if (err instanceof EntityNotFoundError) {
        throw new NotFoundException(err);
      }
      throw new InternalServerErrorException({ cause: err });
    },
  );
});
