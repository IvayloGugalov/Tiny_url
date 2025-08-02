import type { UserId, Email } from 'shared'

export interface IAuthService {
  authenticate(
    email: Email,
    password: string,
  ): Promise<{
    token: string
    user: { id: UserId; email: Email; name?: string }
  }>
  verifyToken(token: string): Promise<{ userId: UserId; email: Email }>
}
