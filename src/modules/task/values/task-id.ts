import { UlidSchema } from "@/libs/zod/schemas";
import { validate } from "@/libs/zod/validate";
import type { Result } from "neverthrow";
import { ulid } from "ulid";
import type { z } from "zod";

export const TaskIdValueSchema = UlidSchema;

export const TaskIdSchema = TaskIdValueSchema.brand<"TaskId">();

export type TaskId = z.infer<typeof TaskIdSchema>;

export const TaskId = (value: string): Result<TaskId, Error> => {
  return validate(TaskIdSchema, value);
};

export const generateTaskId = (): TaskId => {
  return TaskId(ulid()).match(
    (v) => v,
    (e) => {
      throw e;
    },
  );
};
