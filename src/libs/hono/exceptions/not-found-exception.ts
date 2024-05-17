import { JsonHTTPException } from "./json-http-exception";
import type { HTTPExceptionOptions } from "./types";

export class NotFoundException extends JsonHTTPException {
  constructor(options: HTTPExceptionOptions = { message: "Not Found" }) {
    super(404, options);
  }
}
