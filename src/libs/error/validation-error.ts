import type { ZodError } from "zod";
import { BaseError } from "./base-error";

export class ValidationError extends BaseError {
  static fromZodError(error: ZodError) {
    const message = error.errors.map((error) => error.message).join("\n");
    return new ValidationError(message);
  }
}
