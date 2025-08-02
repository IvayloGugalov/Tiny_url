import type { IUserRepository } from 'application/interfaces/IUserRepository'
import type { User, UserId, Email } from 'shared'

export class MockUserRepository implements IUserRepository {
  private users: User[] = []

  async create(user: User): Promise<User> {
    this.users.push(user)
    return user
  }

  async findById(id: UserId): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null
  }

  async findByEmail(email: Email): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id)
    if (index !== -1) {
      this.users[index] = user
    }
    return user
  }

  async delete(id: UserId): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id)
  }

  clear(): void {
    this.users = []
  }
}
