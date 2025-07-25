import type { Context } from 'hono'
import { BaseController } from './BaseController'
import { AuthenticateUserUseCase, RegisterUserUseCase } from '../../application'

export class AuthController extends BaseController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private registerUserUseCase: RegisterUserUseCase
  ) {
    super()
  }

  login = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const body = await this.parseJsonBody<{ email: string; password: string }>(c)
      const result = await this.authenticateUserUseCase.execute(body)
      return result
    })
  }

  register = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const body = await this.parseJsonBody<{ email: string; name?: string }>(c)
      const result = await this.registerUserUseCase.execute(body)
      return result
    }, 201)
  }
}
