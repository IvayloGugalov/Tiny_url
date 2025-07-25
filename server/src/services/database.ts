import { drizzle } from 'drizzle-orm/bun-sqlite'
import { Database } from 'bun:sqlite'
import { config } from '../config'
import { logger } from './logger'

export class DatabaseService {
  private static instance: DatabaseService
  private _db: ReturnType<typeof drizzle> | null = null

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  get db() {
    if (!this._db) {
      this.connect()
    }
    return this._db!
  }

  private connect(): void {
    try {
      const sqlite = new Database(config.database.fileName)
      this._db = drizzle({ client: sqlite })
      logger.info('Database connection established', { fileName: config.database.fileName })
    } catch (error) {
      logger.error('Failed to connect to database', error)
      throw error
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      // Simple query to check if database is accessible
      const { links } = await import('../db/schema')
      await this.db.select().from(links).limit(1)
      return true
    } catch (error) {
      logger.error('Database health check failed', error)
      return false
    }
  }
}

export const databaseService = DatabaseService.getInstance()
