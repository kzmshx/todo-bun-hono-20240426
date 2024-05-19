import { PrismaClientError } from "@/libs/error";
import type { PrismaClient } from "@prisma/client";
import { ResultAsync } from "neverthrow";
import type { TaskModel } from "./models";

export type GetActiveTask = (id: string) => ResultAsync<TaskModel | null, PrismaClientError>;

export const getActiveTask =
  ({ prisma }: { prisma: PrismaClient }): GetActiveTask =>
  (id) => {
    return ResultAsync.fromPromise(
      prisma.task.findFirst({
        where: {
          id,
          isCompleted: false,
        },
      }),
      PrismaClientError.create,
    );
  };
