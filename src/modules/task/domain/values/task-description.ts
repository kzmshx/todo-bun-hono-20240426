import type { ValidationError } from "@/libs/error/validation-error";
import { validate } from "@/libs/zod/validate";
import type { Result } from "neverthrow";
import { z } from "zod";

export const TaskDescriptionValueSchema = z
  .string()
  .max(16384, "Description must not exceed 16384 characters");

export const TaskDescriptionSchema = TaskDescriptionValueSchema.brand<"TaskDescription">();

export type TaskDescription = z.infer<typeof TaskDescriptionSchema>;

export const newTaskDescription = (value: string): Result<TaskDescription, ValidationError> => {
  return validate(TaskDescriptionSchema, value);
};
