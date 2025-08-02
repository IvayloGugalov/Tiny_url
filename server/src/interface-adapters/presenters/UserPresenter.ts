import type { User } from 'shared'

export interface UserPresenter {
  present(user: User): {
    id: string
    email: string
    name?: string
    createdAt: string
  }
}

export class ApiUserPresenter implements UserPresenter {
  present(user: User): {
    id: string
    email: string
    name?: string
    createdAt: string
  } {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
    }
  }
}
