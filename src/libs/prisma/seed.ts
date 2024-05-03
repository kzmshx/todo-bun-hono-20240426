import type { Prisma } from "@prisma/client";
import { TaskFactory, initPrismaFabbrica } from "./factories";

function range(n: number): number[] {
  return Array(n)
    .fill(0)
    .map((_, i) => i);
}

async function seed() {
  // Active tasks
  const activeTasks: Partial<Prisma.TaskCreateInput>[] = range(10).map(() => ({
    isCompleted: false,
  }));
  await TaskFactory.createList(activeTasks);

  // Completed tasks
  const completedTasks: Partial<Prisma.TaskCreateInput>[] = range(10).map(() => ({
    isCompleted: true,
  }));
  await TaskFactory.createList(completedTasks);
}

// --------------------------
// Run
// --------------------------

initPrismaFabbrica();

seed()
  .then(() => {
    console.log("Seed completed!");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
