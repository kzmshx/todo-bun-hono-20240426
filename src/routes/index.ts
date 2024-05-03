import { Hono } from "hono";
import rest from "./rest";

const app = new Hono();

app.get("/health", (c) => c.body(null, 200));
app.route("/rest", rest);

export default app;
