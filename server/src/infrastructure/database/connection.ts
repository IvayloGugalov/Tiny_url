import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'

export class DatabaseConnection {
  private static instance: DatabaseConnection
  private _db: ReturnType<typeof drizzle> | null = null

  private constructor() {}

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection()
    }
    return DatabaseConnection.instance
  }

  get db() {
    if (!this._db) {
      this.connect()
    }
    return this._db!
  }

  private connect(): void {
    const dbFileName = process.env.DB_FILE_NAME || 'tiny_url.sqlite'
    const sqlite = new Database(dbFileName)
    this._db = drizzle({ client: sqlite })
  }

  async healthCheck(): Promise<boolean> {
    try {
      const { links } = await import('./schema')
      await this.db.select().from(links).limit(1)
      return true
    } catch {
      return false
    }
  }
}
