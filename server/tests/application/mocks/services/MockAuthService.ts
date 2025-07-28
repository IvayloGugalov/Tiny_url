import type { IAuthService, AuthToken } from 'application/interfaces/IAuthService'
import type { UserId, Email } from 'domain/value-objects'

export class MockAuthService implements IAuthService {
  private validCredentials: Map<string, string> = new Map()
  private tokens: Map<string, { userId: UserId; email: Email; expiresAt: Date }> = new Map()
  private shouldValidateCredentials = true

  async generateToken(userId: UserId, email: Email): Promise<AuthToken> {
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    const token = `mock-token-${userId}-${Date.now()}`

    this.tokens.set(token, { userId, email, expiresAt })

    return {
      value: token,
      expiresAt
    }
  }

  async verifyToken(token: string): Promise<{ userId: UserId; email: Email }> {
    const tokenData = this.tokens.get(token)

    if (!tokenData) {
      throw new Error('Invalid token')
    }

    if (tokenData.expiresAt < new Date()) {
      throw new Error('Token expired')
    }

    return {
      userId: tokenData.userId,
      email: tokenData.email
    }
  }

  async validateCredentials(email: Email, password: string): Promise<boolean> {
    if (!this.shouldValidateCredentials) {
      return false
    }

    const storedPassword = this.validCredentials.get(email)
    return storedPassword === password
  }

  // Test helper methods
  setValidCredentials(email: Email, password: string): void {
    this.validCredentials.set(email, password)
  }

  setShouldValidateCredentials(should: boolean): void {
    this.shouldValidateCredentials = should
  }

  clear(): void {
    this.validCredentials.clear()
    this.tokens.clear()
    this.shouldValidateCredentials = true
  }

  getTokenCount(): number {
    return this.tokens.size
  }
}
