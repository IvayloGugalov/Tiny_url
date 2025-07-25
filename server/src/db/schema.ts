import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { nanoid } from '../utils/nanoid'

export const links = sqliteTable('links', {
  id: text('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  target: text('target').notNull(),
  clicks: integer('clicks').notNull().default(0),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
})

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
})
