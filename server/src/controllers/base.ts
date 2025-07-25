import type { Context } from 'hono'
import { isAppError } from '../utils/errors'
import { logger } from '../services/logger'
import { config } from '../config'

export abstract class BaseController {
  protected async handleRequest<T>(
    c: Context,
    handler: () => Promise<T>,
    successStatus: number = 200
  ): Promise<Response> {
    try {
      const result = await handler()
      return c.json(result, successStatus)
    } catch (error) {
      return this.handleError(c, error)
    }
  }

  protected async parseJsonBody<T>(c: Context): Promise<T> {
    try {
      return await c.req.json()
    } catch (error) {
      logger.error('Invalid JSON body', error)
      throw new Error('Invalid request body. Expected JSON.')
    }
  }

  protected getBaseUrl(c: Context): string {
    return c.req.url
  }

  private handleError(c: Context, error: any): Response {
    if (isAppError(error)) {
      logger.warn('Application error', {
        message: error.message,
        statusCode: error.statusCode,
        code: error.code,
      })
      
      return c.json(
        {
          error: error.message,
          code: error.code,
        },
        error.statusCode
      )
    }

    // Log unexpected errors
    logger.error('Unexpected error in controller', {
      message: error.message,
      stack: error.stack,
      url: c.req.url,
      method: c.req.method,
    })

    // Don't expose internal error details in production
    const message = config.server.nodeEnv === 'development' 
      ? error.message 
      : 'Internal server error'

    return c.json(
      {
        error: message,
        timestamp: new Date().toISOString(),
      },
      500
    )
  }
}
