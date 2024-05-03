import { HTTPException } from "hono/http-exception";

export class JsonHTTPException extends HTTPException {
  getResponse() {
    return Response.json({ message: this.message }, { status: this.status });
  }
}
