import type { ValidationError } from "@/libs/error/validation-error";
import { validate } from "@/libs/zod/validate";
import type { Result } from "neverthrow";
import { z } from "zod";

export const TaskContentValueSchema = z
  .string()
  .min(1, "Content must not be empty")
  .max(500, "Content must not exceed 500 characters");

export const TaskContentSchema = TaskContentValueSchema.brand<"TaskContent">();

export type TaskContent = z.infer<typeof TaskContentSchema>;

export const newTaskContent = (value: string): Result<TaskContent, ValidationError> => {
  return validate(TaskContentSchema, value);
};
