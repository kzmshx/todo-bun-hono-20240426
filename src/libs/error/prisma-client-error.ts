export class PrismaClientError extends Error {
  static create(err: unknown): PrismaClientError {
    if (err instanceof Error) {
      return new PrismaClientError(err.message);
    }
    return new PrismaClientError("Unexpected error occurred");
  }
}
