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

export type Task = {
  id: TaskId;
  content: TaskContent;
  description: TaskDescription;
  isCompleted: boolean;
  createdAt: Date;
};

export type ActiveTask = {
  kind: "ActiveTask";
  id: TaskId;
  content: TaskContent;
  description: TaskDescription;
  isCompleted: false;
  createdAt: Date;
};

export type CreatedTask = Omit<ActiveTask, "kind"> & {
  kind: "CreatedTask";
};

export type UpdatedTask = Omit<ActiveTask, "kind"> & {
  kind: "UpdatedTask";
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

export type ClosedTask = {
  kind: "ClosedTask";
  id: TaskId;
  content: TaskContent;
  description: TaskDescription;
  isCompleted: true;
  createdAt: Date;
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
