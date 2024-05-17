import { JsonHTTPException } from "./json-http-exception";
import type { HTTPExceptionOptions } from "./types";

export class InternalServerErrorException extends JsonHTTPException {
  constructor(options: HTTPExceptionOptions = { message: "Internal Server Error" }) {
    super(500, options);
  }
}
