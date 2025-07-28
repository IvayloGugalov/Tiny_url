import type { IUserRepository } from 'application/interfaces/IUserRepository'
import type { User } from 'domain/entities/User'
import type { UserId, Email } from 'domain/value-objects'

export class MockUserRepository implements IUserRepository {
  private users: Map<string, User> = new Map()

  async save(user: User): Promise<void> {
    this.users.set(user.id, { ...user })
  }

  async findById(id: UserId): Promise<User | null> {
    const user = this.users.get(id)
    return user ? { ...user } : null
  }

  async findByEmail(email: Email): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return { ...user }
      }
    }
    return null
  }

  async existsByEmail(email: Email): Promise<boolean> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return true
      }
    }
    return false
  }

  async update(user: User): Promise<void> {
    if (this.users.has(user.id)) {
      this.users.set(user.id, { ...user })
    }
  }

  // Test helper methods
  clear(): void {
    this.users.clear()
  }

  getAll(): User[] {
    return Array.from(this.users.values())
  }

  size(): number {
    return this.users.size
  }
}
