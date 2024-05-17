import { createApp } from "@/libs/hono/factory";
import rest from "./rest";

const app = createApp();

app.get("/health", (c) => c.body(null, 200));
app.route("/rest", rest);

export default app;
