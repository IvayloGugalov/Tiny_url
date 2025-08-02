import { createModule } from '@evyweb/ioctopus'
import { DI_SYMBOLS, type DI_RETURN_TYPES } from 'di/symbols'
import { DrizzleLinkRepository } from 'infrastructure/repositories/DrizzleLinkRepository'
import { DrizzleUserRepository } from 'infrastructure/repositories/DrizzleUserRepository'
import { JwtAuthService } from 'infrastructure/services/JwtAuthService'
import { ConsoleLogger } from 'infrastructure/services/ConsoleLogger'
import { TransactionManagerService } from 'infrastructure/services/TransactionManagerService'
import type { AppConfig } from 'di/container'

export const createInfrastructureModule = (
  config: AppConfig,
  getInjection: <K extends keyof DI_RETURN_TYPES>(
    symbol: K,
  ) => DI_RETURN_TYPES[K],
) => {
  const module = createModule()

  module.bind(DI_SYMBOLS.ILogger).toClass(ConsoleLogger)

  module
    .bind(DI_SYMBOLS.ITransactionManagerService)
    .toClass(TransactionManagerService)

  module.bind(DI_SYMBOLS.ILinkRepository).toClass(DrizzleLinkRepository)
  module.bind(DI_SYMBOLS.IUserRepository).toClass(DrizzleUserRepository)

  module.bind(DI_SYMBOLS.IAuthService).toFactory(() => {
    const userRepository = getInjection('IUserRepository')
    return new JwtAuthService(userRepository, config.auth.jwtSecret)
  })

  return module
}
