import { EntityNotFoundError } from "@/libs/error/entity-not-found-error";
import { ValidationError } from "@/libs/error/validation-error";
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
import { ErrorResponseSchema } from "@/routes/rest/schema";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import {
  RestTaskSchema,
  TaskContentSchema,
  TaskDescriptionSchema,
  TaskIdPathSchema,
  toRestTask,
} from "../schema";

const UpdateTaskSchema = z
  .object({
    content: TaskContentSchema.optional(),
    description: TaskDescriptionSchema.optional(),
  })
  .openapi("UpdateTask");

const route = createRoute({
  method: "post",
  path: "/{id}",
  description: "Update a task.",
  request: {
    params: z.object({
      id: TaskIdPathSchema,
    }),
    body: {
      content: { "application/json": { schema: UpdateTaskSchema } },
    },
  },
  responses: {
    200: {
      content: { "application/json": { schema: RestTaskSchema } },
      description: "Single task.",
    },
    400: {
      content: { "application/json": { schema: ErrorResponseSchema } },
      description: "Bad request.",
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
  const { updateTask } = container;

  return updateTask({
    id: c.req.param("id"),
    ...c.req.valid("json"),
  }).match(
    (task) => c.json(toRestTask(task), 200),
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
