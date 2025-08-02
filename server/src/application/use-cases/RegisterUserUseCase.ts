import { UserDomain } from 'domain/entities/User'
import { EmailDomain } from 'domain/value-objects/Email'
import { DuplicateEmailError } from 'domain/errors'
import type { IUserRepository } from 'application/interfaces/IUserRepository'
import type { IAuthService } from 'application/interfaces/IAuthService'

export interface RegisterRequest {
  email: string
  name?: string
}

export interface RegisterResponse {
  token: string
  user: {
    id: string
    email: string
    name: string | undefined
  }
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService,
  ) {}

  async execute(request: RegisterRequest): Promise<RegisterResponse> {
    const email = EmailDomain.create(request.email)

    const existingUser = await this.userRepository.findByEmail(email)
    if (existingUser) {
      throw new DuplicateEmailError(email)
    }

    const userId = this.generateUserId()
    const user = UserDomain.create(userId, email, request.name)

    await this.userRepository.create(user)

    const authToken = await this.authService.authenticate(email, '')

    return {
      token: authToken.token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || undefined,
      },
    }
  }

  private generateUserId(): string {
    const alphabet =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 10; i++) {
      result += alphabet.charAt(Math.floor(Math.random() * alphabet.length))
    }
    return result
  }
}
