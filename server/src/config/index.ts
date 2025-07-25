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
    defaultEmail: string
    defaultPassword: string
  }
  links: {
    ttlDays: number
  }
  cors: {
    origins: string[]
    credentials: boolean
    allowMethods: string[]
    allowHeaders: string[]
  }
}

const createConfig = (): AppConfig => {
  const nodeEnv = process.env.NODE_ENV || 'development'

  return {
    server: {
      port: parseInt(process.env.PORT || '3000', 10),
      host: process.env.HOST || 'localhost',
      nodeEnv,
    },
    database: {
      fileName: process.env.DB_FILE_NAME || 'tiny_url.sqlite',
    },
    auth: {
      jwtSecret: (process.env.JWT_SECRET || 'supersecret').padEnd(32, '0').slice(0, 32),
      defaultEmail: 'admin@admin.net',
      defaultPassword: 'admin',
    },
    links: {
      ttlDays: parseInt(process.env.LINK_TTL_DAYS || '90', 10),
    },
    cors: {
      origins: nodeEnv === 'development'
        ? ['http://localhost:5173', 'http://localhost:3000']
        : ['*'],
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
    },
  }
}

export const config = createConfig()
