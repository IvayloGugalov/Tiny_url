import { eq } from 'drizzle-orm'
import { users } from '../db/schema'
import { BaseRepository } from './base'
import { logger } from '../services/logger'

export interface CreateUserData {
  email: string
  name?: string | null
}

export interface UserData {
  id: string
  email: string
  name: string | null
  createdAt: Date
}

export class UserRepository extends BaseRepository {
  async create(data: CreateUserData): Promise<UserData> {
    try {
      const [user] = await this.db
        .insert(users)
        .values({
          email: data.email,
          name: data.name || null,
        })
        .returning()

      logger.debug('User created in database', { id: user.id, email: user.email })
      
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      }
    } catch (error) {
      logger.error('Failed to create user', error)
      throw error
    }
  }

  async findById(id: string): Promise<UserData | null> {
    try {
      const user = await this.db
        .select()
        .from(users)
        .where(eq(users.id, id))
        .get()

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      }
    } catch (error) {
      logger.error('Failed to find user by id', { id, error })
      throw error
    }
  }

  async findByEmail(email: string): Promise<UserData | null> {
    try {
      const user = await this.db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .get()

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      }
    } catch (error) {
      logger.error('Failed to find user by email', { email, error })
      throw error
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const user = await this.db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email))
        .get()

      return !!user
    } catch (error) {
      logger.error('Failed to check if user exists by email', { email, error })
      throw error
    }
  }
}
