import type { Context, Next } from 'hono'
import type { ILogger } from 'infrastructure/services/ConsoleLogger'

export class LoggingMiddleware {
  constructor(private logger: ILogger) {}

  handle = async (c: Context, next: Next) => {
    const start = Date.now()

    this.logger.info('Request started', {
      method: c.req.method,
      url: c.req.url,
      userAgent: c.req.header('User-Agent')
    })

    await next()

    const duration = Date.now() - start

    this.logger.info('Request completed', {
      method: c.req.method,
      url: c.req.url,
      status: c.res.status,
      duration: `${duration}ms`
    })
  }
}
