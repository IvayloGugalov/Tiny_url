import { EmailDomain } from 'domain/value-objects/Email'
import { InvalidCredentialsError } from 'domain/errors'
import type { IAuthService } from 'application/interfaces/IAuthService'
import type { IUserRepository } from 'application/interfaces/IUserRepository'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    email: string
    name?: string
  }
}

export class AuthenticateUserUseCase {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository,
  ) {}

  async execute(email: string, password: string): Promise<LoginResponse> {
    const validEmail = EmailDomain.create(email)
    const user = await this.userRepository.findByEmail(validEmail)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const authResult = await this.authService.authenticate(validEmail, password)

    return {
      token: authResult.token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    }
  }
}
