import type { User } from 'domain/entities/User'

export interface UserResponse {
  id: string
  email: string
  name: string | null
  createdAt: string
}

export class UserPresenter {
  static toResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name || null,
      createdAt: user.createdAt.toISOString()
    }
  }
}
