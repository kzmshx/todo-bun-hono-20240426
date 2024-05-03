import { OpenAPIHono } from "@hono/zod-openapi";
import { useCloseTask } from "./close-task";
import { useCreateTask } from "./create-task";
import { useDeleteTask } from "./delete-task";
import { useGetActiveTask } from "./get-active-task";
import { useGetActiveTasks } from "./get-active-tasks";
import { useReopenTask } from "./reopen-task";
import { useUpdateTask } from "./update-task";

const app = new OpenAPIHono();

useGetActiveTasks(app);
useCreateTask(app);
useGetActiveTask(app);
useUpdateTask(app);
useDeleteTask(app);
useCloseTask(app);
useReopenTask(app);

export default app;
