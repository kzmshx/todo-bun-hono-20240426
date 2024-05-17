import { PrismaClientError } from "@/libs/error/prisma-client-error";
import type { PrismaClient } from "@prisma/client";
import { ResultAsync } from "neverthrow";
import type { TaskContent } from "../values/task-content";
import type { TaskDescription } from "../values/task-description";
import type { TaskId } from "../values/task-id";
import type { CreatedTask, Task } from "./task";

export type SaveCreatedTask = (model: CreatedTask) => ResultAsync<Task, PrismaClientError>;
export type FindById = (id: TaskId) => ResultAsync<Task | null, PrismaClientError>;

type Context = {
  prisma: PrismaClient;
};

export const saveCreatedTask =
  ({ prisma }: Context): SaveCreatedTask =>
  ({ kind: _, ...model }) => {
    return ResultAsync.fromPromise(
      (async () => {
        const record = await prisma.task.create({ data: model });

        return {
          ...record,
          id: record.id as TaskId,
          content: record.content as TaskContent,
          description: record.description as TaskDescription,
        };
      })(),
      PrismaClientError.create,
    );
  };

export const findTaskById =
  ({ prisma }: Context): FindById =>
  (id: TaskId) => {
    return ResultAsync.fromPromise(
      (async () => {
        const task = await prisma.task.findUnique({ where: { id } });

        if (!task) {
          return null;
        }

        return {
          ...task,
          id: task.id as TaskId,
          content: task.content as TaskContent,
          description: task.description as TaskDescription,
        };
      })(),
      PrismaClientError.create,
    );
  };
