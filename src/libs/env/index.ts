import { z } from "zod";

const EnvSchema = z.object({
  API_PORT: z.string().default("3000"),
  DATABASE_URL: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

export const parseEnv = (): Env => {
  return EnvSchema.parse(process.env);
};
