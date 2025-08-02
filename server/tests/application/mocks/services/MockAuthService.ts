import type { IAuthService } from 'application/interfaces/IAuthService'
import type { UserId, Email } from 'shared'

export class MockAuthService implements IAuthService {
  async authenticate(
    email: Email,
    password: string,
  ): Promise<{
    token: string
    user: { id: UserId; email: Email; name?: string }
  }> {
    return {
      token: 'mock-token',
      user: {
        id: 'mock-user-id' as UserId,
        email,
        name: 'Mock User',
      },
    }
  }

  async verifyToken(token: string): Promise<{ userId: UserId; email: Email }> {
    return {
      userId: 'mock-user-id' as UserId,
      email: 'mock@example.com' as Email,
    }
  }
}
