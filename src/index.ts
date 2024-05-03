import { parseEnv } from "@/lib/env";
import { dependencyInjection } from "@/lib/hono/middlewares";
import type { HonoEnv } from "@/lib/hono/types";
import routes from "@/routes";
import { Hono } from "hono";

const env = parseEnv();

const app = new Hono<HonoEnv>();

// Middlewares
app.use(dependencyInjection(env));
// Routes
app.route("/", routes);

export { app };

export default {
  port: env.API_PORT,
  ...app,
};
