import type { ZodError } from "zod";
import { JsonHTTPException } from "./json-http-exception";
import type { HTTPExceptionOptions } from "./types";

export class BadRequestException extends JsonHTTPException {
  constructor(options: HTTPExceptionOptions = { message: "Bad Request" }) {
    super(400, options);
  }

  static fromZodError(err: ZodError) {
    return new BadRequestException({
      message: err.issues.map((v) => `${v.path}:${v.message}`).join(";"),
    });
  }
}
