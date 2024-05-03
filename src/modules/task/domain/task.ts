import { UlidSchema } from "@/libs/zod/schema";
import { z } from "zod";

export const TaskIdValueSchema = UlidSchema;

export const TaskIdSchema = TaskIdValueSchema.brand<"TaskId">();

export type TaskId = z.infer<typeof TaskIdSchema>;

export const TaskContentValueSchema = z.string().min(1).max(500);

export const TaskContentSchema = TaskContentValueSchema.brand<"TaskContent">();

export type TaskContent = z.infer<typeof TaskContentSchema>;

export const TaskDescriptionValueSchema = z.string().min(1).max(16384);

export const TaskDescriptionSchema = TaskDescriptionValueSchema.brand<"TaskDescription">();

export type TaskDescription = z.infer<typeof TaskDescriptionSchema>;
