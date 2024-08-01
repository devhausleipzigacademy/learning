import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { role, usersTable } from "./user";
import { nanoid } from "nanoid";

export const sessionsTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => usersTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type Session = typeof sessionsTable.$inferSelect;
export type InsertSession = typeof sessionsTable.$inferInsert;

export const inviteStatus = pgEnum("invite_status", [
  "requested",
  "pending",
  "approved",
  "rejected",
]);

export const invitesTable = pgTable("invite", {
  id: text("id").primaryKey().$defaultFn(nanoid),
  email: text("email").unique().notNull(),
  firstName: text("first_name").notNull(),
  role: role("role").notNull().default("user"),
  status: inviteStatus("invite_status").notNull().default("requested"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});

export type Invite = typeof invitesTable.$inferSelect;
export type InsertInvite = typeof invitesTable.$inferInsert;
