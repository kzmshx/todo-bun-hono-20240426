import { afterAll, afterEach, beforeAll, beforeEach } from "bun:test";
import { initialize } from "@/generated/prisma-fabbrica";
import type { PrismaClient } from "@prisma/client";
import { PrismaEnvironmentDelegate } from "@quramy/jest-prisma-core";

declare global {
  var prisma: PrismaClient;
}

const delegate = new PrismaEnvironmentDelegate(
  {
    // @ts-ignore
    projectConfig: { testEnvironmentOptions: {} },
    // @ts-ignore
    globalConfig: { rootDir: "" },
  },
  { testPath: "" },
);

beforeAll(async () => {
  const testPrisma = await delegate.preSetup<PrismaClient>();

  global.prisma = testPrisma.client;
  initialize({ prisma: global.prisma });
});

beforeEach(async () => {
  // @ts-ignore
  await delegate.handleTestEvent({ name: "test_start" });
});

afterEach(async () => {
  // @ts-ignore
  await delegate.handleTestEvent({ name: "test_done" });
});

afterAll(async () => {
  await delegate.teardown();
});
