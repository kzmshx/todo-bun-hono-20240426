import type { ValidationError } from "@/libs/error";
import { UlidSchema } from "@/libs/zod/schemas";
import { validate } from "@/libs/zod/validate";
import type { Result } from "neverthrow";
import { ulid } from "ulid";
import type { z } from "zod";

export const TaskIdValueSchema = UlidSchema;

export const TaskIdSchema = TaskIdValueSchema.brand<"TaskId">();

export type TaskId = z.infer<typeof TaskIdSchema>;

export const newTaskId = (value: string): Result<TaskId, ValidationError> => {
  return validate(TaskIdSchema, value);
};

export const generateTaskId = (): TaskId => {
  return newTaskId(ulid()).match(
    (v) => v,
    (e) => {
      throw e;
    },
  );
};
