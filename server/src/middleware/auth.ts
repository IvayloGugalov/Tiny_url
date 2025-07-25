import type { Context, Next } from 'hono'
import { AuthService } from '../services/authService'
import { UnauthorizedError } from '../utils/errors'
import { logger } from '../services/logger'

export const createAuthMiddleware = (authService: AuthService) => {
  return async (c: Context, next: Next) => {
    try {
      const auth = c.req.header('Authorization')

      if (!auth || !auth.startsWith('Bearer ')) {
        throw new UnauthorizedError('Missing or invalid authorization header')
      }

      const token = auth.slice(7)
      const payload = await authService.verifyToken(token)

      // If token contains userId, validate the user exists
      if (payload.userId) {
        const user = await authService.validateUser(payload.userId)
        c.set('user', user)
      }

      // Store auth payload for use in handlers
      c.set('auth', payload)

      await next()
    } catch (error) {
      logger.warn('Authentication failed', {
        error: error instanceof Error ? error.message : String(error),
        url: c.req.url,
        method: c.req.method,
      })

      if (error instanceof UnauthorizedError) {
        return c.json({ error: error.message }, error.statusCode as any)
      }

      return c.json({ error: 'Unauthorized' }, 401 as any)
    }
  }
}
