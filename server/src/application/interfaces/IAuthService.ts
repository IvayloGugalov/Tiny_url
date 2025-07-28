import type { UserId } from '@/domain/value-objects/UserId'
import type { Email } from '@/domain/value-objects/Email'

export interface AuthToken {
  value: string
  expiresAt: Date
}

export interface IAuthService {
  generateToken(userId: UserId, email: Email): Promise<AuthToken>
  verifyToken(token: string): Promise<{ userId: UserId; email: Email }>
  validateCredentials(email: Email, password: string): Promise<boolean>
}
