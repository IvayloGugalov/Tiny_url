import { createModule } from '@evyweb/ioctopus'
import { DI_SYMBOLS } from '../symbols'
import { ShortLinkIdGenerator } from '../../domain/services/LinkIdGenerator'

export const createDomainModule = () => {
  const module = createModule()

  module.bind(DI_SYMBOLS.LinkIdGenerator).toClass(ShortLinkIdGenerator)

  return module
}
