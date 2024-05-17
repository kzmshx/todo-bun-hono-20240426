import type { TaskContent } from "../values/task-content";
import type { TaskDescription } from "../values/task-description";
import type { TaskId } from "../values/task-id";

export type Task = {
  id: TaskId;
  content: TaskContent;
  description: TaskDescription | null;
  isCompleted: boolean;
  createdAt: Date;
};

export const closeTask = (task: Task): Task => ({
  ...task,
  isCompleted: true,
});

export const reopenTask = (task: Task): Task => ({
  ...task,
  isCompleted: false,
});

export type UnvalidatedTask = {
  kind: "UnvalidatedTask";
  content: string;
  description?: string;
};

export type ValidatedTask = {
  kind: "ValidatedTask";
  content: TaskContent;
  description: TaskDescription | null;
};

export type CreatedTask = {
  kind: "CreatedTask";
  id: TaskId;
  content: TaskContent;
  description: TaskDescription | null;
  isCompleted: false;
  createdAt: Date;
};
