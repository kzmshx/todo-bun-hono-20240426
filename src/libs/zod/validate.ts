import { type Result, err, ok } from "neverthrow";
import type { ZodSchema, z } from "zod";
import { ValidationError } from "../error/validation-error";

export const validate = <T extends ZodSchema>(
  schema: T,
  data: unknown,
): Result<z.infer<T>, ValidationError> => {
  const result = schema.safeParse(data);
  return result.success ? ok(result.data) : err(ValidationError.fromZodError(result.error));
};
