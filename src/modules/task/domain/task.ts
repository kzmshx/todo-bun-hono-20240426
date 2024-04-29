import { UlidSchema } from "@/lib/zod/schema";
import { z } from "zod";

export const TaskIdSchema = UlidSchema.brand<"TaskId">();

export type TaskId = z.infer<typeof TaskIdSchema>;

export const TaskContentSchema = z.string().min(1).max(500).brand<"TaskContent">();

export type TaskContent = z.infer<typeof TaskContentSchema>;

export const TaskDescriptionSchema = z.string().min(1).max(16384).brand<"TaskDescription">();

export type TaskDescription = z.infer<typeof TaskDescriptionSchema>;
