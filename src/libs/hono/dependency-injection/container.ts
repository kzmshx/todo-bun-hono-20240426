import type { Env } from "@/libs/env";
import { prisma } from "@/libs/prisma/client";
import type { PrismaClient } from "@prisma/client";

type ServiceMap = {
  env: Env;
  prisma: PrismaClient;
};

export class Container implements ServiceMap {
  constructor(public env: Env) {}

  private _prisma?: PrismaClient;
  get prisma() {
    return (this._prisma ??= prisma);
  }
  set prisma(value: PrismaClient) {
    this._prisma = value;
  }

  get<T extends keyof ServiceMap>(name: T): ServiceMap[T] {
    return this[name];
  }

  set<T extends keyof ServiceMap>(name: T, value: ServiceMap[T]) {
    (this as ServiceMap)[name] = value;
  }
}
