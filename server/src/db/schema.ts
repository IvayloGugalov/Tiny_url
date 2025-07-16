import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { customAlphabet } from 'nanoid'

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789')

export const links = sqliteTable('links', {
  id: text('id', { length: 191 })
  .primaryKey()
  .$defaultFn(() => nanoid()),
  target: text('target').notNull(),
  clicks: integer('clicks').notNull().default(0),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});