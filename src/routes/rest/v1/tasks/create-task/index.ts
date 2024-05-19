import { ValidationError } from "@/libs/error/validation-error";
import { BadRequestException, InternalServerErrorException } from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
import { ErrorResponseSchema } from "@/routes/rest/schema";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { RestTaskSchema, TaskContentSchema, TaskDescriptionSchema, toRestTask } from "../schema";

const NewTaskSchema = z
  .object({
    content: TaskContentSchema,
    description: TaskDescriptionSchema.optional(),
  })
  .openapi("NewTask");

const route = createRoute({
  method: "post",
  path: "/",
  description: "Creates a new task and returns it as a JSON object.",
  request: {
    body: {
      content: { "application/json": { schema: NewTaskSchema } },
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
    500: {
      content: { "application/json": { schema: ErrorResponseSchema } },
      description: "Internal server error.",
    },
  },
  tags: ["Tasks"],
});

export default createOpenAPIApp().openapi(route, async (c) => {
  const { container } = c.var;
  const { createTask } = container;

  return createTask(c.req.valid("json")).match(
    (task) => c.json(toRestTask(task), 200),
    (err) => {
      if (err instanceof ValidationError) {
        throw new BadRequestException(err);
      }
      throw new InternalServerErrorException({ cause: err });
    },
  );
});
