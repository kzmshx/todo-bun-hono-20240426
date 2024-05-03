import { afterAll, afterEach, beforeAll, beforeEach, mock } from "bun:test";
import { initialize } from "@/__generated__/prisma-fabbrica";
import type { PrismaClient } from "@prisma/client";
import { PrismaEnvironmentDelegate } from "@quramy/jest-prisma-core";

/**
 * Setup prisma client with auto rollback
 */
let prisma: PrismaClient;

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
  prisma = testPrisma.client;
  initialize({ prisma });
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

/**
 * Mock prisma client
 */
mock.module("@/lib/prisma/client", () => {
  return {
    prisma,
  };
});
