import type { EntityNotFoundError, PrismaClientError, ValidationError } from "@/libs/error";
import type { ResultAsync } from "neverthrow";
import type { CloseTaskWorkflow } from "../workflows/close-task";
import { type TaskModel, toModel } from "./models";

export type CloseTask = (
  id: string,
) => ResultAsync<TaskModel, ValidationError | EntityNotFoundError | PrismaClientError>;

export const closeTask =
  ({ closeTaskWorkflow }: { closeTaskWorkflow: CloseTaskWorkflow }): CloseTask =>
  (id) => {
    return closeTaskWorkflow({ kind: "UnvalidatedInput", id }).map(toModel);
  };
