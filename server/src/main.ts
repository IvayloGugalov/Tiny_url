import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { logger as honoLogger } from 'hono/logger'

import { getInjection, config as appConfig } from '@/di/container'

const app = new Hono()

const logger = getInjection('ILogger')
const linkController = getInjection('LinkController')
const authController = getInjection('AuthController')
const healthController = getInjection('HealthController')
const authMiddleware = getInjection('AuthMiddleware')
const errorMiddleware = getInjection('ErrorMiddleware')
const loggingMiddleware = getInjection('LoggingMiddleware')
const cleanupExpiredLinksUseCase = getInjection('CleanupExpiredLinksUseCase')

app.use(
  '*',
  cors({
    origin:
      appConfig.server.nodeEnv === 'development'
        ? ['http://localhost:5173', 'http://localhost:3000']
        : ['*'],
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
)

app.use('*', honoLogger())
app.use('*', loggingMiddleware.handle)

app.use('/*', serveStatic({ root: './public' }))

app.get('/api/health', healthController.healthCheck)

app.post('/api/login', authController.login)
app.post('/api/auth/register', authController.register)

app.post('/api/links', linkController.createLink)
app.get('/api/links', authMiddleware.handle, linkController.getAllLinks)
app.get('/:id', linkController.redirectToTarget)

app.notFound(errorMiddleware.notFoundHandler)
app.onError(errorMiddleware.globalErrorHandler)

const startScheduledJobs = () => {
  const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000

  setInterval(async () => {
    try {
      const deletedCount = await cleanupExpiredLinksUseCase.execute(
        appConfig.links.ttlDays,
      )
      logger.info('Scheduled link cleanup completed', { deletedCount })
    } catch (error) {
      logger.error('Scheduled link cleanup failed', error)
    }
  }, CLEANUP_INTERVAL)

  logger.info('Link cleanup job scheduled', { intervalMs: CLEANUP_INTERVAL })
}

startScheduledJobs()

Bun.serve({
  port: appConfig.server.port,
  hostname: appConfig.server.host,
  fetch: app.fetch,
  error(error) {
    logger.error('Server error', error)
    return new Response('Internal Server Error', { status: 500 })
  },
})

logger.info('🚀 TinyURL Server starting...', {
  port: appConfig.server.port,
  host: appConfig.server.host,
  environment: appConfig.server.nodeEnv,
  url: `http://${appConfig.server.host}:${appConfig.server.port}`,
})
