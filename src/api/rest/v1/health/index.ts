import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.body(null, 200));

export default app;
