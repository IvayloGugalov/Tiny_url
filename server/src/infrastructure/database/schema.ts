import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

function generateId(): string {
  const alphabet =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 10; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
  }
  return result
}

export const links = sqliteTable('links', {
  id: text('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => generateId()),
  target: text('target').notNull(),
  clicks: integer('clicks').notNull().default(0),
  userId: text('userId').references(() => users.id),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
})

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => generateId()),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(strftime('%s', 'now'))`),
})
