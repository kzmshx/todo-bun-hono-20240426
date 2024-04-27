import { z } from "zod";

export default z
  .object({
    API_PORT: z.string(),
    DATABASE_URL: z.string(),
  })
  .parse(process.env);
