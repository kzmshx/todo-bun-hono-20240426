import { createOpenAPIApp } from "@/libs/hono/factory";
import v1 from "./v1";

const app = createOpenAPIApp();

app.route("/v1", v1);

export default app;
