// Dependency Injection Container
import { LinkRepository } from './repositories/linkRepository'
import { UserRepository } from './repositories/userRepository'
import { AuthService } from './services/authService'
import { LinkService } from './services/linkService'
import { AuthController } from './controllers/authController'
import { LinkController } from './controllers/linkController'
import { HealthController } from './controllers/healthController'

export class Container {
  private static instance: Container
  
  // Repositories
  private _linkRepository: LinkRepository | null = null
  private _userRepository: UserRepository | null = null
  
  // Services
  private _authService: AuthService | null = null
  private _linkService: LinkService | null = null
  
  // Controllers
  private _authController: AuthController | null = null
  private _linkController: LinkController | null = null
  private _healthController: HealthController | null = null

  private constructor() {}

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container()
    }
    return Container.instance
  }

  // Repository getters
  get linkRepository(): LinkRepository {
    if (!this._linkRepository) {
      this._linkRepository = new LinkRepository()
    }
    return this._linkRepository
  }

  get userRepository(): UserRepository {
    if (!this._userRepository) {
      this._userRepository = new UserRepository()
    }
    return this._userRepository
  }

  // Service getters
  get authService(): AuthService {
    if (!this._authService) {
      this._authService = new AuthService(this.userRepository)
    }
    return this._authService
  }

  get linkService(): LinkService {
    if (!this._linkService) {
      this._linkService = new LinkService(this.linkRepository)
    }
    return this._linkService
  }

  // Controller getters
  get authController(): AuthController {
    if (!this._authController) {
      this._authController = new AuthController(this.authService)
    }
    return this._authController
  }

  get linkController(): LinkController {
    if (!this._linkController) {
      this._linkController = new LinkController(this.linkService)
    }
    return this._linkController
  }

  get healthController(): HealthController {
    if (!this._healthController) {
      this._healthController = new HealthController()
    }
    return this._healthController
  }
}

export const container = Container.getInstance()
