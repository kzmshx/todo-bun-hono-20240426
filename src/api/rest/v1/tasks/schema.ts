import {
  TaskContentValueSchema,
  TaskDescriptionValueSchema,
  TaskIdValueSchema,
} from "@/modules/task/domain/task";
import { z } from "zod";

export const TaskIdSchema = TaskIdValueSchema.openapi({
  example: "01HWQM125WA32K8721A1V5D8TV",
  description: "Task ID.",
});

export const CommaSeparatedTaskIdsSchema = z
  .string()
  .transform((v) => v.split(","))
  .pipe(z.array(TaskIdSchema))
  .optional();

export const TaskContentSchema = TaskContentValueSchema.openapi({
  example: "Buy milk",
  description: "Task content.",
});

export const TaskDescriptionSchema = TaskDescriptionValueSchema.openapi({
  example: "Buy 2% milk",
  description: "A description for the task.",
});

export const TaskIsCompletedSchema = z.boolean().openapi({
  example: false,
  description: "Flag to mark completed tasks.",
});

export const TaskCreatedAtSchema = z.string().openapi({
  example: "2019-12-11T22:36:50.000000Z",
  description: "The date when the task was created (read-only).",
});

export const TaskSchema = z
  .object({
    id: TaskIdSchema,
    content: TaskContentSchema,
    description: TaskDescriptionSchema.optional(),
    is_completed: TaskIsCompletedSchema,
    created_at: TaskCreatedAtSchema,
  })
  .openapi("Task");

export const TasksSchema = z.array(TaskSchema);
