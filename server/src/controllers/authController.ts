import type { Context } from 'hono'
import { BaseController } from './base'
import { AuthService, LoginCredentials, RegisterData } from '../services/authService'
import { logger } from '../services/logger'

export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super()
  }

  login = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      logger.debug('Login attempt started')

      const body = await this.parseJsonBody<LoginCredentials>(c)
      const result = await this.authService.login(body)

      return result
    })
  }

  register = async (c: Context): Promise<Response> => {
    return this.handleRequest(c, async () => {
      logger.debug('Registration attempt started')

      const body = await this.parseJsonBody<RegisterData>(c)
      const result = await this.authService.register(body)

      return result
    }, 201)
  }
}
