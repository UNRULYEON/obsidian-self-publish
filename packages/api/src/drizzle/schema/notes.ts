import { sqliteTable, text, integer, blob } from "drizzle-orm/sqlite-core";

export const notes = sqliteTable("notes", {
  id: text("id").primaryKey(),
  title: text("title"),
  markdown: blob("markdown"),
  status: integer("status"),
  createdAt: integer("createdAt"),
  updatedAt: integer("updatedAt"),
});
