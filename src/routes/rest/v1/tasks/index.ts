import type { HonoEnv } from "@/lib/hono/types";
import { OpenAPIHono } from "@hono/zod-openapi";
import closeTask from "./close-task";
import createTask from "./create-task";
import deleteTask from "./delete-task";
import getActiveTask from "./get-active-task";
import getActiveTasks from "./get-active-tasks";
import reopenTask from "./reopen-task";
import updateTask from "./update-task";

const app = new OpenAPIHono<HonoEnv>();

app.route("/", getActiveTasks);
app.route("/", createTask);

app.route("/", getActiveTask);
app.route("/", updateTask);
app.route("/", deleteTask);

app.route("/", closeTask);
app.route("/", reopenTask);

export default app;
