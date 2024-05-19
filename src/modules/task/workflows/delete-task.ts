import type { PrismaClientError, ValidationError } from "@/libs/error";
import { type Result, type ResultAsync, ok } from "neverthrow";
import type { DeletedTask } from "../domain/task";
import type { DeleteTaskById } from "../domain/task-repository";
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

export type DeleteTaskWorkflow = (
  input: UnvalidatedInput,
) => ResultAsync<DeletedTask, ValidationError | PrismaClientError>;

export const validateInput = (): ValidateInput => (input) => {
  return newTaskId(input.id).map((id) => ({ kind: "ValidatedInput", id }));
};

export const deleteTaskWorkflow =
  ({ deleteTaskById }: { deleteTaskById: DeleteTaskById }): DeleteTaskWorkflow =>
  (input) => {
    return ok(input)
      .andThen(validateInput())
      .asyncAndThen(({ id }) => deleteTaskById(id));
  };
