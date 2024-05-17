import type { ResultAsync } from "neverthrow";
import type { TaskModel } from ".";
import type { CreateTaskWorkflow } from "../workflows/create-task";

export type CreateTaskInput = {
  content: string;
  description?: string;
};

export type CreateTask = (input: CreateTaskInput) => ResultAsync<TaskModel, Error>;

export const createTask =
  ({ workflow }: { workflow: CreateTaskWorkflow }): CreateTask =>
  (input) => {
    return workflow({
      kind: "UnvalidatedTask",
      ...input,
    }).map((task) => ({
      id: task.id as string,
      content: task.content as string,
      description: task.description as string | null,
      isCompleted: task.isCompleted as boolean,
      createdAt: task.createdAt as Date,
    }));
  };
