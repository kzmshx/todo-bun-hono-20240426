import { z } from "zod";

export const UlidSchema = z.string().length(26);

export const CommaSeparatedStringSchema = z.string().transform((v) => v.split(","));
