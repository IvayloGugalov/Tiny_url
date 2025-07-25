import type { Context } from 'hono'
import { isAppError } from '../utils/errors'
import { logger } from '../services/logger'
import { config } from '../config'

export const globalErrorHandler = (err: Error, c: Context) => {
  const url = c.req.url
  const method = c.req.method

  if (isAppError(err)) {
    logger.warn('Application error', {
      error: err.message,
      statusCode: err.statusCode,
      code: err.code,
      method,
      url,
    })

    return c.json(
      {
        error: err.message,
        code: err.code,
        timestamp: new Date().toISOString(),
      },
      err.statusCode as any
    )
  }

  // Log unexpected errors
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    method,
    url,
  })

  // Don't expose internal error details in production
  const message = config.server.nodeEnv === 'development'
    ? err.message
    : 'An unexpected error occurred'

  return c.json(
    {
      error: 'Internal Server Error',
      message,
      timestamp: new Date().toISOString(),
    },
    500
  )
}

export const notFoundHandler = (c: Context) => {
  const url = c.req.url
  const method = c.req.method

  logger.warn('Route not found', { method, url })

  return c.json(
    {
      error: 'Not Found',
      message: `Route ${method} ${url} not found`,
      timestamp: new Date().toISOString(),
    },
    404
  )
}
