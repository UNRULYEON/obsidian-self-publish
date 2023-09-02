import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const authToken = sqliteTable("auth_token", {
  id: text("id").primaryKey(),
  token: text("token"),
});
