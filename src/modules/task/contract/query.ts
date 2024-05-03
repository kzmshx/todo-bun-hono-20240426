import type { PrismaClient } from "@prisma/client";
import type { Task } from "./models";

export const getActiveTask =
  (prisma: PrismaClient) =>
  async (id: string): Promise<Task | null> => {
    return prisma.task.findFirst({
      where: {
        id,
        isCompleted: false,
      },
    });
  };

export const getActiveTasks = (prisma: PrismaClient) => async (): Promise<Task[]> => {
  return prisma.task.findMany({
    where: {
      isCompleted: false,
    },
    orderBy: {
      id: "asc",
    },
  });
};
