import { parseEnv } from "@/libs/env";
import { createApp } from "@/libs/hono/factory";
import { dependencyInjection } from "@/libs/hono/middlewares";
import routes from "@/routes";

const env = parseEnv();
const app = createApp();

// Middlewares
app.use(dependencyInjection(env));
// Routes
app.route("/", routes);

export { app };

export default {
  port: env.API_PORT,
  ...app,
};
