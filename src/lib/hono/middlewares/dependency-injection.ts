import type { Env } from "@/lib/env";
import { createMiddleware } from "hono/factory";
import { Container } from "../dependency-injection";
import type { HonoEnv } from "../types";

export const dependencyInjection = (env: Env) => {
  return createMiddleware<HonoEnv>(async (c, next) => {
    c.set("container", new Container(env));
    await next();
  });
};
