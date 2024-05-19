import type { Task } from "@prisma/client";
import type { ActiveTask, ClosedTask } from "../domain/task";

export type TaskModel = Task;

export const toModel = (task: ActiveTask | ClosedTask): TaskModel => task;
