import { createOpenAPIApp } from "@/libs/hono/factory";
import { swaggerUI } from "@hono/swagger-ui";
import tasks from "./tasks";

const app = createOpenAPIApp();

app.route("/tasks", tasks);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "Todo API",
    version: "v1",
    description: "A simple API to manage tasks",
  },
});

app.get("/ui", swaggerUI({ url: "/rest/v1/doc" }));

export default app;
