import type { Config } from "drizzle-kit";

export default {
  driver: "better-sqlite",
  schema: "./src/drizzle/schema/*",
  out: "./src/drizzle/migrations",
  dbCredentials: {
    url: "./sqlite.db",
  },
} satisfies Config;
