import {pgTable, uuid, varchar} from 'drizzle-orm/pg-core'

export const usersTable = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', {length: 255}).unique().notNull()
})
