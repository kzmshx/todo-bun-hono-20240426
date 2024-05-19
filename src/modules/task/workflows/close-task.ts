import type { EntityNotFoundError, PrismaClientError, ValidationError } from "@/libs/error";
import { type Result, type ResultAsync, ok } from "neverthrow";
import { type ClosedTask, closeTask as closeTaskEntity } from "../domain/task";
import type { GetActiveTaskById, SaveClosedTask } from "../domain/task-repository";
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
type CloseTask = (
  input: ValidatedInput,
) => ResultAsync<ClosedTask, ValidationError | EntityNotFoundError | PrismaClientError>;

export type CloseTaskWorkflow = (
  input: UnvalidatedInput,
) => ResultAsync<ClosedTask, ValidationError | EntityNotFoundError | PrismaClientError>;

const validateInput = (): ValidateInput => (input) => {
  return newTaskId(input.id).map((id) => ({
    kind: "ValidatedInput",
    id,
  }));
};

const closeTask =
  ({ getActiveTaskById }: { getActiveTaskById: GetActiveTaskById }): CloseTask =>
  (input) => {
    return getActiveTaskById(input.id).map(closeTaskEntity);
  };

export const closeTaskWorkflow =
  (ctx: {
    getActiveTaskById: GetActiveTaskById;
    saveClosedTask: SaveClosedTask;
  }): CloseTaskWorkflow =>
  (input) => {
    return ok(input)
      .andThen(validateInput())
      .asyncAndThen(closeTask(ctx))
      .andThen(ctx.saveClosedTask);
  };
