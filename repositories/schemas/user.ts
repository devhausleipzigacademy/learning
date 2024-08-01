import { integer, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

export const role = pgEnum("user_role", [
  "user",
  "instructor",
  "staff",
  "admin",
]);

export const usersTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  name: text("name").notNull(),
  githubId: integer("github_id").unique().notNull(),
  username: text("username").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  role: role("role").notNull().default("user"),
});

export type User = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
