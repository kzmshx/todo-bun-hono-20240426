import { z } from "zod";

export const UlidSchema = z.string().length(26).brand<"Ulid">();
