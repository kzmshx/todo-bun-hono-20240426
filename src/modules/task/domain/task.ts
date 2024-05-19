import { ValidationError } from "@/libs/error";
import type { Omit } from "@prisma/client/runtime/library";
import { Result, err, ok } from "neverthrow";
import { type TaskContent, newTaskContent } from "./values/task-content";
import { type TaskDescription, newTaskDescription } from "./values/task-description";
import { type TaskId, newTaskId } from "./values/task-id";

type TaskRecord = {
  id: string;
  content: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
};

export type BaseTask = {
  id: TaskId;
  content: TaskContent;
  description: TaskDescription;
  isCompleted: boolean;
  createdAt: Date;
};

export type ActiveTask = Omit<BaseTask, "isCompleted"> & {
  kind: "ActiveTask";
  isCompleted: false;
};

export const newActiveTask = (record: TaskRecord): Result<ActiveTask, ValidationError> => {
  const id = newTaskId(record.id);
  const content = newTaskContent(record.content);
  const description = newTaskDescription(record.description);
  const isCompleted: Result<false, ValidationError> = record.isCompleted
    ? err(new ValidationError("Task is already completed"))
    : ok(false);

  return Result.combine([id, content, description, isCompleted]).map(
    ([id, content, description, isCompleted]) => ({
      kind: "ActiveTask",
      id,
      content,
      description,
      isCompleted,
      createdAt: record.createdAt,
    }),
  );
};

export const updateContent = (task: ActiveTask, content: TaskContent): ActiveTask => ({
  ...task,
  content,
});

export const updateDescription = (task: ActiveTask, description: TaskDescription): ActiveTask => ({
  ...task,
  description,
});

export const closeTask = (task: ActiveTask): ClosedTask => ({
  ...task,
  kind: "ClosedTask",
  isCompleted: true,
});

export type ClosedTask = Omit<BaseTask, "isCompleted"> & {
  kind: "ClosedTask";
  isCompleted: true;
};

export const newClosedTask = (record: TaskRecord): Result<ClosedTask, ValidationError> => {
  const id = newTaskId(record.id);
  const content = newTaskContent(record.content);
  const description = newTaskDescription(record.description);
  const isCompleted: Result<true, ValidationError> = record.isCompleted
    ? ok(true)
    : err(new ValidationError("Task is not completed"));

  return Result.combine([id, content, description, isCompleted]).map(
    ([id, content, description, isCompleted]) => ({
      kind: "ClosedTask",
      id,
      content,
      description,
      isCompleted,
      createdAt: record.createdAt,
    }),
  );
};

export const reopenTask = (closedTask: ClosedTask): ActiveTask => ({
  ...closedTask,
  kind: "ActiveTask",
  isCompleted: false,
});

export type DeletedTask = BaseTask & {
  kind: "DeletedTask";
};

export const newDeletedTask = (record: TaskRecord): Result<DeletedTask, ValidationError> => {
  const id = newTaskId(record.id);
  const content = newTaskContent(record.content);
  const description = newTaskDescription(record.description);

  return Result.combine([id, content, description]).map(([id, content, description]) => ({
    kind: "DeletedTask",
    id,
    content,
    description,
    isCompleted: record.isCompleted,
    createdAt: record.createdAt,
  }));
};

export type CreatedTask = Omit<BaseTask, "isCompleted"> & {
  kind: "CreatedTask";
  isCompleted: false;
};

export type UpdatedTask = Omit<BaseTask, "isCompleted"> & {
  kind: "UpdatedTask";
  isCompleted: false;
};
