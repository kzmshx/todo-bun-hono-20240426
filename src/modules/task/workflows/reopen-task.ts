import type { EntityNotFoundError, PrismaClientError, ValidationError } from "@/libs/error";
import { type Result, type ResultAsync, ok } from "neverthrow";
import { type ActiveTask, reopenTask as reopenTaskEntity } from "../domain/task";
import type { GetClosedTaskById, SaveActiveTask } from "../domain/task-repository";
import { type TaskId, newTaskId } from "../domain/values/task-id";

type UnvalidatedInput = {
  kind: "UnvalidatedInput";
  id: string;
};

type ValidatedInput = {
  kind: "ValidatedInput";
  id: TaskId;
};

type ValidateInput = (input: UnvalidatedInput) => Result<ValidatedInput, ValidationError>;
type ReopenTask = (
  input: ValidatedInput,
) => ResultAsync<ActiveTask, ValidationError | EntityNotFoundError | PrismaClientError>;

export type ReopenTaskWorkflow = (
  input: UnvalidatedInput,
) => ResultAsync<ActiveTask, ValidationError | EntityNotFoundError | PrismaClientError>;

const validateInput = (): ValidateInput => (input) => {
  return newTaskId(input.id).map((id) => ({ kind: "ValidatedInput", id }));
};

const reopenTask =
  ({ getClosedTaskById }: { getClosedTaskById: GetClosedTaskById }): ReopenTask =>
  (input) => {
    return getClosedTaskById(input.id).map(reopenTaskEntity);
  };

export const reopenTaskWorkflow =
  (ctx: {
    getClosedTaskById: GetClosedTaskById;
    saveActiveTask: SaveActiveTask;
  }): ReopenTaskWorkflow =>
  (input) => {
    return ok(input)
      .andThen(validateInput())
      .asyncAndThen(reopenTask(ctx))
      .andThen(ctx.saveActiveTask);
  };
