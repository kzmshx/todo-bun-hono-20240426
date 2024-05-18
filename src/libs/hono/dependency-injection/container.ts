import type { Env } from "@/libs/env";
import { prisma } from "@/libs/prisma/client";
import { createTask, createTaskWorkflow, getActiveTask, getActiveTasks } from "@/modules/task";
import { updateTask } from "@/modules/task/api/update-task";
import {
  getActiveTaskById,
  saveCreatedTask,
  saveUpdatedTask,
} from "@/modules/task/domain/task-repository";
import { updateTaskWorkflow } from "@/modules/task/workflows/update-task";
import type { PrismaClient } from "@prisma/client";

type ServiceMap = {
  env: Env;
  prisma: PrismaClient;
};

export class Container implements ServiceMap {
  constructor(public readonly env: Env) {}

  private _prisma?: PrismaClient;

  get prisma() {
    return (this._prisma ??= prisma);
  }

  get createTask() {
    return createTask(this);
  }

  get createTaskWorkflow() {
    return createTaskWorkflow(this);
  }

  get getActiveTask() {
    return getActiveTask(this);
  }

  get getActiveTasks() {
    return getActiveTasks(this);
  }

  get getActiveTaskById() {
    return getActiveTaskById(this);
  }

  get saveCreatedTask() {
    return saveCreatedTask(this);
  }

  get saveUpdatedTask() {
    return saveUpdatedTask(this);
  }

  get updateTask() {
    return updateTask(this);
  }

  get updateTaskWorkflow() {
    return updateTaskWorkflow(this);
  }
}
