import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'
import { logger as honoLogger } from 'hono/logger'

// Import configuration and services
import { config } from './config'
import { logger } from './services/logger'
import { container } from './container'
import { SchedulerService } from './services/scheduler'

// Import middleware
import { requestLoggingMiddleware } from './middleware/logging'
import { createAuthMiddleware } from './middleware/auth'
import { globalErrorHandler, notFoundHandler } from './middleware/errorHandler'

// Initialize Hono app
const app = new Hono()

// Setup CORS
app.use(
  cors({
    origin: config.cors.origins,
    credentials: config.cors.credentials,
    allowMethods: config.cors.allowMethods,
    allowHeaders: config.cors.allowHeaders,
  }),
)

// Setup Hono's built-in logger
app.use(
  honoLogger((message) => {
    logger.info(`HTTP Request: ${message}`)
  }),
)

// Setup custom request/response logging middleware
app.use('*', requestLoggingMiddleware)

// Initialize services and controllers
const authService = container.authService
const authMiddleware = createAuthMiddleware(authService)
const schedulerService = new SchedulerService(container.linkService)

// Start scheduled jobs
schedulerService.startLinkCleanupJob()

// Serve static files (React app)
app.use('/*', serveStatic({ root: './public' }))

// API Routes
// Health check endpoint
app.get('/api/health', container.healthController.healthCheck)

// Authentication routes
app.post('/api/login', container.authController.login)
app.post('/api/auth/register', container.authController.register)

// Link routes
app.post('/api/links', container.linkController.createLink)
app.get('/api/links', authMiddleware, container.linkController.getAllLinks)
app.get('/:id', container.linkController.redirectToTarget)

// Error handlers
app.notFound(notFoundHandler)
app.onError(globalErrorHandler)

// Start the server
const server = Bun.serve({
  port: config.server.port,
  hostname: config.server.host,
  fetch: app.fetch,
  error(error) {
    logger.error('Server error', error)
    return new Response('Internal Server Error', { status: 500 })
  },
})

// Server startup logging
logger.info('🚀 TinyURL Server starting...', {
  port: config.server.port,
  host: config.server.host,
  environment: config.server.nodeEnv,
  url: `http://${config.server.host}:${config.server.port}`,
})

logger.info('📊 Available endpoints:', {
  health: `http://${config.server.host}:${config.server.port}/api/health`,
  login: `http://${config.server.host}:${config.server.port}/api/login`,
  register: `http://${config.server.host}:${config.server.port}/api/auth/register`,
  links: `http://${config.server.host}:${config.server.port}/api/links`,
})

logger.info('✅ Server is running and ready to accept connections')

export default app
