import type { UserId, Email } from '../../domain/value-objects'

export interface AuthToken {
  value: string
  expiresAt: Date
}

export interface IAuthService {
  generateToken(userId: UserId, email: Email): Promise<AuthToken>
  verifyToken(token: string): Promise<{ userId: UserId; email: Email }>
  validateCredentials(email: Email, password: string): Promise<boolean>
}
