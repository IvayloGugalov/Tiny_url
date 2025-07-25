import { createContainer } from '@evyweb/ioctopus'
import { DI_SYMBOLS, type DI_RETURN_TYPES } from './symbols'
import { createInfrastructureModule } from './modules/infrastructure.module'
import { createDomainModule } from './modules/domain.module'
import { createApplicationModule } from './modules/application.module'
import { createInterfaceAdaptersModule } from './modules/interface-adapters.module'

export interface AppConfig {
  server: {
    port: number
    host: string
    nodeEnv: string
  }
  database: {
    fileName: string
  }
  auth: {
    jwtSecret: string
  }
  links: {
    ttlDays: number
  }
}

const createConfig = (): AppConfig => {
  const nodeEnv = process.env.NODE_ENV || 'development'

  return {
    server: {
      port: parseInt(process.env.PORT!, 10),
      host: process.env.HOST!,
      nodeEnv,
    },
    database: {
      fileName: process.env.DB_FILE_NAME!,
    },
    auth: {
      jwtSecret: process.env.JWT_SECRET!,
    },
    links: {
      ttlDays: parseInt(process.env.LINK_TTL_DAYS!, 10),
    },
  }
}

const ApplicationContainer = createContainer()
const config = createConfig()

ApplicationContainer.bind(DI_SYMBOLS.Config).toValue(config)

ApplicationContainer.load(Symbol('InfrastructureModule'), createInfrastructureModule(config))
ApplicationContainer.load(Symbol('DomainModule'), createDomainModule())

export function getInjection<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol]) as DI_RETURN_TYPES[K]
}

ApplicationContainer.load(Symbol('ApplicationModule'), createApplicationModule(getInjection))
ApplicationContainer.load(
  Symbol('InterfaceAdaptersModule'),
  createInterfaceAdaptersModule(getInjection, config),
)

export { ApplicationContainer as container, config }
