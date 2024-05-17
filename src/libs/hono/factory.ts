import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { BadRequestException } from "./exceptions";
import type { HonoEnv } from "./types";

export const createApp = () => {
  return new Hono<HonoEnv>();
};

export const createOpenAPIApp = () => {
  return new OpenAPIHono<HonoEnv>({
    defaultHook: (result) => {
      if (result.success) {
        return;
      }

      throw new BadRequestException({
        message: "Validation Failed",
        cause: result.error.errors,
      });
    },
  });
};
