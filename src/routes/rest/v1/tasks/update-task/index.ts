import { EntityNotFoundError } from "@/libs/error/entity-not-found-error";
import { ValidationError } from "@/libs/error/validation-error";
import { BadRequestException, InternalServerErrorException } from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
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
      content: { "application/json": { schema: z.object({ message: z.string() }) } },
      description: "Bad request.",
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
  const { updateTask } = container;

  return updateTask({
    id: c.req.param("id"),
    ...c.req.valid("json"),
  }).match(
    (task) => c.json(toRestTask(task), 200),
    (err) => {
      if (err instanceof ValidationError || err instanceof EntityNotFoundError) {
        throw new BadRequestException({ message: err.message });
      }
      throw new InternalServerErrorException({ cause: err });
    },
  );
});
