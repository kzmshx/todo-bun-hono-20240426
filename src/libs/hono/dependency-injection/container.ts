import type { Env } from "@/libs/env";
import { prisma } from "@/libs/prisma/client";
import { createTask, createTaskWorkflow, getActiveTask, getActiveTasks } from "@/modules/task";
import { closeTask } from "@/modules/task/api/close-task";
import { reopenTask } from "@/modules/task/api/reopen-task";
import { updateTask } from "@/modules/task/api/update-task";
import {
  getActiveTaskById,
  getClosedTaskById,
  saveActiveTask,
  saveClosedTask,
  saveCreatedTask,
  saveUpdatedTask,
} from "@/modules/task/domain/task-repository";
import { closeTaskWorkflow } from "@/modules/task/workflows/close-task";
import { reopenTaskWorkflow } from "@/modules/task/workflows/reopen-task";
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

  get closeTask() {
    return closeTask(this);
  }

  get closeTaskWorkflow() {
    return closeTaskWorkflow(this);
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

  get getClosedTaskById() {
    return getClosedTaskById(this);
  }

  get reopenTask() {
    return reopenTask(this);
  }

  get reopenTaskWorkflow() {
    return reopenTaskWorkflow(this);
  }

  get saveActiveTask() {
    return saveActiveTask(this);
  }

  get saveClosedTask() {
    return saveClosedTask(this);
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
