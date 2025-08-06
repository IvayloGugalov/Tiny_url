import { createContainer } from '@evyweb/ioctopus'
import { DI_SYMBOLS, type DI_RETURN_TYPES } from '@/di/symbols'
import { createInfrastructureModule } from '@/di/modules/infrastructure.module'
import { createDomainModule } from '@/di/modules/domain.module'
import { createApplicationModule } from '@/di/modules/application.module'
import { createInterfaceAdaptersModule } from '@/di/modules/interface-adapters.module'

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

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
  symbol: K,
): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get(DI_SYMBOLS[symbol])
}

ApplicationContainer.load(
  Symbol('InfrastructureModule'),
  createInfrastructureModule(config, getInjection),
)
ApplicationContainer.load(Symbol('DomainModule'), createDomainModule())
ApplicationContainer.load(
  Symbol('ApplicationModule'),
  createApplicationModule(getInjection),
)
ApplicationContainer.load(
  Symbol('InterfaceAdaptersModule'),
  createInterfaceAdaptersModule(getInjection, config),
)

export { ApplicationContainer as container, config }
