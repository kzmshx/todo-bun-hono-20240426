import type { Env } from "@/lib/env";
import { PrismaClient } from "@prisma/client";

type ServiceMap = {
  env: Env;
  prisma: PrismaClient;
};

export class Container implements ServiceMap {
  constructor(public env: Env) {}

  private _prisma?: PrismaClient;
  get prisma() {
    const factory = () => {
      return new PrismaClient();
    };
    return (this._prisma ??= factory());
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
