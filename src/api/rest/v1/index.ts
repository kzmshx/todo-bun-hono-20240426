import { OpenAPIHono } from "@hono/zod-openapi";
import health from "./health";
import tasks from "./tasks";

const app = new OpenAPIHono();

app.route("/health", health);
app.route("/tasks", tasks);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "Todo API",
    version: "v1",
    description: "A simple API to manage tasks",
  },
});

export default app;
