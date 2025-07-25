import { EmailDomain } from '../../domain/value-objects/Email'
import { InvalidCredentialsError } from '../../domain/errors'
import type { IAuthService } from '../interfaces'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export class AuthenticateUserUseCase {
  constructor(private authService: IAuthService) {}

  async execute(request: LoginRequest): Promise<LoginResponse> {
    const email = EmailDomain.create(request.email)

    const isValid = await this.authService.validateCredentials(email, request.password)
    if (!isValid) {
      throw new InvalidCredentialsError()
    }

    const authToken = await this.authService.generateToken('admin', email)

    return {
      token: authToken.value
    }
  }
}
