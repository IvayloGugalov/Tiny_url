import type { Context } from 'hono'
import { BaseController } from './BaseController'
import { healthCheck } from 'infrastructure/database/connection'

export class HealthController extends BaseController {
  healthCheck = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const isHealthy = await healthCheck()

      if (!isHealthy) {
        throw new Error('Database health check failed')
      }

      return {
        message: 'Server is healthy',
        timestamp: new Date().toISOString(),
      }
    })
  }
}
