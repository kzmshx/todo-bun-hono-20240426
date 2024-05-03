import type { Env } from "@/libs/env";
import { prisma } from "@/libs/prisma/client";
import type { PrismaClient } from "@prisma/client";

type ServiceMap = {
  env: Env;
  prisma: PrismaClient;
};

export class Container implements ServiceMap {
  constructor(public readonly env: Env) {}

  private _prisma?: PrismaClient;

  get prisma() {
    return (this._prisma ??= prisma);
  }
}
