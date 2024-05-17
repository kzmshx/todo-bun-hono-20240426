import { Result, type ResultAsync, ok } from "neverthrow";
import type { CreatedTask, Task, UnvalidatedTask, ValidatedTask } from "../entities/task";
import type { SaveCreatedTask } from "../entities/task-repository";
import { TaskContent } from "../values/task-content";
import { TaskDescription } from "../values/task-description";
import { generateTaskId } from "../values/task-id";

type ValidateTask = (input: UnvalidatedTask) => Result<ValidatedTask, Error>;

export const validateTask: ValidateTask = (input) => {
  const content = TaskContent(input.content);
  const description = input.description ? TaskDescription(input.description) : ok(null);

  return Result.combine([content, description]).map(([content, description]) => ({
    kind: "ValidatedTask",
    content,
    description,
  }));
};

type CreateTask = (input: ValidatedTask) => Result<CreatedTask, Error>;

export const createTask: CreateTask = (input) => {
  return ok({
    ...input,
    kind: "CreatedTask",
    id: generateTaskId(),
    isCompleted: false,
    createdAt: new Date(),
  });
};

export type CreateTaskWorkflow = (input: UnvalidatedTask) => ResultAsync<Task, Error>;

type Context = {
  saveCreatedTask: SaveCreatedTask;
};

export const createTaskWorkflow =
  ({ saveCreatedTask }: Context): CreateTaskWorkflow =>
  (input) => {
    return ok(input).andThen(validateTask).andThen(createTask).asyncAndThen(saveCreatedTask);
  };
