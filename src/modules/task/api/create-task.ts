import type { ResultAsync } from "neverthrow";
import type { TaskModel } from ".";
import type { CreateTaskWorkflow } from "../workflows/create-task";
import { activeTaskToModel } from "./models";

export type CreateTaskInput = {
  content: string;
  description?: string;
};

export type CreateTask = (input: CreateTaskInput) => ResultAsync<TaskModel, Error>;

type Context = {
  createTaskWorkflow: CreateTaskWorkflow;
};

export const createTask =
  ({ createTaskWorkflow }: Context): CreateTask =>
  (input) => {
    return createTaskWorkflow({ kind: "UnvalidatedInput", ...input }).map(activeTaskToModel);
  };
