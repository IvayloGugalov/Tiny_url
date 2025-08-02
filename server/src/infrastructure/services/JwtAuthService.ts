import { SignJWT, jwtVerify } from 'jose'
import { UserIdDomain } from 'domain/value-objects/UserId'
import { EmailDomain } from 'domain/value-objects/Email'
import { IAuthService } from 'application/interfaces/IAuthService'
import { IUserRepository } from 'application/interfaces/IUserRepository'
import { Email, UserId } from 'shared'

export class JwtAuthService implements IAuthService {
  private readonly jwtSecretKey: Uint8Array

  constructor(
    private userRepository: IUserRepository,
    jwtSecret: string,
  ) {
    this.jwtSecretKey = new TextEncoder().encode(jwtSecret)
  }

  async authenticate(
    email: Email,
    _password: string,
  ): Promise<{
    token: string
    user: { id: UserId; email: Email; name?: string }
  }> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(this.jwtSecretKey)

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  }

  async verifyToken(token: string): Promise<{ userId: UserId; email: Email }> {
    try {
      const { payload } = await jwtVerify(token, this.jwtSecretKey)
      return {
        userId: UserIdDomain.create(payload.userId as string),
        email: EmailDomain.create(payload.email as string),
      }
    } catch {
      throw new Error('Invalid token')
    }
  }
}
