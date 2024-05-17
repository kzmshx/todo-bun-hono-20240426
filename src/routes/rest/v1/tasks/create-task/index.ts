import { ValidationError } from "@/libs/error/validation-error";
import { BadRequestException, InternalServerErrorException } from "@/libs/hono/exceptions";
import { createOpenAPIApp } from "@/libs/hono/factory";
import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { RestTaskSchema, TaskContentSchema, TaskDescriptionSchema, toRestTask } from "../schema";

const NewTaskSchema = z
  .object({
    content: TaskContentSchema,
    description: TaskDescriptionSchema.optional(),
  })
  .openapi("NewTask");

export default createOpenAPIApp().openapi(
  createRoute({
    method: "post",
    path: "/",
    description: "Creates a new task and returns it as a JSON object.",
    request: {
      body: { content: { "application/json": { schema: NewTaskSchema } } },
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
  }),
  async (c) => {
    const { container } = c.var;
    const { createTaskWorkflow } = container;

    return createTaskWorkflow({
      kind: "UnvalidatedTask",
      ...c.req.valid("json"),
    }).match(
      (task) => c.json(toRestTask(task), 200),
      (err) => {
        if (err instanceof ValidationError) {
          throw new BadRequestException({ message: err.message });
        }
        throw new InternalServerErrorException({ cause: err });
      },
    );
  },
);
