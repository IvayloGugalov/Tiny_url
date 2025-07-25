import { config } from '../config'

export interface Logger {
  info(message: string, data?: any): void
  error(message: string, error?: any): void
  warn(message: string, data?: any): void
  debug(message: string, data?: any): void
}

class ConsoleLogger implements Logger {
  private formatMessage(level: string, message: string): string {
    return `[${level}] ${new Date().toISOString()} - ${message}`
  }

  private formatData(data: any): string {
    return data ? JSON.stringify(data, null, 2) : ''
  }

  info(message: string, data?: any): void {
    console.log(this.formatMessage('INFO', message), this.formatData(data))
  }

  error(message: string, error?: any): void {
    console.error(this.formatMessage('ERROR', message), error)
  }

  warn(message: string, data?: any): void {
    console.warn(this.formatMessage('WARN', message), this.formatData(data))
  }

  debug(message: string, data?: any): void {
    if (config.server.nodeEnv === 'development') {
      console.debug(this.formatMessage('DEBUG', message), this.formatData(data))
    }
  }
}

export const logger = new ConsoleLogger()
