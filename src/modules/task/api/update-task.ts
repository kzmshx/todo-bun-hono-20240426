import type { EntityNotFoundError, PrismaClientError, ValidationError } from "@/libs/error";
import type { ResultAsync } from "neverthrow";
import type { TaskModel } from ".";
import type { UpdateTaskWorkflow } from "../workflows/update-task";
import { toModel } from "./models";

export type UpdateTaskInput = {
  id: string;
  content?: string;
  description?: string;
};

export type UpdateTask = (
  input: UpdateTaskInput,
) => ResultAsync<TaskModel, ValidationError | EntityNotFoundError | PrismaClientError>;

export const updateTask =
  ({ updateTaskWorkflow }: { updateTaskWorkflow: UpdateTaskWorkflow }): UpdateTask =>
  (input) => {
    return updateTaskWorkflow({ kind: "UnvalidatedInput", ...input }).map(toModel);
  };
