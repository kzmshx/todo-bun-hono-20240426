import type { Env } from "@/lib/env";
import { createMiddleware } from "hono/factory";
import type { HonoEnv } from "../types";
import { Container } from "./container";

export const di = (env: Env) => {
  return createMiddleware<HonoEnv>(async (c, next) => {
    c.set("container", new Container(env));
    await next();
  });
};
