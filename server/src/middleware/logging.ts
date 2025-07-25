import type { Context, Next } from 'hono'
import { logger } from '../services/logger'

export const requestLoggingMiddleware = async (c: Context, next: Next) => {
  const start = Date.now()
  const method = c.req.method
  const url = c.req.url
  const userAgent = c.req.header('User-Agent') || 'Unknown'

  logger.debug('Incoming request', {
    method,
    url,
    userAgent,
    headers: Object.fromEntries(c.req.raw.headers.entries()),
  })

  await next()

  const duration = Date.now() - start
  const status = c.res.status

  logger.info('Request completed', {
    method,
    url,
    status,
    duration: `${duration}ms`,
  })
}
