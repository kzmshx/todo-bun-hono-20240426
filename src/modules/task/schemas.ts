import { z } from "zod";

export const GetActiveTasksQuerySchema = z.object({
  ids: z
    .string()
    .refine(
      (v) => v.split(",").every((id) => id.length > 0 && !Number.isNaN(id)),
      "Invalid ids format",
    )
    .transform((v) => v.split(",").map(Number))
    .optional(),
});

export const CreateTaskBodySchema = z.object({
  content: z.string().min(1).max(500),
  description: z.string().min(1).max(16384).optional(),
});

export const UpdateTaskBodySchema = z.object({
  content: z.string().min(1).max(500).optional(),
  description: z.string().min(1).max(16384).optional(),
});
