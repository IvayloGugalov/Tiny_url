import type { User, UserId, Email } from 'shared'

export interface IUserRepository {
  create(user: User): Promise<User>
  findById(id: UserId): Promise<User | null>
  findByEmail(email: Email): Promise<User | null>
  update(user: User): Promise<User>
  delete(id: UserId): Promise<void>
}
