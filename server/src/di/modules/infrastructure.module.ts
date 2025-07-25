import { createModule } from '@evyweb/ioctopus'
import { DI_SYMBOLS } from '../symbols'
import { DrizzleLinkRepository } from '../../infrastructure/repositories/DrizzleLinkRepository'
import { DrizzleUserRepository } from '../../infrastructure/repositories/DrizzleUserRepository'
import { JwtAuthService } from '../../infrastructure/services/JwtAuthService'
import { ConsoleLogger } from '../../infrastructure/services/ConsoleLogger'
import { DatabaseConnection } from '../../infrastructure/database/connection'
import type { AppConfig } from '../container'

export const createInfrastructureModule = (config: AppConfig) => {
  const module = createModule()

  module.bind(DI_SYMBOLS.ILogger).toClass(ConsoleLogger)
  module.bind(DI_SYMBOLS.DatabaseConnection).toValue(DatabaseConnection.getInstance())
  module.bind(DI_SYMBOLS.ILinkRepository).toClass(DrizzleLinkRepository)
  module.bind(DI_SYMBOLS.IUserRepository).toClass(DrizzleUserRepository)

  module.bind(DI_SYMBOLS.IAuthService).toFactory(() => {
    return new JwtAuthService(config.auth.jwtSecret)
  })

  return module
}
