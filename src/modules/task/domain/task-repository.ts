import { EntityNotFoundError, PrismaClientError, type ValidationError } from "@/libs/error";
import type { PrismaClient, Task } from "@prisma/client";
import { ResultAsync, err, ok } from "neverthrow";
import {
  type ActiveTask,
  type ClosedTask,
  type CreatedTask,
  type DeletedTask,
  type UpdatedTask,
  newActiveTask,
  newClosedTask,
  newDeletedTask,
} from "./task";
import type { TaskId } from "./values/task-id";

export type DeleteTaskById = (
  id: TaskId,
) => ResultAsync<DeletedTask, ValidationError | PrismaClientError>;

export type FindActiveTaskById = (
  id: TaskId,
) => ResultAsync<ActiveTask | null, ValidationError | PrismaClientError>;

export type FindClosedTaskById = (
  id: TaskId,
) => ResultAsync<ClosedTask | null, ValidationError | PrismaClientError>;

export type GetActiveTaskById = (
  id: TaskId,
) => ResultAsync<ActiveTask, EntityNotFoundError | ValidationError | PrismaClientError>;

export type GetClosedTaskById = (
  id: TaskId,
) => ResultAsync<ClosedTask, EntityNotFoundError | ValidationError | PrismaClientError>;

export type SaveActiveTask = (
  model: ActiveTask,
) => ResultAsync<ActiveTask, ValidationError | PrismaClientError>;

export type SaveClosedTask = (
  model: ClosedTask,
) => ResultAsync<ClosedTask, ValidationError | PrismaClientError>;

export type SaveCreatedTask = (
  model: CreatedTask,
) => ResultAsync<ActiveTask, ValidationError | PrismaClientError>;

export type SaveUpdatedTask = (
  model: UpdatedTask,
) => ResultAsync<ActiveTask, ValidationError | PrismaClientError>;

type Context = {
  prisma: PrismaClient;
};

const toResultAsync = <T>(promise: Promise<T>): ResultAsync<T, PrismaClientError> =>
  ResultAsync.fromPromise(promise, PrismaClientError.create);

const updateTask = (
  prisma: PrismaClient,
  model: Task,
): ResultAsync<Task, ValidationError | PrismaClientError> => {
  const promise = prisma.task.update({ where: { id: model.id }, data: { ...model } });

  return toResultAsync(promise);
};

export const deleteTaskById =
  ({ prisma }: Context): DeleteTaskById =>
  (id) => {
    const promise = prisma.task.delete({ where: { id } });

    return toResultAsync(promise).andThen(newDeletedTask);
  };

export const findActiveTaskById =
  ({ prisma }: Context): FindActiveTaskById =>
  (id) => {
    const promise = prisma.task.findUnique({ where: { id, isCompleted: false } });

    return toResultAsync(promise).andThen((v) => (v ? newActiveTask(v) : ok(null)));
  };

export const findClosedTaskById =
  ({ prisma }: Context): FindClosedTaskById =>
  (id) => {
    const promise = prisma.task.findUnique({ where: { id, isCompleted: true } });

    return toResultAsync(promise).andThen((v) => (v ? newClosedTask(v) : ok(null)));
  };

export const getActiveTaskById =
  (context: Context): GetActiveTaskById =>
  (id) => {
    return findActiveTaskById(context)(id).andThen((task) =>
      task ? ok(task) : err(new EntityNotFoundError("Task not found")),
    );
  };

export const getClosedTaskById =
  (context: Context): GetClosedTaskById =>
  (id) => {
    return findClosedTaskById(context)(id).andThen((task) =>
      task ? ok(task) : err(new EntityNotFoundError("Task not found")),
    );
  };

export const saveCreatedTask =
  ({ prisma }: Context): SaveCreatedTask =>
  ({ kind: _, ...model }) => {
    const promise = prisma.task.create({ data: { ...model, isCompleted: false } });

    return toResultAsync(promise).andThen(newActiveTask);
  };

export const saveActiveTask =
  ({ prisma }: Context): SaveActiveTask =>
  ({ kind: _, ...model }) => {
    return updateTask(prisma, model).andThen(newActiveTask);
  };

export const saveClosedTask =
  ({ prisma }: Context): SaveClosedTask =>
  ({ kind: _, ...model }) => {
    return updateTask(prisma, model).andThen(newClosedTask);
  };

export const saveUpdatedTask =
  ({ prisma }: Context): SaveUpdatedTask =>
  ({ kind: _, ...model }) => {
    return updateTask(prisma, model).andThen(newActiveTask);
  };
