import { eq } from 'drizzle-orm'
import { User, UserDomain } from '../../domain/entities/User'
import type { UserId, Email } from '../../domain/value-objects'
import { IUserRepository } from '../../application/interfaces/IUserRepository'
import { DatabaseConnection } from '../database/connection'
import { users } from '../database/schema'

export class DrizzleUserRepository implements IUserRepository {
  private db = DatabaseConnection.getInstance().db

  async save(user: User): Promise<void> {
    await this.db
      .insert(users)
      .values({
        id: user.id,
        email: user.email,
        name: user.name || null,
        createdAt: user.createdAt,
      })
  }

  async findById(id: UserId): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    const row = result[0]!
    return UserDomain.fromPersistence({
      id: row.id,
      email: row.email,
      name: row.name || undefined,
      createdAt: row.createdAt,
    })
  }

  async findByEmail(email: Email): Promise<User | null> {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    const row = result[0]!
    return UserDomain.fromPersistence({
      id: row.id,
      email: row.email,
      name: row.name || undefined,
      createdAt: row.createdAt,
    })
  }

  async existsByEmail(email: Email): Promise<boolean> {
    const result = await this.db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    return result.length > 0
  }

  async update(user: User): Promise<void> {
    await this.db
      .update(users)
      .set({
        email: user.email,
        name: user.name || null,
      })
      .where(eq(users.id, user.id))
  }
}
