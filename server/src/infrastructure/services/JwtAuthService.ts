import { SignJWT, jwtVerify } from 'jose'
import type { UserId, Email } from '../../domain/value-objects'
import { UserIdDomain, EmailDomain } from '../../domain/value-objects'
import { IAuthService, AuthToken } from '../../application/interfaces/IAuthService'

export class JwtAuthService implements IAuthService {
  private readonly jwtSecretKey: Uint8Array

  constructor(jwtSecret: string) {
    this.jwtSecretKey = new TextEncoder().encode(jwtSecret)
  }

  async generateToken(userId: UserId, email: Email): Promise<AuthToken> {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    const token = await new SignJWT({ userId, email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(this.jwtSecretKey)

    return {
      value: token,
      expiresAt
    }
  }

  async verifyToken(token: string): Promise<{ userId: UserId; email: Email }> {
    const { payload } = await jwtVerify(token, this.jwtSecretKey)

    return {
      userId: UserIdDomain.create(payload.userId as string),
      email: EmailDomain.create(payload.email as string)
    }
  }

  async validateCredentials(_email: Email, _password: string): Promise<boolean> {
    // TODO: Implement actual credential validation
    return true
  }
}
