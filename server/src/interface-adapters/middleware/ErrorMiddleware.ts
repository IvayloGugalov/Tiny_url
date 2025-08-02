import type { Context } from 'hono'
import type { ILogger } from 'infrastructure/services/ConsoleLogger'
import { ApiPresenter } from 'interface-adapters/presenters/ApiPresenter'

export class ErrorMiddleware {
  constructor(private logger: ILogger) {}

  globalErrorHandler = (error: Error, c: Context): Response => {
    this.logger.error('Unhandled error', {
      error: error.message,
      stack: error.stack,
      url: c.req.url,
      method: c.req.method,
    })

    return c.json(ApiPresenter.error('Internal server error'), 500)
  }

  notFoundHandler = (c: Context): Response => {
    this.logger.warn('Route not found', {
      url: c.req.url,
      method: c.req.method,
    })

    return c.json(ApiPresenter.error('Route not found'), 404)
  }
}
