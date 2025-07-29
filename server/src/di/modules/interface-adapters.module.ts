import { createModule } from '@evyweb/ioctopus'
import { DI_SYMBOLS, type DI_RETURN_TYPES } from 'di/symbols'
import { LinkController } from 'interface-adapters/controllers/LinkController'
import { AuthController } from 'interface-adapters/controllers/AuthController'
import { HealthController } from 'interface-adapters/controllers/HealthController'
import { AuthMiddleware } from 'interface-adapters/middleware/AuthMiddleware'
import { ErrorMiddleware } from 'interface-adapters/middleware/ErrorMiddleware'
import { LoggingMiddleware } from 'interface-adapters/middleware/LoggingMiddleware'
import type { AppConfig } from 'di/container'

export const createInterfaceAdaptersModule = (getInjection: <K extends keyof DI_RETURN_TYPES>(symbol: K) => DI_RETURN_TYPES[K], config: AppConfig) => {
  const module = createModule()

  module.bind(DI_SYMBOLS.LinkController).toFactory(() => {
    const createLinkUseCase = getInjection('CreateLinkUseCase')
    const getUserLinksUseCase = getInjection('GetUserLinksUseCase')
    const redirectToTargetUseCase = getInjection('RedirectToTargetUseCase')
    return new LinkController(createLinkUseCase, getUserLinksUseCase, redirectToTargetUseCase, config.links.ttlDays)
  })

  module.bind(DI_SYMBOLS.AuthController).toFactory(() => {
    const authenticateUserUseCase = getInjection('AuthenticateUserUseCase')
    const registerUserUseCase = getInjection('RegisterUserUseCase')
    return new AuthController(authenticateUserUseCase, registerUserUseCase)
  })

  module.bind(DI_SYMBOLS.HealthController).toFactory(() => {
    const databaseConnection = getInjection('DatabaseConnection')
    return new HealthController(databaseConnection)
  })

  module.bind(DI_SYMBOLS.AuthMiddleware).toFactory(() => {
    const authService = getInjection('IAuthService')
    return new AuthMiddleware(authService)
  })

  module.bind(DI_SYMBOLS.ErrorMiddleware).toFactory(() => {
    const logger = getInjection('ILogger')
    return new ErrorMiddleware(logger)
  })

  module.bind(DI_SYMBOLS.LoggingMiddleware).toFactory(() => {
    const logger = getInjection('ILogger')
    return new LoggingMiddleware(logger)
  })

  return module
}
