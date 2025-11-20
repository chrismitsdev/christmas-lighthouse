import {type InferSelectModel, type SQL, sql} from 'drizzle-orm'
import {
  boolean,
  integer,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  varchar
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
  id: text('id')
    .generatedAlwaysAs((): SQL => {
      const lower = sql<string>`lower(${categoryTable.enName})`
      const replaced = sql<string>`replace(${lower}, ' ', '-')`
      return replaced
    })
    .primaryKey(),
  elName: varchar('el_name').notNull().unique(),
  enName: varchar('en_name').notNull().unique(),
  elNotes: varchar('el_notes').array(),
  enNotes: varchar('en_notes').array()
})

export const productTable = pgTable('product', {
  id: serial('id').primaryKey(),
  categoryId: text('category_id')
    .notNull()
    .references(() => categoryTable.id),
  elName: varchar('el_name').notNull(),
  enName: varchar('en_name').notNull(),
  elDescription: varchar('el_description').array(),
  enDescription: varchar('en_description').array(),
  price: real('price').notNull(),
  active: boolean('active').notNull().default(true)
})

export type User = InferSelectModel<typeof userTable>
export type Session = InferSelectModel<typeof sessionTable>
export type Category = InferSelectModel<typeof categoryTable>
export type Product = InferSelectModel<typeof productTable>
