import type { PrismaClientError, ValidationError } from "@/libs/error";
import { Result, type ResultAsync, ok } from "neverthrow";
import type { ActiveTask, CreatedTask } from "../domain/task";
import type { SaveCreatedTask } from "../domain/task-repository";
import { type TaskContent, newTaskContent } from "../domain/values/task-content";
import { type TaskDescription, newTaskDescription } from "../domain/values/task-description";
import { generateTaskId } from "../domain/values/task-id";

type UnvalidatedInput = {
  kind: "UnvalidatedInput";
  content: string;
  description?: string;
};

type ValidatedInput = {
  kind: "ValidatedTask";
  content: TaskContent;
  description: TaskDescription;
};

type ValidateInput = (input: UnvalidatedInput) => Result<ValidatedInput, ValidationError>;
type CreateTask = (input: ValidatedInput) => Result<CreatedTask, never>;

export type CreateTaskWorkflow = (
  input: UnvalidatedInput,
) => ResultAsync<ActiveTask, ValidationError | PrismaClientError>;

const validateInput = (): ValidateInput => (input) => {
  const content = newTaskContent(input.content);
  const description = newTaskDescription(input.description ?? "");

  return Result.combine([content, description]).map(([content, description]) => ({
    kind: "ValidatedTask",
    content,
    description,
  }));
};

const createTask = (): CreateTask => (input) => {
  return ok({
    ...input,
    kind: "CreatedTask",
    id: generateTaskId(),
    isCompleted: false,
    createdAt: new Date(),
  });
};

export const createTaskWorkflow =
  (ctx: { saveCreatedTask: SaveCreatedTask }): CreateTaskWorkflow =>
  (input) => {
    return ok(input)
      .andThen(validateInput())
      .andThen(createTask())
      .asyncAndThen(ctx.saveCreatedTask);
  };
