import { SignJWT, jwtVerify } from 'jose'
import { type UserId, UserIdDomain } from 'domain/value-objects/UserId'
import { type Email, EmailDomain } from 'domain/value-objects/Email'
import { IAuthService, AuthToken } from 'application/interfaces/IAuthService'
import type { IUserRepository } from 'application/interfaces/IUserRepository'

export class JwtAuthService implements IAuthService {
  private readonly jwtSecretKey: Uint8Array

  constructor(
    jwtSecret: string,
    private userRepository: IUserRepository
  ) {
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
      expiresAt,
    }
  }

  async verifyToken(token: string): Promise<{ userId: UserId; email: Email }> {
    const { payload } = await jwtVerify(token, this.jwtSecretKey)

    return {
      userId: UserIdDomain.create(payload.userId as string),
      email: EmailDomain.create(payload.email as string),
    }
  }

  async validateCredentials(email: Email, password: string): Promise<boolean> {
    // Check if a user with this email exists in the database
    const user = await this.userRepository.findByEmail(email)

    return user !== null
  }
}
