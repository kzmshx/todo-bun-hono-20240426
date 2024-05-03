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
