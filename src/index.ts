import { Hono } from "hono";
import env from "./env";
import tasks from "./modules/task";

const app = new Hono({});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/tasks", tasks);

export default {
  port: env.API_PORT,
  ...app,
};
