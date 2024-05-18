import { EntityNotFoundError } from "@/libs/error/entity-not-found-error";
import { PrismaClientError } from "@/libs/error/prisma-client-error";
import type { ValidationError } from "@/libs/error/validation-error";
import type { PrismaClient } from "@prisma/client";
import { ResultAsync, err, ok } from "neverthrow";
import { type ActiveTask, type CreatedTask, type UpdatedTask, newActiveTask } from "./task";
import type { TaskId } from "./values/task-id";

export type SaveCreatedTask = (
  model: CreatedTask,
) => ResultAsync<ActiveTask, ValidationError | PrismaClientError>;

export type SaveUpdatedTask = (
  model: UpdatedTask,
) => ResultAsync<ActiveTask, ValidationError | PrismaClientError>;

export type FindActiveTaskById = (
  id: TaskId,
) => ResultAsync<ActiveTask | null, ValidationError | PrismaClientError>;

export type GetActiveTaskById = (
  id: TaskId,
) => ResultAsync<ActiveTask, EntityNotFoundError | ValidationError | PrismaClientError>;

type Context = {
  prisma: PrismaClient;
};

export const saveCreatedTask =
  ({ prisma }: Context): SaveCreatedTask =>
  ({ kind: _, ...model }) => {
    return ResultAsync.fromPromise(
      prisma.task.create({
        data: { ...model, isCompleted: false },
      }),
      PrismaClientError.create,
    ).andThen(newActiveTask);
  };

export const saveUpdatedTask =
  ({ prisma }: Context): SaveUpdatedTask =>
  ({ kind: _, ...model }) => {
    return ResultAsync.fromPromise(
      prisma.task.update({
        where: { id: model.id },
        data: { ...model, isCompleted: false },
      }),
      PrismaClientError.create,
    ).andThen(newActiveTask);
  };

export const findActiveTaskById =
  ({ prisma }: Context): FindActiveTaskById =>
  (id) => {
    return ResultAsync.fromPromise(
      prisma.task.findUnique({
        where: { id, isCompleted: false },
      }),
      PrismaClientError.create,
    ).andThen((record) => {
      return record ? newActiveTask(record) : ok(null);
    });
  };

export const getActiveTaskById =
  (context: Context): GetActiveTaskById =>
  (id) => {
    return findActiveTaskById(context)(id).andThen((task) => {
      return task ? ok(task) : err(new EntityNotFoundError("Task not found"));
    });
  };
