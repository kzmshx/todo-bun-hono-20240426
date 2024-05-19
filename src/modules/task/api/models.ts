import type { Task } from "@prisma/client";
import type { ActiveTask, ClosedTask, DeletedTask } from "../domain/task";

export type TaskModel = Task;

export const toModel = (task: ActiveTask | ClosedTask | DeletedTask): TaskModel => task;
