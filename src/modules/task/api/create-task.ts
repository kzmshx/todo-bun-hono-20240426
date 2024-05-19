import type { PrismaClientError, ValidationError } from "@/libs/error";
import type { ResultAsync } from "neverthrow";
import type { TaskModel } from ".";
import type { CreateTaskWorkflow } from "../workflows/create-task";
import { toModel } from "./models";

export type CreateTaskInput = {
  content: string;
  description?: string;
};

export type CreateTask = (
  input: CreateTaskInput,
) => ResultAsync<TaskModel, ValidationError | PrismaClientError>;

export const createTask =
  ({ createTaskWorkflow }: { createTaskWorkflow: CreateTaskWorkflow }): CreateTask =>
  (input: CreateTaskInput) => {
    return createTaskWorkflow({ kind: "UnvalidatedInput", ...input }).map(toModel);
  };
