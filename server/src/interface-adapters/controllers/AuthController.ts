import type { Context } from 'hono'
import { BaseController } from './BaseController'
import { AuthenticateUserUseCase } from '@/application/use-cases/AuthenticateUserUseCase'
import { RegisterUserUseCase } from '@/application/use-cases/RegisterUserUseCase'

export class AuthController extends BaseController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private registerUserUseCase: RegisterUserUseCase,
  ) {
    super()
  }

  login = async (c: Context): Promise<Response> => {
    try {
      const body = await this.parseJsonBody<{
        email: string
        password: string
      }>(c)
      const result = await this.authenticateUserUseCase.execute(
        body.email,
        body.password,
      )
      return c.json({ token: result.token })
    } catch (error) {
      return this.handleLoginError(c, error)
    }
  }

  private handleLoginError(c: Context, error: unknown): Response {
    if (error instanceof Error) {
      return c.json({ error: error.message }, 401)
    }
    return c.json({ error: 'Internal server error' }, 500)
  }

  register = async (c: Context): Promise<Response> => {
    return this.handleRequest(
      c,
      async () => {
        const body = await this.parseJsonBody<{ email: string; name?: string }>(
          c,
        )
        const result = await this.registerUserUseCase.execute(body)
        return result
      },
      201,
    )
  }
}
