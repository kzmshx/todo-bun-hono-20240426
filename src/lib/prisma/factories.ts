import { defineTaskFactory, initialize } from "@/generated/prisma-fabbrica";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

export const TaskFactory = defineTaskFactory({
  defaultData: () => ({
    content: faker.word.words(3),
    description: faker.lorem.sentence(),
  }),
});

export function initPrismaFabbrica() {
  const prisma = new PrismaClient();
  initialize({ prisma });
  return prisma;
}
