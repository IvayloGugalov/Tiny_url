import type { Context } from 'hono'
import type { ApiResponse } from 'shared/dist'
import { BaseController } from './base'
import { databaseService } from '../services/database'
import { logger } from '../services/logger'

export class HealthController extends BaseController {
  healthCheck = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      const isHealthy = await databaseService.healthCheck()
      
      if (!isHealthy) {
        throw new Error('Database health check failed')
      }

      const response: ApiResponse = {
        message: 'Server is healthy',
        success: true,
      }

      logger.debug('Health check successful')
      return response
    })
  }
}
