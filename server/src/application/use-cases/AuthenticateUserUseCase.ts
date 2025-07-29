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
}

export class AuthenticateUserUseCase {
  constructor(
    private authService: IAuthService,
    private userRepository: IUserRepository
  ) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const email = EmailDomain.create(request.email)

    const isValid = await this.authService.validateCredentials(email, request.password)
    if (!isValid) {
      throw new InvalidCredentialsError()
    }

    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const authToken = await this.authService.generateToken(user.id, email)

    return {
      token: authToken.value,
    }
  }
}
