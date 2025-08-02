import type { Context, Next } from 'hono'
import type { IAuthService } from 'application/interfaces/IAuthService'
import { ApiPresenter } from 'interface-adapters/presenters/ApiPresenter'

export class AuthMiddleware {
  constructor(private authService: IAuthService) {}

  handle = async (c: Context, next: Next) => {
    try {
      const auth = c.req.header('Authorization')

      if (!auth || !auth.startsWith('Bearer ')) {
        return c.json(
          ApiPresenter.error('Missing or invalid authorization header'),
          401,
        )
      }

      const token = auth.slice(7)
      const payload = await this.authService.verifyToken(token)

      c.set('auth', payload)
      await next()
    } catch {
      return c.json(ApiPresenter.error('Invalid token'), 401)
    }
  }
}
