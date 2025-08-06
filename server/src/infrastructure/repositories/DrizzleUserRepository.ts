import { eq } from 'drizzle-orm'
import type { Email, User, UserId } from 'shared'
import { db, type Transaction } from '@/infrastructure/database/connection'
import { UserDomain } from '@/domain/entities/User'
import { IUserRepository } from '@/application/interfaces/IUserRepository'
import { users as usersTable } from '@/infrastructure/database/schema'

export class DrizzleUserRepository implements IUserRepository {
  constructor() {}

  async create(user: User, tx?: Transaction): Promise<User> {
    const dbInstance = tx ?? db
    const [result] = await dbInstance
      .insert(usersTable)
      .values({
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      })
      .returning()

    return UserDomain.fromPersistence(result)
  }

  async findById(id: UserId, tx?: Transaction): Promise<User | null> {
    const dbInstance = tx ?? db
    const result = await dbInstance
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1)
    return result.length > 0 ? UserDomain.fromPersistence(result[0]) : null
  }

  async findByEmail(email: Email, tx?: Transaction): Promise<User | null> {
    const dbInstance = tx ?? db
    const result = await dbInstance
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1)
    return result.length > 0 ? UserDomain.fromPersistence(result[0]) : null
  }

  async update(user: User, tx?: Transaction): Promise<User> {
    const dbInstance = tx ?? db
    const [result] = await dbInstance
      .update(usersTable)
      .set({
        email: user.email,
        name: user.name,
      })
      .where(eq(usersTable.id, user.id))
      .returning()

    return UserDomain.fromPersistence(result)
  }

  async delete(id: UserId, tx?: Transaction): Promise<void> {
    const dbInstance = tx ?? db
    await dbInstance.delete(usersTable).where(eq(usersTable.id, id))
  }
}
