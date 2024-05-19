import type { EntityNotFoundError, PrismaClientError, ValidationError } from "@/libs/error";
import type { ResultAsync } from "neverthrow";
import type { ReopenTaskWorkflow } from "../workflows/reopen-task";
import { type TaskModel, toModel } from "./models";

export type ReopenTask = (
  id: string,
) => ResultAsync<TaskModel, ValidationError | EntityNotFoundError | PrismaClientError>;

export const reopenTask =
  ({ reopenTaskWorkflow }: { reopenTaskWorkflow: ReopenTaskWorkflow }): ReopenTask =>
  (id) => {
    return reopenTaskWorkflow({ kind: "UnvalidatedInput", id }).map(toModel);
  };
