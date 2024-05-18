import type { Task } from "@prisma/client";
import type { ActiveTask } from "../domain/task";

export type TaskModel = Task;

export const activeTaskToModel = (task: ActiveTask): TaskModel => ({
  ...task,
  isCompleted: false,
});
