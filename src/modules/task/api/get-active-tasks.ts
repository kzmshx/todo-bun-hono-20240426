import { PrismaClientError } from "@/libs/error/prisma-client-error";
import type { PrismaClient } from "@prisma/client";
import { ResultAsync } from "neverthrow";
import type { TaskModel } from "./models";

export type GetActiveTasks = () => ResultAsync<TaskModel[], Error>;

export const getActiveTasks =
  ({ prisma }: { prisma: PrismaClient }): GetActiveTasks =>
  () => {
    return ResultAsync.fromPromise(
      prisma.task.findMany({
        where: {
          isCompleted: false,
        },
        orderBy: {
          id: "asc",
        },
      }),
      PrismaClientError.create,
    );
  };
