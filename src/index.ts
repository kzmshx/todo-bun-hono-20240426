import { Hono } from "hono";
import { parseEnv } from "./lib/env";
import { di } from "./lib/hono/di";
import type { HonoEnv } from "./lib/hono/types";
import routes from "./routes";

const env = parseEnv();

const app = new Hono<HonoEnv>();

// Middlewares
app.use(di(env));
// Routes
app.route("/", routes);

export default {
  port: env.API_PORT,
  ...app,
};
