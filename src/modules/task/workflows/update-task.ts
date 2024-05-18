import { Result, type ResultAsync, ok } from "neverthrow";
import {
  type ActiveTask,
  type UpdatedTask,
  updateContent,
  updateDescription,
} from "../domain/task";
import type { GetActiveTaskById, SaveUpdatedTask } from "../domain/task-repository";
import { type TaskContent, newTaskContent } from "../domain/values/task-content";
import { type TaskDescription, newTaskDescription } from "../domain/values/task-description";
import { type TaskId, newTaskId } from "../domain/values/task-id";

type UnvalidatedInput = {
  kind: "UnvalidatedInput";
  id: string;
  content?: string;
  description?: string;
};

type ValidatedInput = {
  kind: "ValidatedInput";
  id: TaskId;
  content: TaskContent | null;
  description: TaskDescription | null;
};

type ValidatedCommand = {
  kind: "ValidatedCommand";
  input: ValidatedInput;
  task: ActiveTask;
};

type ValidateInput = (input: UnvalidatedInput) => Result<ValidatedInput, Error>;
type GetTask = (input: ValidatedInput) => ResultAsync<ValidatedCommand, Error>;
type UpdateTask = (input: ValidatedCommand) => Result<UpdatedTask, Error>;

export type UpdateTaskWorkflow = (input: UnvalidatedInput) => ResultAsync<ActiveTask, Error>;

const validateInput = (): ValidateInput => (input) => {
  const id = newTaskId(input.id);
  const content = input.content ? newTaskContent(input.content) : ok(null);
  const description = input.description ? newTaskDescription(input.description) : ok(null);

  return Result.combine([id, content, description]).map(([id, content, description]) => ({
    kind: "ValidatedInput",
    id,
    content,
    description,
  }));
};

const getTask =
  ({ getActiveTaskById }: { getActiveTaskById: GetActiveTaskById }): GetTask =>
  (input) => {
    return getActiveTaskById(input.id).map((task) => ({
      kind: "ValidatedCommand",
      input,
      task,
    }));
  };

const updateTask =
  (): UpdateTask =>
  ({ task, input }) => {
    return ok(task)
      .map((t) => (input.content ? updateContent(t, input.content) : t))
      .map((t) => (input.description ? updateDescription(t, input.description) : t))
      .map((t) => ({ ...t, kind: "UpdatedTask" }));
  };

export const updateTaskWorkflow =
  (ctx: {
    getActiveTaskById: GetActiveTaskById;
    saveUpdatedTask: SaveUpdatedTask;
  }): UpdateTaskWorkflow =>
  (input) => {
    return ok(input)
      .andThen(validateInput())
      .asyncAndThen(getTask(ctx))
      .andThen(updateTask())
      .andThen(ctx.saveUpdatedTask);
  };
