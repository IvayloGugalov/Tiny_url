import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database as BunDatabase } from 'bun:sqlite'
import { SQLiteTransaction } from 'drizzle-orm/sqlite-core'
import { links, users } from './schema'
import { ExtractTablesWithRelations } from 'drizzle-orm'

const dbFileName = process.env.DB_FILE_NAME || 'tiny_url.sqlite'
const sqlite = new BunDatabase(dbFileName)
export const db = drizzle(sqlite, { schema: { users, links } })

export type Database = ReturnType<typeof drizzle>

type Schema = {
  users: typeof users
  links: typeof links
}

export type Transaction = SQLiteTransaction<
  'async',
  ResultSet,
  Schema,
  ExtractTablesWithRelations<Schema>
>

export interface ResultSet {
  columns: Array<string>
  columnTypes: Array<string>
  rows: Array<Row>
  rowsAffected: number
  lastInsertRowid: bigint | undefined
  toJSON(): unknown
}

export interface Row {
  length: number
  [index: number]: Value
  [name: string]: Value
}

export type Value = null | string | number | bigint | ArrayBuffer

export async function healthCheck(): Promise<boolean> {
  try {
    await db.select().from(links).limit(1)
    return true
  } catch {
    return false
  }
}
