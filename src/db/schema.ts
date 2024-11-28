import type {InferSelectModel} from 'drizzle-orm'
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  json
} from 'drizzle-orm/pg-core'

export const userTable = pgTable('user', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username').notNull(),
  passwordHash: text('password_hash').notNull()
})

export const sessionTable = pgTable('session', {
  id: text('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date'
  }).notNull()
})

export const categoryTable = pgTable('category', {
  id: serial('id').primaryKey(),
  el: json().notNull(),
  en: json().notNull()
  // en: json().$type<string>().notNull()
  // en: json().$type<string>().notNull()
})

export type User = InferSelectModel<typeof userTable>
export type Session = InferSelectModel<typeof sessionTable>
export type Category = InferSelectModel<typeof categoryTable>
