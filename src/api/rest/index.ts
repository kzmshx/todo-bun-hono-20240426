import { OpenAPIHono } from "@hono/zod-openapi";
import v1 from "./v1";

const app = new OpenAPIHono();

app.route("/v1", v1);

export default app;
