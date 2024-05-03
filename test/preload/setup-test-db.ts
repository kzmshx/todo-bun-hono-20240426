import { $ } from "bun";

await $`NODE_ENV=test bun prisma db push`;
await $`NODE_ENV=test bun prisma db seed`;
