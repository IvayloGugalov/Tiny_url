import { createModule } from '@evyweb/ioctopus'
import { DI_SYMBOLS, type DI_RETURN_TYPES } from '../symbols'
import { CreateLinkUseCase } from '../../application/use-cases/CreateLinkUseCase'
import { GetAllLinksUseCase } from '../../application/use-cases/GetAllLinksUseCase'
import { RedirectToTargetUseCase } from '../../application/use-cases/RedirectToTargetUseCase'
import { AuthenticateUserUseCase } from '../../application/use-cases/AuthenticateUserUseCase'
import { RegisterUserUseCase } from '../../application/use-cases/RegisterUserUseCase'
import { CleanupExpiredLinksUseCase } from '../../application/use-cases/CleanupExpiredLinksUseCase'

export const createApplicationModule = (getInjection: <K extends keyof DI_RETURN_TYPES>(symbol: K) => DI_RETURN_TYPES[K]) => {
  const module = createModule()

  module.bind(DI_SYMBOLS.CreateLinkUseCase).toFactory(() => {
    const linkRepository = getInjection('ILinkRepository')
    const linkIdGenerator = getInjection('LinkIdGenerator')
    return new CreateLinkUseCase(linkRepository, linkIdGenerator)
  })

  module.bind(DI_SYMBOLS.GetAllLinksUseCase).toFactory(() => {
    const linkRepository = getInjection('ILinkRepository')
    return new GetAllLinksUseCase(linkRepository)
  })

  module.bind(DI_SYMBOLS.RedirectToTargetUseCase).toFactory(() => {
    const linkRepository = getInjection('ILinkRepository')
    return new RedirectToTargetUseCase(linkRepository)
  })

  module.bind(DI_SYMBOLS.AuthenticateUserUseCase).toFactory(() => {
    const authService = getInjection('IAuthService')
    return new AuthenticateUserUseCase(authService)
  })

  module.bind(DI_SYMBOLS.RegisterUserUseCase).toFactory(() => {
    const userRepository = getInjection('IUserRepository')
    const authService = getInjection('IAuthService')
    return new RegisterUserUseCase(userRepository, authService)
  })

  module.bind(DI_SYMBOLS.CleanupExpiredLinksUseCase).toFactory(() => {
    const linkRepository = getInjection('ILinkRepository')
    return new CleanupExpiredLinksUseCase(linkRepository)
  })

  return module
}
