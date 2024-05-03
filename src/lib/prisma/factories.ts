import { defineTaskFactory, initialize } from "@/__generated__/prisma-fabbrica";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { ulid } from "ulid";

export const TaskFactory = defineTaskFactory({
  defaultData: () => ({
    id: ulid(),
    content: faker.word.words(3),
    description: faker.lorem.sentence(),
  }),
});

export function initPrismaFabbrica() {
  const prisma = new PrismaClient();
  initialize({ prisma });
  return prisma;
}
