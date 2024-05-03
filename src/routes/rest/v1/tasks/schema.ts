import { CommaSeparatedStringSchema } from "@/libs/zod/schema";
import type { Task } from "@/modules/task/contract/models";
import {
  TaskContentValueSchema,
  TaskDescriptionValueSchema,
  TaskIdValueSchema,
} from "@/modules/task/domain/task";
import { z } from "zod";

export const TaskIdSchema = TaskIdValueSchema.openapi({
  description: "Task ID.",
  example: "01HWQM125WA32K8721A1V5D8TV",
});

export const TaskIdPathSchema = TaskIdSchema.openapi({
  param: {
    name: "id",
    in: "path",
  },
});

export const TaskIdsQuerySchema = CommaSeparatedStringSchema.pipe(z.array(TaskIdSchema)).openapi({
  param: {
    name: "ids",
    in: "query",
    style: "form",
    explode: false,
  },
});

export const TaskContentSchema = TaskContentValueSchema.openapi({
  description: "Task content.",
  example: "Buy milk",
});

export const TaskDescriptionSchema = TaskDescriptionValueSchema.openapi({
  description: "A description for the task.",
  example: "Buy 2% milk",
});

export const TaskIsCompletedSchema = z.boolean().openapi({
  description: "Flag to mark completed tasks.",
  example: false,
});

export const TaskCreatedAtSchema = z.string().openapi({
  description: "The date when the task was created (read-only).",
  example: "2019-12-11T22:36:50.000000Z",
});

export const TaskSchema = z
  .object({
    id: TaskIdSchema,
    content: TaskContentSchema,
    description: TaskDescriptionSchema.nullable(),
    is_completed: TaskIsCompletedSchema,
    created_at: TaskCreatedAtSchema,
  })
  .openapi("Task");

export type TaskModel = z.infer<typeof TaskSchema>;

export const createTaskModel = (task: Task): TaskModel => {
  return {
    id: task.id,
    content: task.content,
    description: task.description,
    is_completed: task.isCompleted,
    created_at: task.createdAt.toISOString(),
  };
};

export const TasksSchema = z.array(TaskSchema);

export type TaskModels = z.infer<typeof TasksSchema>;
