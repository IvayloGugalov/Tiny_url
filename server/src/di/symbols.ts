// Services
import type { IAuthService } from 'application/interfaces/IAuthService'
import type { ILogger } from 'infrastructure/services/ConsoleLogger'

// Repositories
import type { ILinkRepository } from 'application/interfaces/ILinkRepository'
import type { IUserRepository } from 'application/interfaces/IUserRepository'

// Use Cases
import type { CreateLinkUseCase } from 'application/use-cases/CreateLinkUseCase'
import type { GetAllLinksUseCase } from 'application/use-cases/GetAllLinksUseCase'
import type { GetUserLinksUseCase } from 'application/use-cases/GetUserLinksUseCase'
import type { RedirectToTargetUseCase } from 'application/use-cases/RedirectToTargetUseCase'
import type { AuthenticateUserUseCase } from 'application/use-cases/AuthenticateUserUseCase'
import type { RegisterUserUseCase } from 'application/use-cases/RegisterUserUseCase'
import type { CleanupExpiredLinksUseCase } from 'application/use-cases/CleanupExpiredLinksUseCase'

// Controllers
import type { LinkController } from 'interface-adapters/controllers/LinkController'
import type { AuthController } from 'interface-adapters/controllers/AuthController'
import type { HealthController } from 'interface-adapters/controllers/HealthController'

// Middleware
import type { AuthMiddleware } from 'interface-adapters/middleware/AuthMiddleware'
import type { ErrorMiddleware } from 'interface-adapters/middleware/ErrorMiddleware'
import type { LoggingMiddleware } from 'interface-adapters/middleware/LoggingMiddleware'

// Domain Services
import type { ShortLinkIdGenerator } from 'domain/services/LinkIdGenerator'

// Infrastructure
import type { DatabaseConnection } from 'infrastructure/database/connection'
import type { AppConfig } from 'di/container'

export const DI_SYMBOLS = {
  // Services
  IAuthService: Symbol.for('IAuthService'),
  ILogger: Symbol.for('ILogger'),

  // Repositories
  ILinkRepository: Symbol.for('ILinkRepository'),
  IUserRepository: Symbol.for('IUserRepository'),

  // Domain Services
  LinkIdGenerator: Symbol.for('LinkIdGenerator'),

  // Infrastructure
  DatabaseConnection: Symbol.for('DatabaseConnection'),

  // Use Cases
  CreateLinkUseCase: Symbol.for('CreateLinkUseCase'),
  GetAllLinksUseCase: Symbol.for('GetAllLinksUseCase'),
  GetUserLinksUseCase: Symbol.for('GetUserLinksUseCase'),
  RedirectToTargetUseCase: Symbol.for('RedirectToTargetUseCase'),
  AuthenticateUserUseCase: Symbol.for('AuthenticateUserUseCase'),
  RegisterUserUseCase: Symbol.for('RegisterUserUseCase'),
  CleanupExpiredLinksUseCase: Symbol.for('CleanupExpiredLinksUseCase'),

  // Controllers
  LinkController: Symbol.for('LinkController'),
  AuthController: Symbol.for('AuthController'),
  HealthController: Symbol.for('HealthController'),

  // Middleware
  AuthMiddleware: Symbol.for('AuthMiddleware'),
  ErrorMiddleware: Symbol.for('ErrorMiddleware'),
  LoggingMiddleware: Symbol.for('LoggingMiddleware'),

  // Config
  Config: Symbol.for('Config')
} as const

export interface DI_RETURN_TYPES {
  // Services
  IAuthService: IAuthService
  ILogger: ILogger

  // Repositories
  ILinkRepository: ILinkRepository
  IUserRepository: IUserRepository

  // Domain Services
  LinkIdGenerator: ShortLinkIdGenerator

  // Infrastructure
  DatabaseConnection: DatabaseConnection

  // Use Cases
  CreateLinkUseCase: CreateLinkUseCase
  GetAllLinksUseCase: GetAllLinksUseCase
  GetUserLinksUseCase: GetUserLinksUseCase
  RedirectToTargetUseCase: RedirectToTargetUseCase
  AuthenticateUserUseCase: AuthenticateUserUseCase
  RegisterUserUseCase: RegisterUserUseCase
  CleanupExpiredLinksUseCase: CleanupExpiredLinksUseCase

  // Controllers
  LinkController: LinkController
  AuthController: AuthController
  HealthController: HealthController

  // Middleware
  AuthMiddleware: AuthMiddleware
  ErrorMiddleware: ErrorMiddleware
  LoggingMiddleware: LoggingMiddleware

  // Config
  Config: AppConfig
}
