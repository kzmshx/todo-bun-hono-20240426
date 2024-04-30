import env from "@/env";
import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";
import rest from "./api/rest";

const app = new Hono();

app.route("/rest", rest);
app.get("/rest/v1/ui", swaggerUI({ url: "/rest/v1/doc" }));

export default {
  port: env.API_PORT,
  ...app,
};
