import type { PrismaClientError, ValidationError } from "@/libs/error";
import type { ResultAsync } from "neverthrow";
import type { DeleteTaskWorkflow } from "../workflows/delete-task";
import { type TaskModel, toModel } from "./models";

export type DeleteTask = (
  id: string,
) => ResultAsync<TaskModel, ValidationError | PrismaClientError>;

export const deleteTask =
  ({ deleteTaskWorkflow }: { deleteTaskWorkflow: DeleteTaskWorkflow }): DeleteTask =>
  (id) => {
    return deleteTaskWorkflow({ kind: "UnvalidatedInput", id }).map(toModel);
  };
